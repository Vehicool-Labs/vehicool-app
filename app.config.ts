import 'dotenv/config';
import { ConfigContext, ExpoConfig } from 'expo/config';

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const AppConfig = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: process.env.APP_NAME,
  slug: process.env.APP_NAME,
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: process.env.APP_BUNDLE_IDENTIFIER,
    infoPlist: {
      infoPlist: {
        UIBackgroundModes: ['location', 'fetch'],
      },
    },
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: process.env.APP_BUNDLE_IDENTIFIER,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    supabaseURL: process.env.SUPABASE_PROJECT_URL,
    publicSupabaseKey: process.env.PUBLIC_SUPABASE_KEY,
    googleMapsAPIKey: process.env.GOOGLE_MAPS_API_KEY,
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  },
  plugins: [
    [
      'expo-build-properties',
      {
        ios: {
          deploymentTarget: '13.0',
        },
      },
    ],
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission:
          'Allow $(PRODUCT_NAME) to use your location for tracking you car trips.',
        locationAlwaysPermission:
          'Allow $(PRODUCT_NAME) to use your location for tracking you car trips.',
        isIosBackgroundLocationEnabled:
          'Allow $(PRODUCT_NAME) to use your location for tracking you car trips when you do not use your phone.',
        isAndroidBackgroundLocationEnabled:
          'Allow $(PRODUCT_NAME) to use your location for tracking you car trips when you do not use your phone.',
      },
    ],
  ],
});

export default AppConfig;
