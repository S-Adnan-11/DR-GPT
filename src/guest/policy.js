const CONFIGURATION_ERROR =
  'This test app requires the guest fixture configuration. Rebuild with DRGPT_BUILD_PROFILE=guest. No live service fallback is available.';

function configurationError(configuration) {
  return configuration?.mode === 'fixture' &&
    configuration.schemaVersion === 1 &&
    configuration.network === 'deny'
    ? null
    : CONFIGURATION_ERROR;
}

function assertConfiguration(configuration) {
  const error = configurationError(configuration);
  if (error) throw new Error(error);
}

function installIsolation(target, linking, notify) {
  const denyNetwork = () => {
    throw new TypeError('Network access is disabled in this fictional-data build.');
  };
  class DisabledRequest {
    open() { denyNetwork(); }
    send() { denyNetwork(); }
  }
  class DisabledSocket {
    constructor() { denyNetwork(); }
  }
  Object.assign(DisabledSocket, { CONNECTING: 0, OPEN: 1, CLOSING: 2, CLOSED: 3 });
  for (const [name, value] of Object.entries({
    fetch: async () => denyNetwork(),
    XMLHttpRequest: DisabledRequest,
    WebSocket: DisabledSocket,
    EventSource: DisabledSocket,
  })) {
    Object.defineProperty(target, name, { value, writable: false, configurable: false });
  }
  for (const name of ['openURL', 'sendIntent']) {
    Object.defineProperty(linking, name, {
      value: async () => notify('External action blocked', 'Links, booking, calls and messages are disabled in this test build.'),
      writable: false,
      configurable: false,
    });
  }
  Object.defineProperty(linking, 'canOpenURL', {
    value: async () => false, writable: false, configurable: false,
  });
}

module.exports = { configurationError, assertConfiguration, installIsolation };
