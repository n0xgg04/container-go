import { ExpoConfig, ConfigContext } from 'expo/config';
import dotenv from 'dotenv';

dotenv.config();
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: (process.env.EXPO_APP_NAME! || config.name)!,
  slug: (process.env.EXPO_APP_SLUG! || config.slug)!,
  scheme: (process.env.EXPO_APP_SLUG! || config.slug)!,
  version: process.env.EXPO_APP_VERSION,
  ios: {
    supportsTablet: true,
    bundleIdentifier: process.env.EXPO_IOS_BUNDLE_IDENTIFIER,
    entitlements: {
      'aps-environment': process.env.NODE_ENV,
    },
    associatedDomains: [`applinks:${process.env.DEEPLINK_BASE_URL}`],
    ...config.ios,
  },
  android: {
    package: process.env.EXPO_ANDROID_PACKAGE,
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAP_API_KEY,
      },
    },
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'https',
            host: process.env.DEEPLINK_BASE_URL,
            pathPrefix: '/',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
    ...config.android,
  },
  experiments: {
    typedRoutes: true,
  },
  extra: {
    oneSignalAppId: process.env.ONE_SIGNAL_APP_ID,
    eas: {
      projectId: process.env.EXPO_PROJECT_ID,
    },
  },
  owner: process.env.EXPO_OWER,
  runtimeVersion: '1.7',
  updates: {
    url: 'https://u.expo.dev/0681fc3a-6aa7-4219-885a-781e0217fd33',
  },
});
