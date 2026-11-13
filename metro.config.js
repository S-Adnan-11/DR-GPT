// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
const fs = require('node:fs');
const { prepareGuestAssets } = require('./scripts/guest-assets.cjs');
const assets = prepareGuestAssets(__dirname);
const { prepareGuestContent } = require('./scripts/guest-content.cjs');
const content = prepareGuestContent(__dirname);
config.resolver.resolveRequest = (context, name, platform) => {
  const request = name.replace(/\\/g, '/');
  const resolved = request.endsWith('/assets/FirstAidIcons/fracture-icon.webp') ? assets.alias
    : request.endsWith('/assets/LibraryPhotos/men_health.jpg') ? assets.libraryAlias
    : request === './legacy-guides.json' ? content.dataFile
    : request === './legacy-images' ? content.imageFile : name;
  return context.resolveRequest(context, resolved, platform);
};
if (process.env.DRGPT_BUILD_PROFILE === 'guest-dev') {
  fs.watchFile(assets.original, { persistent: false, interval: 500 }, () => {
    try { assets.update(); } catch (error) { console.error(error.message); }
  });
  fs.watchFile(assets.libraryOriginal, { persistent: false, interval: 500 }, () => {
    try { assets.updateLibrary(); } catch (error) { console.error(error.message); }
  });
  for (const filename of ['src/screens/MedicalLibraryScreen.js', ...Object.keys(require('./scripts/guest-content.cjs').TOPICS).map((route) => `src/screens/MedicalLibrary/${route}.js`)]) {
    fs.watchFile(require('node:path').join(__dirname, filename), { persistent: false, interval: 500 }, () => {
      try { prepareGuestContent(__dirname); } catch (error) { console.error(error.message); }
    });
  }
}

module.exports = config;
