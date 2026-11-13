const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');

function prepareGuestAssets(root) {
  const original = path.join(root, 'assets/FirstAidIcons/fracture-icon.png');
  const folder = path.join(root, '.expo/guest-assets');
  const alias = path.join(folder, 'fracture-icon.webp');
  const update = () => {
    const bytes = fs.readFileSync(original);
    if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') throw new Error('The retained fracture illustration must contain WebP bytes.');
    fs.mkdirSync(folder, { recursive: true });
    if (!fs.existsSync(alias) || !fs.readFileSync(alias).equals(bytes)) fs.writeFileSync(alias, bytes);
    return crypto.createHash('sha256').update(bytes).digest('hex');
  };
  const sha256 = update();
  const libraryOriginal = path.join(root, 'assets/LibraryPhotos/men_health.png');
  const libraryAlias = path.join(folder, 'men_health.jpg');
  const updateLibrary = () => {
    const bytes = fs.readFileSync(libraryOriginal);
    if (bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) throw new Error('The retained men_health illustration must contain JPEG bytes.');
    if (!fs.existsSync(libraryAlias) || !fs.readFileSync(libraryAlias).equals(bytes)) fs.writeFileSync(libraryAlias, bytes);
    return crypto.createHash('sha256').update(bytes).digest('hex');
  };
  updateLibrary();
  return { original, alias, sha256, update, libraryOriginal, libraryAlias, updateLibrary };
}
module.exports = { prepareGuestAssets };
