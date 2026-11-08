const path = require('node:path');
const net = require('node:net');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const port = 8081;
process.env.DRGPT_BUILD_PROFILE = 'guest-dev';
process.env.DRGPT_METRO_ORIGIN = `http://127.0.0.1:${port}`;
process.env.EXPO_PACKAGER_PROXY_URL = process.env.DRGPT_METRO_ORIGIN;
process.env.EXPO_NO_TELEMETRY = '1';
process.env.EXPO_OFFLINE = '1';
delete process.env.CI;

// SDK 52 resolves manifest asset fields through its public schema cache, even
// in offline mode. Warm that metadata before starting the private server.
const schema = path.join(path.dirname(require.resolve('@expo/cli/package.json')), 'build/src/api/getExpoSchema');
const warmup = spawnSync(process.execPath, ['-e', `require(${JSON.stringify(schema)}).getAssetSchemasAsync('52.0.0').catch(() => { process.exitCode = 1; });`], {
  env: { ...process.env, EXPO_OFFLINE: '0' }, timeout: 12000, stdio: 'pipe', windowsHide: true,
});
if (warmup.status !== 0) console.warn('Expo SDK schema cache is unavailable. Metro can still start; manifest icon metadata may be missing until connectivity returns.');

// SDK 52 advertises localhost URLs without passing a bind host to Metro.
// Bind its TCP listeners explicitly while leaving Unix/Windows pipe calls alone.
const listen = net.Server.prototype.listen;
net.Server.prototype.listen = function (...args) {
  if (args[0] && typeof args[0] === 'object' && args[0].port !== undefined) {
    args[0] = { ...args[0], host: '127.0.0.1' };
  } else if (typeof args[0] === 'number' || (typeof args[0] === 'string' && /^\d+$/.test(args[0]))) {
    if (typeof args[1] === 'string') args[1] = '127.0.0.1';
    else args.splice(1, 0, '127.0.0.1');
  }
  return listen.apply(this, args);
};

process.chdir(root);
const cli = require.resolve('expo/bin/cli');
process.argv = [process.execPath, cli, 'start', root, '--dev-client', '--port', String(port), '--offline'];
require(cli);
