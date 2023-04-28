import { Session, User } from '@supabase/supabase-js';

import { supabase } from '../config/supabase';
import { ApiResponseError } from '../utils/error.util';
import { translateAuthError } from '../utils/translate/auth-translate.util';

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<{
  user: User | null;
  session: Session | null;
}> => {
  try {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
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

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<{ user: User | null; session: Session | null }> => {
  try {
    const { error, data } = await supabase.auth.signUp({ email, password });
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

export const getCurrentSession = async (): Promise<Session> => {
  try {
    const { error, data } = await supabase.auth.getSession();
    if (error) {
      const translatedError = translateAuthError(error);
      throw new Error(translatedError.message, { cause: translatedError.title });
    }
    return data.session;
  } catch (error) {
    throw new ApiResponseError(error.message || 'Une erreur est survenue.', {
      cause: error.cause || 'Erreur.',
    });
  }
};

export const updateUserEmail = async (newEmail: string): Promise<User | null> => {
  try {
    const { error, data } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      const translatedError = translateAuthError(error);
      throw new Error(translatedError.message, { cause: translatedError.title });
    }
    return data.user;
  } catch (error) {
    throw new ApiResponseError(error.message || 'Une erreur est survenue.', {
      cause: error.cause || 'Erreur.',
    });
  }
};
