import {
  Accuracy,
  getCurrentPositionAsync,
  LocationObject,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from 'expo-location';
import { defineTask } from 'expo-task-manager';

import { locationObserver } from '../contexts/location/location.observer';
import { ILocation } from '../types/location.type';

const LOCATION_TASK_NAME = 'background-location-task';

export const getCurrentLocation = async (): Promise<LocationObject> => {
  const location = await getCurrentPositionAsync({});
  return location;
};

export const startTrackingLocation = async () => {
  return await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Accuracy.Highest,
  });
};

export const stopTrackingLocation = async () => {
  return await stopLocationUpdatesAsync(LOCATION_TASK_NAME);
};

defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error('background-location-task ERROR >>>', error);
    return;
  }
  if (data) {
    const { locations } = data as { locations: ILocation[] };
    locationObserver.setLocationState({
      currentLocation: locations[locations.length - 1],
      cachedLocations: locations,
    });
  }
});
