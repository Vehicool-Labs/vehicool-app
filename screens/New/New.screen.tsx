import { faCarAlt, faHome, faSuitcase } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

const NewScreen = ({ navigation }) => {
  const handleNewVehicle = () => navigation.navigate('NewVehicleScreen');

  // TODO => If no vehicle, hide new trip buttons

  return (
    <View style={{ padding: 20 }}>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 500, marginBottom: 16 }}>Trajet</Text>
        <Button
          backgroundColor={Colors.transparent}
          style={{
            borderColor: Colors.primary,
            borderWidth: 1,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 14,
            paddingBottom: 14,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <View>
            <Text style={{ fontWeight: 'bold' }} color={Colors.primary}>
              Trajet personnel
            </Text>
          </View>
          <FontAwesomeIcon icon={faHome} color={Colors.primary} />
        </Button>
        <Button
          backgroundColor={Colors.transparent}
          style={{
            borderColor: Colors.primary,
            borderWidth: 1,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 14,
            paddingBottom: 14,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <View>
            <Text style={{ fontWeight: 'bold' }} color={Colors.primary}>
              Trajet professionnel
            </Text>
          </View>
          <FontAwesomeIcon icon={faSuitcase} color={Colors.primary} />
        </Button>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 500, marginBottom: 16 }}>Véhicule</Text>
        <Button
          backgroundColor={Colors.transparent}
          onPress={handleNewVehicle}
          style={{
            borderColor: Colors.primary,
            borderWidth: 1,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 14,
            paddingBottom: 14,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <View>
            <Text style={{ fontWeight: 'bold' }} color={Colors.primary}>
              Nouveau véhicule
            </Text>
          </View>
          <FontAwesomeIcon icon={faCarAlt} color={Colors.primary} />
        </Button>
      </View>
    </View>
  );
};

export default NewScreen;
