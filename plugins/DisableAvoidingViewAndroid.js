const { AndroidConfig, withAndroidManifest } = require('@expo/config-plugins');

const { getMainApplicationOrThrow, addMetaDataItemToMainApplication } =
  AndroidConfig.Manifest;

function addAttributesToMainActivity(androidManifest) {
  const { manifest } = androidManifest;

  if (!Array.isArray(manifest['application'])) {
    console.warn(
      'withWordlLineIntentActivity: No application array in manifest?'
    );
    return androidManifest;
  }

  const application = manifest['application'].find(
    (item) => item.$['android:name'] === '.MainApplication'
  );
  if (!application) {
    console.warn('withWordlLineIntentActivity: No .MainApplication?');
    return androidManifest;
  }

  if (!Array.isArray(application['activity'])) {
    console.warn(
      'withWordlLineIntentActivity: No activity array in .MainApplication?'
    );
    return androidManifest;
  }

  const activity = application['activity'].find(
    (item) => item.$['android:name'] === '.MainActivity'
  );
  if (!activity) {
    console.warn('withWordlLineIntentActivity: No .MainActivity?');
    return androidManifest;
  }

  activity.$['android:windowSoftInputMode'] = 'adjustNothing';

  return androidManifest;
}

module.exports = function withIntentActivity(config) {
  return withAndroidManifest(config, (config) => {
    config.modResults = addAttributesToMainActivity(config.modResults);
    return config;
  });
};
