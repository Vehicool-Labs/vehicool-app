import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from 'react-native-ui-lib';

import SigninScreen from './Signin.screen';
import SignupScreen from './Signup.screen';

const Stack = createNativeStackNavigator();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignInScreen"
        options={{
          title: 'Vehicool',
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.white },
        }}
        component={SigninScreen}
      />
      <Stack.Screen
        name="SignUpScreen"
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
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
