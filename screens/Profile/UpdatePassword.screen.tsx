import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { Button, Colors, View } from 'react-native-ui-lib';

import Input from '../../components/forms/inputs/Input';
import { useAuthContext } from '../../contexts/auth.context';
import useForm from '../../hooks/useForm';
import { updateUserPassword } from '../../services/auth.service';
import { ApiResponseError } from '../../utils/error.util';
import { validatePassword, validatePasswordConfirm } from '../../utils/form-validation.util';

const UpdatePasswordScreen = () => {
  const { formState, handleChangeValue, handleValidateInput, isFormInvalid } = useForm({});
  const { currentUser } = useAuthContext();

  const navigation = useNavigation();

  const handleSaveNewPassword = async () => {
    if (isFormInvalid) {
      return;
    }
    try {
      await updateUserPassword(currentUser, {
        currentPassword: formState?.password?.value,
        newPassword: formState?.newPassword?.value,
      });
      navigation.goBack();
    } catch (error) {
      const apiError: ApiResponseError = error;
      Alert.alert(apiError.cause || 'Erreur', apiError.message, []);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button label="Enregistrer" link color={Colors.primary} onPress={handleSaveNewPassword} />
      ),
    });
  }, [formState]);

  return (
    <View style={{ padding: 20 }}>
      <Input
        type="password"
        placeholder="Mot de passe actuel"
        value={formState?.password?.value || ''}
        onChangeText={handleChangeValue('password')}
        enableErrors
        textContentType="password"
        validate={['required']}
        validationMessage={['Champ requis.']}
        validateOnChange
        onChangeValidity={handleValidateInput('password')}
        isValid={formState.password?.isValid}
      />
      <Input
        type="password"
        placeholder="Nouveau mot de passe"
        enableErrors
        validate={['required', validatePassword]}
        validationMessage={[
          'Champ requis.',
          'Le mot de passe doit contenir au moins 8 caractères.',
        ]}
        onChangeText={handleChangeValue('newPassword')}
        validateOnChange
        onChangeValidity={handleValidateInput('newPassword')}
        value={formState?.newPassword?.value || ''}
        isValid={formState?.newPassword?.isValid}
      />
      <Input
        type="password"
        placeholder="Confirmer le mot de passe"
        onChangeText={handleChangeValue('passwordConfirm')}
        enableErrors
        validate={['required', validatePasswordConfirm(formState?.newPassword?.value)]}
        validationMessage={['Champ requis.', 'Doit être identique au mot de passe']}
        validateOnChange
        onChangeValidity={handleValidateInput('passwordConfirm')}
        value={formState?.passwordConfirm?.value || ''}
        isValid={formState?.passwordConfirm?.isValid}
      />
    </View>
  );
};

export default UpdatePasswordScreen;
