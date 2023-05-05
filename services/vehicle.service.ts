import Constants from 'expo-constants';

import { supabase } from '../config/supabase';
import { AutoPassVehicle, Vehicle } from '../types/vehicle.type';
import { ApiResponseError } from '../utils/error.util';
import { translateAuthError } from '../utils/translate/auth-translate.util';

const apiKey = Constants.expoConfig.extra.autoPassToken;
const autoPassUrl = 'https://api.autopass.pro/vehicule';

export const searchVehicleFromLicenseNumber = async (
  licenseNumber: string
): Promise<AutoPassVehicle> => {
  try {
    const { data, error } = await supabase.functions.invoke('search-vehicle', {
      body: { license_number: licenseNumber },
    });
    if (error) {
      const translatedError = translateAuthError(error);
      throw new Error(translatedError.message, { cause: translatedError.title });
    }
    return data;
  } catch (error) {
    throw new ApiResponseError(error.message || 'Une erreur est survenue.', {
      cause: error.cause || 'Erreur.',
    });
  }
};

export const getVehicleFromLicenseNumber = async (
  licenseNumber: string
): Promise<AutoPassVehicle> => {
  try {
    const response = await fetch(
      `${autoPassUrl}?reg_or_vin=${licenseNumber}&reg_country=fr&access_token=${apiKey}`
    );
    const data = await response.json();
    if (!response.ok) {
      console.error(data);
      const translatedError = translateAuthError(data);
      throw new Error(translatedError.message, { cause: translatedError.title });
    }
    return data;
  } catch (error) {
    throw new ApiResponseError(error.message || 'Une erreur est survenue.', {
      cause: error.cause || 'Erreur.',
    });
  }
};

export const createNewVehicle = async (vehicle: Vehicle) => {
  try {
    const { data, error } = await supabase.from('vehicles').insert(vehicle);
    if (error) {
      console.error(error);
      const translatedError = translateAuthError(error);
      throw new Error(translatedError.message, { cause: translatedError.title });
    }
    return data;
  } catch (error) {
    console.error(error);
    throw new ApiResponseError(error.message || 'Une erreur est survenue.', {
      cause: error.cause || 'Erreur.',
    });
  }
};

export const getVehicleBrands = async () => {
  try {
    const response = await fetch(
      `https://api.autopass.pro/common/manufacturer?access_token=${apiKey}`
    );
    const data = await response.json();
    if (!response.ok) {
      console.error(data);
      const translatedError = translateAuthError(data);
      throw new Error(translatedError.message, { cause: translatedError.title });
    }
    return data;
  } catch (error) {
    throw new ApiResponseError(error.message || 'Une erreur est survenue.', {
      cause: error.cause || 'Erreur.',
    });
  }
};
