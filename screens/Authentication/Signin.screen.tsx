import { Alert, Dimensions, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { Button, Colors, Text, View, Image } from 'react-native-ui-lib';

import Input from '../../components/forms/inputs/Input';
import useForm from '../../hooks/useForm';
import { signInWithEmailAndPassword } from '../../services/auth.service';
import { ApiResponseError } from '../../utils/error.util';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;

const validatePassword = (value: string) => value.length >= 8;

const SigninScreen = ({ navigation }) => {
  const { formState, handleChangeValue, handleValidateInput, isFormInvalid } = useForm({});

  const handleSubmit = async () => {
    if (isFormInvalid) {
      return;
    }
    try {
      await signInWithEmailAndPassword(formState.email.value, formState.password.value);
      navigation.navigate('App', { screen: 'HomeScreen' });
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
              Connectez-vous !
            </Text>
            <Input
              placeholder="Adresse email"
              onChangeText={handleChangeValue('email')}
              enableErrors
              textContentType="emailAddress"
              validate={['required', 'email']}
              validationMessage={['Champ requis.', 'Adresse email invalide.']}
              validateOnChange
              onChangeValidity={handleValidateInput('email')}
              isValid={formState.email?.isValid}
            />
            <Input
              placeholder="Mot de passe"
              onChangeText={handleChangeValue('password')}
              enableErrors
              type="password"
              validate={['required', validatePassword]}
              textContentType="password"
              validationMessage={[
                'Champ requis.',
                'Le mot de passe doit contenir au moins 8 caractères.',
              ]}
              isValid={formState.password?.isValid}
              validateOnChange
              onChangeValidity={handleValidateInput('password')}
            />
            <Button
              label="Connexion"
              borderRadius={8}
              size={Button.sizes.large}
              backgroundColor={Colors.primary}
              onPress={handleSubmit}
              style={{
                marginBottom: 24,
              }}
            />
            <Button
              label="Pas de compte ? S'inscrire"
              size={Button.sizes.large}
              link
              color={Colors.primary}
              onPress={() => navigation.navigate('Authentication', { screen: 'SignUpScreen' })}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SigninScreen;
