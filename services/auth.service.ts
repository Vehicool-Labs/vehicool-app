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

type PasswordUpdateDTO = { currentPassword: string; newPassword: string };

export const updateUserPassword = async (
  currentUser: User,
  { currentPassword, newPassword }: PasswordUpdateDTO
): Promise<void> => {
  try {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: currentUser.email,
      password: currentPassword,
    });
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    const error = signInError || updateError;
    if (error) {
      const translatedError = translateAuthError(error);
      throw new Error(translatedError.message, { cause: translatedError.title });
    }
  } catch (error) {
    throw new ApiResponseError(error.message || 'Une erreur est survenue.', {
      cause: error.cause || 'Erreur.',
    });
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      const translatedError = translateAuthError(error);
      throw new Error(translatedError.message, { cause: translatedError.title });
    }
  } catch (error) {
    throw new ApiResponseError(error.message || 'Une erreur est survenue.', {
      cause: error.cause || 'Erreur.',
    });
  }
};
