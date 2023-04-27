import { useEffect, useState } from 'react';

import { LocationState } from './location-context.type';
import { ILocation } from '../../types/location.type';

const LocationObserver = () => {
  let subscribers = [];
  let locationState: LocationState = {
    currentLocation: null,
    cachedLocations: [],
  };

  return {
    subscribe: (sub) => subscribers.push(sub),
    setLocationState: (newLocationState: LocationState) => {
      locationState = {
        currentLocation: newLocationState.currentLocation,
        cachedLocations: [...locationState.cachedLocations, ...newLocationState.cachedLocations],
      };
      subscribers.forEach((sub) => sub(locationState));
    },
    setCurrentLocation: (newLocation: ILocation) => {
      locationState.currentLocation = newLocation;
      subscribers.forEach((sub) => sub(locationState));
    },
    setCachedLocations: (newCachedLocations: ILocation[]) => {
      locationState.cachedLocations = [...locationState.cachedLocations, ...newCachedLocations];
      subscribers.forEach((sub) => sub(locationState));
    },
    unsubscribe: (sub) => {
      subscribers = subscribers.filter((_sub) => _sub !== sub);
    },
  };
};

export const locationObserver = LocationObserver();

const useLocationObserver = () => {
  const [locationState, setLocationState] = useState<LocationState>({
    currentLocation: null,
    cachedLocations: [],
  });

  useEffect(() => {
    locationObserver.subscribe(setLocationState);
    () => {
      locationObserver.unsubscribe(setLocationState);
    };
  }, []);

  const { setCurrentLocation, setCachedLocations } = locationObserver;

  return { locationState, setCurrentLocation, setCachedLocations };
};

export default useLocationObserver;
