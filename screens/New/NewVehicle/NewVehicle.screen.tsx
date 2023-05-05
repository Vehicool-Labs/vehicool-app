import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

import Input from '../../../components/forms/inputs/Input';
import { useAuthContext } from '../../../contexts/auth.context';
import useForm from '../../../hooks/useForm';
import {
  createNewVehicle,
  searchVehicleFromLicenseNumber,
} from '../../../services/vehicle.service';
import { AutoPassVehicle } from '../../../types/vehicle.type';
import { validateLicenseNumber } from '../../../utils/license-number.util';
import { formatVehicleDataForDatabase } from '../../../utils/vehicle.util';

const NewVehicleScreen = ({ navigation }) => {
  const handleSelectBrand = () => navigation.navigate('BrandSelectorScreen');
  const handleSelectModel = () => navigation.navigate('ModelSelectorScreen');
  const handleSelectVersion = () => navigation.navigate('VersionSelectorScreen');

  const { formState, handleChangeValue, handleValidateInput, isFormInvalid } = useForm({});

  const { currentUser } = useAuthContext();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [selectedBody, setSelectedBody] = useState<string | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<AutoPassVehicle | null>(null);

  const handleChangeLicenseNumber = async (value) => {
    handleChangeValue('license_number')(value.toUpperCase());
    if (!validateLicenseNumber(value.toUpperCase())) {
      return;
    }
    try {
      const data = await searchVehicleFromLicenseNumber(value);
      if (!data) {
        setErrorMessage(
          "Aucun véhicule n'a été trouvé avec cette immatriculation. Veuillez renseigner les informations de votre véhicule manuellement."
        );
      }
      setSelectedVehicle(data);
      setSelectedBrand(data.car_identification.brand);
      setSelectedModel(data.car_identification.model);
      setSelectedVersion(data.car_identification.version);
      setSelectedBody(data.registration_info.body_name);
      setSelectedEnergy(data.registration_info.energy_name);
      handleChangeValue('fiscal_power')(data.registration_info.fiscal_power);
      handleChangeValue('kw_power')(data.registration_info.kw_power);
    } catch (error) {
      setErrorMessage(
        "Aucun véhicule n'a été trouvé avec cette immatriculation. Veuillez renseigner les informations de votre véhicule manuellement."
      );
      console.error(error);
    }
  };

  const handleSaveVehicle = async () => {
    if (isFormInvalid || !selectedModel || !selectedBrand || !selectedVersion) {
      Alert.alert('Formulaire incomplet.', 'Merci de renseigner tous les champs du formulaire.');
      return;
    }
    await createNewVehicle(
      formatVehicleDataForDatabase(selectedVehicle, {
        owner_id: currentUser.id,
        created_at: new Date(),
        is_current: false,
        usage: 'both',
      })
    );
    navigation.navigate('App', 'MyGarageScreen');
  };

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        style={{
          padding: 20,
        }}>
        <View>
          <Input
            placeholder="AA-000-BB"
            label="Plaque d'immatriculation"
            labelStyle={{
              marginLeft: 4,
              marginBottom: 4,
            }}
            value={formState.license_number?.value || ''}
            onChangeText={handleChangeLicenseNumber}
            enableErrors
            validate={['required', validateLicenseNumber]}
            validationMessage={['Champ requis.', 'Veuillez saisir un numéro valide.']}
            validateOnChange
            onChangeValidity={handleValidateInput('license_number')}
            isValid={formState.license_number?.isValid}
          />
          {errorMessage && (
            <View
              style={{
                borderColor: Colors.danger,
                borderWidth: 1,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 14,
                paddingBottom: 14,
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
                marginBottom: 16,
              }}>
              <FontAwesomeIcon icon={faCircleInfo} color={Colors.danger} />
              <Text color={Colors.danger} style={{ flex: 1, flexWrap: 'wrap' }}>
                {errorMessage}
              </Text>
            </View>
          )}
          <Text
            style={{
              marginLeft: 4,
              marginBottom: 4,
            }}>
            Marque
          </Text>
          <Button
            backgroundColor={Colors.transparent}
            onPress={handleSelectBrand}
            style={{
              borderColor: Colors.light,
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
              <Text color={selectedBrand ? Colors.black : Colors.light}>
                {selectedBrand || 'Sélectionnez une marque'}
              </Text>
            </View>
            <FontAwesomeIcon icon={faChevronRight} color={Colors.light} />
          </Button>
          <Text
            style={{
              marginLeft: 4,
              marginBottom: 4,
            }}>
            Modèle
          </Text>
          <Button
            backgroundColor={Colors.transparent}
            onPress={handleSelectModel}
            style={{
              borderColor: Colors.light,
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
              <Text color={selectedModel ? Colors.black : Colors.light}>
                {selectedModel || 'Sélectionnez un modèle'}
              </Text>
            </View>
            <FontAwesomeIcon icon={faChevronRight} color={Colors.light} />
          </Button>
          <Text
            style={{
              marginLeft: 4,
              marginBottom: 4,
            }}>
            Version
          </Text>
          <Button
            backgroundColor={Colors.transparent}
            onPress={handleSelectVersion}
            style={{
              borderColor: Colors.light,
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
              <Text
                color={
                  selectedVersion && selectedBody && selectedEnergy ? Colors.black : Colors.light
                }>
                {selectedVersion && selectedBody && selectedEnergy
                  ? selectedBody + ' ' + selectedVersion + ' ' + selectedEnergy
                  : 'Sélectionnez une version'}
              </Text>
            </View>
            <FontAwesomeIcon icon={faChevronRight} color={Colors.light} />
          </Button>
          <Input
            placeholder="Saisissez la puissance DIN"
            label="Puissance DIN en kW (P2. sur la carte grise)"
            labelStyle={{
              marginLeft: 4,
              marginBottom: 4,
            }}
            value={formState.kw_power?.value || ''}
            onChangeText={handleChangeValue('kw_power')}
            enableErrors
            validate={['required']}
            validationMessage={['Champ requis.']}
            validateOnChange
            onChangeValidity={handleValidateInput('kw_power')}
            isValid={formState.kw_power?.isValid}
            keyboardType="number-pad"
          />
          <Input
            placeholder="Saisissez la puissance fiscale"
            label="Puissance fiscale (P6. sur la carte grise)"
            labelStyle={{
              marginLeft: 4,
              marginBottom: 4,
            }}
            value={formState.fiscal_power?.value || ''}
            onChangeText={handleChangeValue('fiscal_power')}
            enableErrors
            validate={['required']}
            validationMessage={['Champ requis.']}
            validateOnChange
            onChangeValidity={handleValidateInput('fiscal_power')}
            isValid={formState.fiscal_power?.isValid}
            keyboardType="number-pad"
          />
        </View>
        <Button
          label="Enregistrer"
          borderRadius={8}
          size={Button.sizes.large}
          backgroundColor={Colors.primary}
          onPress={handleSaveVehicle}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewVehicleScreen;
