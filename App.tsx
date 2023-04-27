import 'expo-dev-client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';

import { supabase } from './config/supabase';
import SigninScreen from './screens/auth/Signin';
import SignupScreen from './screens/auth/Signup';
import DashboardScreen from './screens/dashboard';

const Stack = createNativeStackNavigator();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session?.user ? (
          <>
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ title: 'On my way' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Connexion" component={SigninScreen} />
            <Stack.Screen name="Inscription" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
