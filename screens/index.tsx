import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import AppStack from './App';
import AuthenticationStack from './Authentication';
import ProfileStack from './Profile';
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
            {/* <Stack.Screen
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
            /> */}
            <Stack.Screen name="App" component={AppStack} options={{ headerShown: false }} />
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
          <Stack.Screen name="Authentication" component={AuthenticationStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
