module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          "root": ["./src"],
          "alias": {
            "$assets": "./src/assets",
            "$api": "./src/api",
            "$models": "./src/data_models",
            "$screens": "./src/screens",
            "$navigation": "./src/navigation",
            "$components": "./src/components",
            "$constants": "./src/constants",
          },
        }
      ]
    ]
  };
};
