import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from 'react-native-ui-lib';

import BrandSelectorScreen from './BrandSelector.screen';
import LicenseNumberScreen from './LicenseNumber.screen';
import ModelSelectorScreen from './ModelSelector.screen';
import NewVehicleScreen from './NewVehicle.screen';
import VersionSelectorScreen from './VersionSelector.screen';

const Stack = createNativeStackNavigator();

const NewVehicleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Nouveau véhicule',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.grey70 },
        }}
        component={NewVehicleScreen}
        name="NewVehicleScreen"
      />
      <Stack.Screen
        options={{
          title: 'Marque',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.grey70 },
          headerBackTitle: 'Retour',
        }}
        component={BrandSelectorScreen}
        name="BrandSelectorScreen"
      />
      <Stack.Screen
        options={{
          title: 'Modèle',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.grey70 },
          headerBackTitle: 'Retour',
        }}
        component={ModelSelectorScreen}
        name="ModelSelectorScreen"
      />
      <Stack.Screen
        options={{
          title: 'Version',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.grey70 },
          headerBackTitle: 'Retour',
        }}
        component={VersionSelectorScreen}
        name="VersionSelectorScreen"
      />
    </Stack.Navigator>
  );
};

export default NewVehicleStack;
