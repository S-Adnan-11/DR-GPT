const test = require('node:test'), assert = require('node:assert/strict');
const { metroAddress, developmentConfigurationError, permitsMetro, installDevelopmentIsolation } = require('../src/guest/development');
const { guestProfile } = require('../scripts/guest-profile.cjs');
const origin = 'http://127.0.0.1:8081';
const config = guestProfile('guest-dev').runtime;

test('development requires a debug runtime and a single private origin', () => {
  assert.equal(developmentConfigurationError(config, true), null);
  for (const candidate of [undefined, {}, { ...config, mode:'live' }, { ...config, metroOrigin:'https://example.com:8081' }, { ...config, metroOrigin:origin+'/extra' }]) assert.ok(developmentConfigurationError(candidate, true));
  assert.ok(developmentConfigurationError(config, false));
  for (const url of ['http://example.com:8081','http://169.254.169.254:8081','http://192.168.1.999:8081','http://user@127.0.0.1:8081','http://127.0.0.1:80','http://0127.0.0.1:8081','http://127.0.0.1:08081','http://127.0.0.1:8081\n']) assert.equal(metroAddress(url), null);
});

test('Metro HTTP and hot-reload paths are scoped to one origin', () => {
  for (const route of ['/index.bundle?platform=android','/.expo/.virtual-metro-entry.bundle?dev=true','/assets/example.png','/symbolicate','/status']) assert.equal(permitsMetro(origin+route,origin), true);
  assert.equal(permitsMetro('ws://127.0.0.1:8081/hot?platform=android',origin,true), true);
  for (const url of ['https://example.com/data',origin+'/api/health',origin+'/assets/../secret',origin+'/assets/%2e%2e/secret','http://127.0.0.1:8082/index.bundle','http://127.0.0.1:8081.evil/index.bundle','//example.com/index.bundle']) assert.equal(permitsMetro(url,origin), false);
  assert.equal(permitsMetro('ws://127.0.0.1:8081/anything',origin,true), false);
});

test('development preserves only Metro calls and blocks external actions', async () => {
  const calls=[];
  class Request { open(...args){calls.push(['xhr',...args]);} }
  class Socket { constructor(url){calls.push(['socket',url]);} }
  const target={fetch:async(...args)=>{calls.push(['fetch',...args]);return {ok:true};},XMLHttpRequest:Request,WebSocket:Socket};
  const linking={}, notices=[];
  installDevelopmentIsolation(target,linking,(...args)=>notices.push(args),config,true);
  await target.fetch(origin+'/status'); new target.XMLHttpRequest().open('POST',origin+'/symbolicate'); new target.WebSocket('ws://127.0.0.1:8081/hot');
  await assert.rejects(target.fetch('https://example.invalid'),/configured private Metro/);
  assert.throws(()=>new target.XMLHttpRequest().open('GET','https://example.invalid'),/configured private Metro/);
  assert.throws(()=>new target.WebSocket('ws://example.invalid/hot'),/configured private Metro/);
  await linking.openURL('tel:112');await linking.sendIntent('android.intent.action.CALL');assert.equal(await linking.canOpenURL(origin),false);
  assert.equal(calls.length,3);assert.equal(notices.length,2);assert.equal(Reflect.set(target,'fetch',()=>{}),false);
});

test('offline identity and isolation metadata remain distinct from the dev binaries', () => {
  const phone=guestProfile('guest'), emulator=guestProfile('guest','emulator'), dev=guestProfile('guest-dev');
  assert.equal(phone.applicationId,'com.drgpt.guest');assert.equal(emulator.applicationId,'com.drgpt.guest.emulator');assert.equal(dev.applicationId,'com.drgpt.guest.dev');
  assert.deepEqual(phone.runtime,{mode:'fixture',schemaVersion:1,network:'deny'});assert.deepEqual(emulator.runtime,phone.runtime);
  assert.deepEqual(emulator.architectures,['x86_64']);assert.deepEqual(dev.architectures,['arm64-v8a']);
  assert.throws(()=>guestProfile(undefined),/DRGPT_BUILD_PROFILE/);assert.throws(()=>guestProfile('live'),/DRGPT_BUILD_PROFILE/);assert.throws(()=>guestProfile('guest','unknown'),/target/);
});
