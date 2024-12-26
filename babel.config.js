module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env', // this is the default, you can change it if needed
          path: '.env', // path to your .env file
          safe: true, // Load the .env file safely
          allowUndefined: false, // Prevent undefined variables from being imported
        },
      ],
    ],
  };
};
