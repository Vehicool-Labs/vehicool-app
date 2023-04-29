import { faUser } from '@fortawesome/pro-light-svg-icons/faUser';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Button, Colors } from 'react-native-ui-lib';

import ProfileStack from './Profile';
import SigninScreen from './auth/Signin';
import SignupScreen from './auth/Signup';
import DashboardScreen from './dashboard';
import { supabase } from '../config/supabase';
import { useAuthContext } from '../contexts/auth.context';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const [session, setSession] = useState<Session | null>(null);

  const { dispatchCurrentUser } = useAuthContext();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('MAIN GET SESSION >>>', session);
      setSession(session);
      dispatchCurrentUser(session?.user);
    });

    supabase.auth.onAuthStateChange((state, session) => {
      console.log('MAIN AUTH STATE CHANGED >>>', state, session);
      setSession(session);
      dispatchCurrentUser(session?.user || null);
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
              options={({ navigation }) => ({
                title: 'Vehicool',
                headerLargeTitle: true,
                headerShadowVisible: false,
                headerStyle: { backgroundColor: Colors.white },
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate('Profile')}
                    backgroundColor={Colors.primary}
                    round>
                    <FontAwesomeIcon icon={faUser} color={Colors.white} />
                  </Button>
                ),
              })}
            />
            <Stack.Screen
              options={{
                presentation: 'modal',
                headerShown: false,
              }}
              component={ProfileStack}
              name="Profile"
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              options={{
                title: 'Vehicool',
                headerLargeTitle: true,
                headerShadowVisible: false,
                headerStyle: { backgroundColor: Colors.white },
              }}
              component={SigninScreen}
            />
            <Stack.Screen
              name="SignUp"
              component={SignupScreen}
              options={{
                title: 'Vehicool',
                headerLargeTitle: true,
                headerShadowVisible: false,
                headerStyle: { backgroundColor: Colors.white },
                headerBackButtonMenuEnabled: false,
                headerBackVisible: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
