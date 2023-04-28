import { User } from '@supabase/supabase-js';
import { node } from 'prop-types';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { getCurrentSession } from '../services/auth.service';

type AuthContextValue = {
  currentUser: User | null;
  getCurrentUser: () => Promise<User>;
  dispatchCurrentUser: (user: User) => void;
  csrfToken: string | null;
  dispatchCsrfToken: (token: string) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
export { AuthContext };

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuthContext is null');
  }
  if (context === undefined) {
    throw new Error('useAuthContext was used outside of its Provider');
  }
  return context;
};

type AuthContextProviderProperties = {
  children: ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProviderProperties) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const getCurrentUser = useCallback(async () => {
    try {
      const { user } = await getCurrentSession();
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  }, [setCurrentUser]);

  const dispatchCurrentUser = useCallback(
    (user: User | null) => {
      setCurrentUser(
        !user
          ? user
          : {
              ...currentUser,
              ...user,
            }
      );
    },
    [setCurrentUser, currentUser]
  );

  const dispatchCsrfToken = useCallback(
    (token: string) => {
      setCsrfToken(token);
    },
    [setCsrfToken]
  );

  const contextValues = useMemo(
    () => ({
      currentUser,
      getCurrentUser,
      dispatchCurrentUser,
      csrfToken,
      dispatchCsrfToken,
    }),
    [currentUser, getCurrentUser, dispatchCurrentUser, csrfToken, dispatchCsrfToken]
  );

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

AuthContextProvider.propTypes = { children: node.isRequired };
