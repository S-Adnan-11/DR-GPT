const path = require('node:path');
const net = require('node:net');

const root = path.resolve(__dirname, '..');
const port = 8081;
process.env.DRGPT_BUILD_PROFILE = 'guest-dev';
process.env.DRGPT_METRO_ORIGIN = `http://127.0.0.1:${port}`;
process.env.EXPO_PACKAGER_PROXY_URL = process.env.DRGPT_METRO_ORIGIN;
process.env.EXPO_NO_TELEMETRY = '1';
process.env.EXPO_OFFLINE = '1';
delete process.env.CI;

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
