import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from 'react-native-ui-lib';

import NewScreen from './New.screen';
import NewVehicleStack from './NewVehicle';
import NewVehicleScreen from './NewVehicle/NewVehicle.screen';

const Stack = createNativeStackNavigator();

const NewStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Nouveau',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.grey70 },
        }}
        component={NewScreen}
        name="NewScreen"
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={NewVehicleStack}
        name="NewVehicle"
      />
    </Stack.Navigator>
  );
};

export default NewStack;
