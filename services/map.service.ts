import Constants from 'expo-constants';
import { LatLng } from 'react-native-maps';

export const snapToRoad = async (path: LatLng[]) => {
  console.log(Constants.expoConfig.extra.googleMapsApiKey);
  const formattedPath = path.map(({ latitude, longitude }) => `${latitude},${longitude}`).join('|');
  const response = await fetch(
    `https://roads.googleapis.com/v1/snapToRoads?interpolate=true&path=${formattedPath}&key=${Constants.expoConfig.ios.config.googleMapsApiKey}`,
    {
      headers: {
        'X-Ios-Bundle-Identifier': Constants.expoConfig.ios.bundleIdentifier,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    console.error(data);
  }
  return data;
};
