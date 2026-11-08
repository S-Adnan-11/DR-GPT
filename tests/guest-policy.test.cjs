const test = require('node:test');
const assert = require('node:assert/strict');
const { configurationError, assertConfiguration, installIsolation } = require('../src/guest/policy');

test('only an explicit offline fixture configuration is accepted', () => {
  const valid = { mode: 'fixture', schemaVersion: 1, network: 'deny' };
  assert.equal(configurationError(valid), null);
  for (const config of [undefined, {}, { ...valid, mode: 'live' }, { ...valid, network: 'allow' }, { ...valid, schemaVersion: 2 }]) {
    assert.throws(() => assertConfiguration(config), /fixture configuration/);
  }
});

test('network and external actions remain blocked even with device connectivity', async () => {
  let realCalls = 0;
  const target = { fetch: () => { realCalls++; } };
  const linking = { openURL: () => { realCalls++; }, sendIntent: () => { realCalls++; } };
  const notices = [];
  installIsolation(target, linking, (...args) => notices.push(args));
  await assert.rejects(target.fetch('https://example.invalid'), /Network access is disabled/);
  for (const name of ['WebSocket', 'EventSource']) assert.throws(() => new target[name]('https://example.invalid'), /Network access is disabled/);
  assert.throws(() => new target.XMLHttpRequest().open('GET', 'https://example.invalid'), /Network access is disabled/);
  for (const url of ['https://example.invalid', 'tel:112', 'sms:112']) await linking.openURL(url);
  await linking.sendIntent('android.intent.action.CALL');
  assert.equal(await linking.canOpenURL('https://example.invalid'), false);
  assert.equal(realCalls, 0);
  assert.equal(notices.length, 4);
  assert.equal(Reflect.set(target, 'fetch', () => {}), false);
  assert.equal(Reflect.set(linking, 'openURL', () => {}), false);
});
