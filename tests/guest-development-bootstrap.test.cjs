const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const { transformSync } = require('@babel/core');
const { guestProfile } = require('../scripts/guest-profile.cjs');
const policy = require('../src/guest/policy'), development = require('../src/guest/development');
const filename = path.resolve(__dirname, '../src/guest/installIsolation.js');
const code = transformSync(fs.readFileSync(filename, 'utf8'), {
  filename, babelrc: false, configFile: false,
  plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')],
}).code;

function bootstrap(configuration, debug = true) {
  const target = {}, calls = [], notices = [], linking = {};
  let initialized = false;
  const imports = {
    'react-native': { Linking: linking, Alert: { alert: (...args) => notices.push(args) } },
    'expo-constants': { __esModule: true, default: { expoConfig: { extra: { guest: configuration } } } },
    './policy': policy, './development': development,
  };
  vm.runInNewContext(code, { exports: {}, globalThis: target, __DEV__: debug, require(name) {
    if (name === 'react-native/Libraries/Core/InitializeCore') {
      initialized = true;
      // Native startup may reach the entry module before these lazy globals exist.
      const values = {
        fetch: async (...args) => { calls.push(['fetch', ...args]); return { ok: true }; },
        XMLHttpRequest: class { open(...args) { calls.push(['xhr', ...args]); } },
        WebSocket: class { constructor(...args) { calls.push(['socket', ...args]); } },
      };
      for (const [name, value] of Object.entries(values)) Object.defineProperty(target, name, { configurable: true, get: () => value });
      return;
    }
    assert.ok(Object.prototype.hasOwnProperty.call(imports, name), name);
    return imports[name];
  } }, { filename });
  return { target, calls, notices, linking, initialized };
}

test('native development initializes missing transport globals before installing Metro restrictions', async () => {
  const config = guestProfile('guest-dev').runtime;
  const { target, calls, notices, linking, initialized } = bootstrap(config);
  assert.equal(initialized, true);
  await target.fetch(config.metroOrigin + '/status');
  new target.XMLHttpRequest().open('POST', config.metroOrigin + '/symbolicate');
  new target.WebSocket(config.metroOrigin.replace('http:', 'ws:') + '/hot');
  assert.equal(calls.length, 3);
  await assert.rejects(target.fetch('https://example.invalid'), /configured private Metro/);
  assert.throws(() => new target.XMLHttpRequest().open('GET', 'https://example.invalid'), /configured private Metro/);
  assert.throws(() => new target.WebSocket('ws://example.invalid/hot'), /configured private Metro/);
  await linking.openURL('tel:112'); assert.equal(notices.length, 1);
  assert.equal(Object.getOwnPropertyDescriptor(target, 'fetch').configurable, false);
});

test('offline, invalid and non-debug entry paths install denial without initializing native transports', async () => {
  for (const [config, debug] of [[guestProfile('guest').runtime, false], [{}, true], [guestProfile('guest-dev').runtime, false]]) {
    const { target, calls, initialized } = bootstrap(config, debug);
    assert.equal(initialized, false);
    await assert.rejects(target.fetch('http://127.0.0.1:8081/status'), /Network access is disabled/);
    assert.throws(() => new target.XMLHttpRequest().open('GET', 'http://127.0.0.1:8081/status'), /Network access is disabled/);
    assert.throws(() => new target.WebSocket('ws://127.0.0.1:8081/hot'), /Network access is disabled/);
    assert.deepEqual(calls, []);
  }
});
