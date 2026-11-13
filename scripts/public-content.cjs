const fs = require('node:fs'), path = require('node:path');
const { selectPublicCatalog } = require('../src/catalog/catalog');

// Export content independently of the private guest app's static image registry.
// Images must be explicitly cleared before a public bundle can copy them.
function writePublicContent(catalog, directory, clearedImages = {}) {
  const selected = selectPublicCatalog(catalog);
  const images = [...new Set([...selected.guides, ...selected.firstAid].flatMap((guide) => guide.images))];
  for (const id of images) {
    if (!Object.hasOwn(clearedImages, id) || !fs.statSync(clearedImages[id]).isFile()) throw new Error(`Public image needs a cleared file: ${id}`);
  }
  // A new directory prevents stale private records or assets surviving an export.
  fs.mkdirSync(directory);
  fs.writeFileSync(path.join(directory, 'catalog.json'), JSON.stringify(selected, null, 2) + '\n');
  if (images.length) fs.mkdirSync(path.join(directory, 'images'));
  for (const id of images) fs.copyFileSync(clearedImages[id], path.join(directory, 'images', id + path.extname(clearedImages[id])));
  return selected;
}
module.exports = { writePublicContent };
if (require.main === module) {
  if (!process.argv[2]) throw new Error('Supply a new output directory.');
  writePublicContent(require('../src/catalog/catalog.json'), path.resolve(process.argv[2]));
}
