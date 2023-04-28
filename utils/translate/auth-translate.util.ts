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
    case 'User already registered':
      return {
        title: 'Adresse email déjà enregistrée.',
        message: "Merci de vous connecter ou d'utiliser une autre adresse pour créer un compte.",
      };
    default:
      return {
        title: 'Erreur.',
        message: 'Une erreur est survenue, veuillez réessayer plus tard.',
      };
  }
};
