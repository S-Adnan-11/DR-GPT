const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const { prepareGuestAssets } = require('../scripts/guest-assets.cjs');

test('the legacy image alias is private, byte-identical and updates without native compilation', () => {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'drgpt-assets-'));
  const original=path.join(root,'assets/FirstAidIcons/fracture-icon.png');fs.mkdirSync(path.dirname(original),{recursive:true});
  const first=Buffer.from('RIFF0000WEBPfirst');fs.writeFileSync(original,first);
  const asset=prepareGuestAssets(root);assert.ok(asset.alias.startsWith(path.join(root,'.expo')));assert.ok(fs.readFileSync(asset.alias).equals(first));
  const second=Buffer.from('RIFF0000WEBPsecond');fs.writeFileSync(original,second);asset.update();assert.ok(fs.readFileSync(asset.alias).equals(second));
  fs.writeFileSync(original,'invalid image');assert.throws(()=>asset.update(),/WebP/);
});
