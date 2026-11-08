function metroAddress(origin) {
  if (typeof origin !== 'string') return null;
  const match = /^http:\/\/(localhost|\d{1,3}(?:\.\d{1,3}){3}):(\d{1,5})$/.exec(origin);
  if (!match || match[0] !== origin) return null;
  const host = match[1], port = Number(match[2]);
  if (port < 1024 || port > 65535 || String(port) !== match[2]) return null;
  if (host !== 'localhost') {
    const parts = host.split('.').map(Number);
    if (parts.some((part, index) => part > 255 || String(part) !== host.split('.')[index])) return null;
    const [a, b] = parts;
    if (!(a === 127 || a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127))) return null;
  }
  return { origin, host, port };
}

function developmentConfigurationError(configuration, developmentRuntime) {
  return developmentRuntime === true && configuration?.mode === 'fixture' && configuration.schemaVersion === 1 &&
    configuration.network === 'metro' && configuration.development === true && metroAddress(configuration.metroOrigin)
    ? null : 'This development app requires an explicit private Metro session and a debug runtime. No live service fallback is available.';
}

function permitsMetro(value, origin, websocket = false) {
  if (!metroAddress(origin)) return false;
  const url = typeof value === 'string' ? value : value?.url;
  if (typeof url !== 'string' || /[\s\\]/.test(url)) return false;
  const expected = websocket ? origin.replace('http:', 'ws:') : origin;
  const absolute = url.startsWith('/') && !url.startsWith('//') ? expected + url : url;
  if (!absolute.startsWith(expected + '/')) return false;
  let route;
  try { route = decodeURIComponent(absolute.slice(expected.length).split(/[?#]/)[0]); } catch { return false; }
  if (route.includes('..') || route.includes('\\') || route.startsWith('//')) return false;
  return websocket
    ? /^\/(?:hot|message|inspector\/(?:device|debug)|events)$/.test(route)
    : /^\/(?:index\.bundle|\.expo\/\.virtual-metro-entry\.bundle|status|symbolicate|logs)$/.test(route) || /^\/(?:assets|node_modules)\//.test(route);
}

function installDevelopmentIsolation(target, linking, notify, configuration, developmentRuntime) {
  const error = developmentConfigurationError(configuration, developmentRuntime);
  if (error) throw new Error(error);
  const origin = configuration.metroOrigin;
  const originalFetch = target.fetch, OriginalRequest = target.XMLHttpRequest, OriginalSocket = target.WebSocket;
  const assertTransport = (value, socket = false) => {
    if (!permitsMetro(value, origin, socket)) throw new TypeError('Only the configured private Metro transport is available in this development app.');
  };
  class MetroRequest extends OriginalRequest {
    open(method, url, ...args) { assertTransport(url); return super.open(method, url, ...args); }
  }
  class MetroSocket extends OriginalSocket {
    constructor(url, ...args) { assertTransport(url, true); super(url, ...args); }
  }
  class DisabledEvents { constructor() { throw new TypeError('EventSource is unavailable in this development app.'); } }
  for (const [name, value] of Object.entries({
    fetch: async (input, options) => { assertTransport(input); return originalFetch.call(target, input, { ...options, redirect: 'error' }); },
    XMLHttpRequest: MetroRequest, WebSocket: MetroSocket, EventSource: DisabledEvents,
  })) Object.defineProperty(target, name, { value, writable: false, configurable: false });
  for (const name of ['openURL', 'sendIntent']) Object.defineProperty(linking, name, {
    value: async () => notify('External action blocked', 'This development app uses fictional content. Calls, messages, booking and external links remain disabled.'), writable: false, configurable: false,
  });
  Object.defineProperty(linking, 'canOpenURL', { value: async () => false, writable: false, configurable: false });
}

module.exports = { metroAddress, developmentConfigurationError, permitsMetro, installDevelopmentIsolation };
