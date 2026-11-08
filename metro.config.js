// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
const fs = require('node:fs');
const { prepareGuestAssets } = require('./scripts/guest-assets.cjs');
const assets = prepareGuestAssets(__dirname);
config.resolver.resolveRequest = (context, name, platform) => context.resolveRequest(context,
  name.replace(/\\/g, '/').endsWith('/assets/FirstAidIcons/fracture-icon.webp') ? assets.alias : name, platform);
if (process.env.DRGPT_BUILD_PROFILE === 'guest-dev') {
  fs.watchFile(assets.original, { persistent: false, interval: 500 }, () => {
    try { assets.update(); } catch (error) { console.error(error.message); }
  });
}

module.exports = config;
