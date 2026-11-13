export const illustrations = {
  library: require('../../assets/LibraryPhotos/medical_library.jpg'),
  sleep: require('../../assets/LibraryPhotos/sleep.jpg'),
  nutrition: require('../../assets/LibraryPhotos/nutrition2.jpeg'),
  mental: require('../../assets/LibraryPhotos/mental_health.jpg'),
  fitness: require('../../assets/LibraryPhotos/fitness3.jpg'),
  firstAid: require('../../assets/FirstAidIcons/first_aid.jpg'),
  'cpr-choking': require('../../assets/FirstAidIcons/cpr-icon.png'),
  'wounds-burns-bleeding': require('../../assets/FirstAidIcons/burn-icon.png'),
  'poison-allergies': require('../../assets/FirstAidIcons/poison-icon.png'),
  // Generated from the unchanged PNG-named WebP in private build staging.
  'fractures-sprains': require('../../assets/FirstAidIcons/fracture-icon.webp'),
};

export const topics = [
  { id: 'sleep', title: 'Sleep & rest' },
  { id: 'nutrition', title: 'Food & nutrition' },
  { id: 'mental', title: 'Mental health' },
  { id: 'fitness', title: 'Movement & fitness' },
];

const recordIllustrations = {
  ...require('./legacy-images'),
  'legacy-libraryphotos-medical_library-jpg': illustrations.library,
  'legacy-firstaidicons-cpr-icon-png': illustrations['cpr-choking'],
  'legacy-firstaidicons-burn-icon-png': illustrations['wounds-burns-bleeding'],
  'legacy-firstaidicons-poison-icon-png': illustrations['poison-allergies'],
  'legacy-firstaidicons-fracture-icon-png': illustrations['fractures-sprains'],
};
export const imageById = (id) => recordIllustrations[id];
export const recordImage = (record) => imageById(record.images[0]);
