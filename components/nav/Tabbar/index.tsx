import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AnalyticsScreen from '../../../screens/App/Analytics';
import DashboardScreen from '../../../screens/App/Home';
import MyGarageScreen from '../../../screens/App/MyGarage';
import MyTripsScreen from '../../../screens/App/MyTrips';

const Tab = createBottomTabNavigator();

const Tabbar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="MyTrips" component={MyTripsScreen} />
      <Tab.Screen name="MyGarage" component={MyGarageScreen} />
      <Tab.Screen name="Stats" component={AnalyticsScreen} />
    </Tab.Navigator>
  );
};

export default Tabbar;
