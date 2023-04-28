import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { Button, Colors, View } from 'react-native-ui-lib';

import Input from '../../components/forms/inputs/Input';
import { useAuthContext } from '../../contexts/auth.context';
import useForm from '../../hooks/useForm';
import { updateUserEmail } from '../../services/auth.service';
import { ApiResponseError } from '../../utils/error.util';

const UpdateEmailScreen = () => {
  const { currentUser, dispatchCurrentUser } = useAuthContext();
  const { formState, handleChangeValue, handleValidateInput, isFormInvalid } = useForm({
    initialValues: {
      email: currentUser.email,
    },
  });

  const navigation = useNavigation();

  const handleSaveEmail = async () => {
    if (isFormInvalid) {
      return;
    }
    try {
      const user = await updateUserEmail(formState?.email?.value.trim());
      dispatchCurrentUser(user);
      navigation.goBack();
    } catch (error) {
      const apiError: ApiResponseError = error;
      Alert.alert(apiError.cause || 'Erreur', apiError.message, []);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button label="Enregistrer" link color={Colors.primary} onPress={handleSaveEmail} />
      ),
    });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Input
        placeholder="Adresse email"
        value={formState?.email?.value || ''}
        onChangeText={handleChangeValue('email')}
        enableErrors
        textContentType="emailAddress"
        validate={['required', 'email']}
        validationMessage={['Champ requis.', 'Adresse email invalide.']}
        validateOnChange
        onChangeValidity={handleValidateInput('email')}
        isValid={formState.email?.isValid}
      />
    </View>
  );
};

export default UpdateEmailScreen;
