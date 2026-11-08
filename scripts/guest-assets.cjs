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
  return { original, alias, sha256, update };
}
module.exports = { prepareGuestAssets };
