import { Reducer } from 'react';

import { LocationReducerActions, LocationState } from './location-context.type';

const locationReducer: Reducer<LocationState, LocationReducerActions> = (state, action) => {
  switch (action.type) {
    case 'location/setState':
      return { ...state, ...action.payload };
    case 'location/setCached':
      return {
        ...state,
        cachedLocations: [...state.cachedLocations, ...action.payload],
      };
    default:
      return state;
  }
};

export default locationReducer;
