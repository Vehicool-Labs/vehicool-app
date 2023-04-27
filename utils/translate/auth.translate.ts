import { AuthError } from '@supabase/supabase-js';

type TranslatedError = {
  title: string;
  message: string;
};

export const translateAuthError = (error: AuthError): TranslatedError => {
  switch (error.message) {
    case 'Invalid login credentials':
      return {
        title: 'Indentifiants incorrects.',
        message: 'Veuilliez vérifier vos identifiants.',
      };
    default:
      return {
        title: 'Erreur',
        message: 'Une erreur est survenue, veuillez réessayer plus tard.',
      };
  }
};
