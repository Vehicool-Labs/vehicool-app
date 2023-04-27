import { ReactNode, createContext, useContext, useReducer } from 'react';

import { LocationState } from './location-context.type';
import locationReducer from './location.reducer';
import { ILocation } from '../../types/location.type';

type LocationContextValue = {
  state: LocationState;
  setLocationState: (newState: Partial<LocationState>) => void;
  setCachedLocations: (locations: ILocation[]) => void;
};

const INITIAL_STATE: LocationState = {
  currentLocation: null,
  cachedLocations: [],
};

export const LocationContext = createContext<LocationContextValue | null>(null);

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (context === null) {
    throw new Error('useLocationContext is null');
  }
  if (context === undefined) {
    throw new Error('useLocationContext was used outside of its Provider');
  }
  return context;
};

type LocationContextProviderProperties = {
  children: ReactNode;
};

const LocationContextProvider = ({ children }: LocationContextProviderProperties) => {
  const [state, dispatch] = useReducer(locationReducer, INITIAL_STATE);

  const setLocationState = (newState: Partial<LocationState>) => {
    dispatch({
      type: 'location/setState',
      payload: newState,
    });
  };

  const setCachedLocations = (locations: ILocation[]) => {
    dispatch({
      type: 'location/setCached',
      payload: locations,
    });
  };

  const contextValue: LocationContextValue = {
    state,
    setLocationState,
    setCachedLocations,
  };

  return <LocationContext.Provider value={contextValue}>{children}</LocationContext.Provider>;
};

export default LocationContextProvider;
