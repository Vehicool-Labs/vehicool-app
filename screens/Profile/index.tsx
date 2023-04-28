import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from 'react-native-ui-lib';

import ProfileScreen from './Profile.screen';
import UpdateEmailScreen from './UpdateEmail.screen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Profil',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.grey70 },
        }}
        component={ProfileScreen}
        name="ProfileScreen"
      />
      <Stack.Screen
        options={{
          title: 'Adresse email',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.grey70 },
        }}
        component={UpdateEmailScreen}
        name="UpdateEmail"
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
