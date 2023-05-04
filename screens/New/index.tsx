import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from 'react-native-ui-lib';

import NewScreen from './New.screen';
import NewVehicleScreen from './NewVehicle.screen';

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
          title: 'Nouveau véhicule',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.grey70 },
        }}
        component={NewVehicleScreen}
        name="NewVehicleScreen"
      />
    </Stack.Navigator>
  );
};

export default NewStack;
