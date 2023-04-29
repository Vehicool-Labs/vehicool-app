import {
  faCar,
  faChartMixed,
  faRoad,
  faSteeringWheel,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Colors, Text } from 'react-native-ui-lib';

import AnalyticsScreen from './Analytics';
import HomeScreen from './Home';
import MyGarageScreen from './MyGarage';
import MyTripsScreen from './MyTrips';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Vehicool',
          headerTitleAlign: 'left',
          headerBackgroundContainerStyle: {
            padding: 50,
            backgroundColor: Colors.white,
          },
          headerTitle: () => (
            <Text text30 style={{ fontWeight: 'bold' }}>
              Vehicool
            </Text>
          ),
          headerLargeTitle: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faSteeringWheel} color={color} size={size} />
          ),
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.white },
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('Profile')}
              backgroundColor={Colors.primary}
              style={{ marginRight: 16 }}
              round>
              <FontAwesomeIcon icon={faUser} color={Colors.white} />
            </Button>
          ),
        })}
      />
      <Tab.Screen
        name="MyTripsScreen"
        component={MyTripsScreen}
        options={{
          title: 'Mes trajets',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faRoad} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyGarageScreen"
        component={MyGarageScreen}
        options={{
          title: 'Mon garage',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faCar} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="StatsScreen"
        component={AnalyticsScreen}
        options={{
          title: 'Statistiques',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faChartMixed} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
