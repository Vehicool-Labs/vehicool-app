import { faCarAlt, faHome, faSuitcase } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

import { getVehicleBrands } from '../../../services/vehicle.service';

const BrandSelectorScreen = ({ navigation }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getVehicleBrands()
      .then((data) => {
        console.log(data.list);
        setBrands(data.list);
      })
      .catch(console.error);
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text text30>Recherche de la marque</Text>
      {brands.map((brand) => (
        <Text key={brand.manufacturer_id}>{brand.manufacturer_name}</Text>
      ))}
    </ScrollView>
  );
};

export default BrandSelectorScreen;
