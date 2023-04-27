import { ILocation } from '../../types/location.type';

export type LocationState = {
  currentLocation: ILocation | null;
  cachedLocations: ILocation[];
};

type SetLocationStateAction = {
  type: 'location/setState';
  payload: Partial<LocationState>;
};

type SetCachedLocationAction = {
  type: 'location/setCached';
  payload: ILocation[];
};

export type LocationReducerActions = SetLocationStateAction | SetCachedLocationAction;
