import { Alert, Dimensions, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { Button, Colors, Image, Text, View } from 'react-native-ui-lib';

import Input from '../../components/forms/inputs/Input';
import useForm from '../../hooks/useForm';
import { signUpWithEmailAndPassword } from '../../services/auth.service';
import { ApiResponseError } from '../../utils/error.util';

const validatePassword = (value: string) => value.length >= 8;
const validatePasswordConfirm = (valueToCompare: string) => (value: string) =>
  valueToCompare === value;

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;

const SignupScreen = ({ navigation }) => {
  const { formState, handleChangeValue, handleValidateInput, isFormInvalid } = useForm({});

  const handleSubmit = async () => {
    if (isFormInvalid) {
      return;
    }
    try {
      const sessionData = await signUpWithEmailAndPassword(
        formState.email.value,
        formState.password.value
      );
      navigation.navigate('Dashboard');
    } catch (error) {
      const apiError: ApiResponseError = error;
      Alert.alert(apiError.cause || 'Erreur', apiError.message, []);
    }
  };

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: Colors.white,
      }}>
      <KeyboardAvoidingView
        behavior="position"
        style={{
          height: '100%',
        }}>
        <View>
          <Image
            source={require('../../assets/home-car.jpg')}
            style={{ height: imageHeight, width: imageWidth, marginTop: 32, marginBottom: 24 }}
          />
          <View
            style={{
              padding: 20,
            }}>
            <Text text30 style={{ fontWeight: 'bold', marginBottom: 16 }}>
              Inscrivez-vous !
            </Text>
            <Input
              placeholder="Adresse email"
              onChangeText={handleChangeValue('email')}
              enableErrors
              validate={['required', 'email']}
              validationMessage={['Champ requis.', 'Adresse email invalide.']}
              validateOnBlur
              onChangeValidity={handleValidateInput('email')}
              isValid={formState?.email?.isValid}
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              enableErrors
              validate={['required', validatePassword]}
              validationMessage={[
                'Champ requis.',
                'Le mot de passe doit contenir au moins 8 caractères.',
              ]}
              onChangeText={handleChangeValue('password')}
              validateOnChange
              onChangeValidity={handleValidateInput('password')}
              isValid={formState?.password?.isValid}
            />
            <Input
              type="password"
              placeholder="Confirmer le mot de passe"
              onChangeText={handleChangeValue('passwordConfirm')}
              enableErrors
              validate={['required', validatePasswordConfirm(formState?.password?.value)]}
              validationMessage={['Champ requis.', 'Doit être identique au mot de passe']}
              validateOnChange
              onChangeValidity={handleValidateInput('passwordConfirm')}
              isValid={formState?.passwordConfirm?.isValid}
            />
            <Button
              label="Inscription"
              borderRadius={8}
              size={Button.sizes.large}
              backgroundColor={Colors.primary}
              onPress={handleSubmit}
              style={{
                marginBottom: 24,
              }}
            />
            <Button
              label="Déjà un compte ? Se connecter"
              size={Button.sizes.large}
              link
              color={Colors.primary}
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
