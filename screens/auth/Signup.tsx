import { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Button, Colors, Text, TextField, View } from 'react-native-ui-lib';

import { supabase } from '../../config/supabase';

const validatePassword = (value: string) => value.length >= 8;
const validatePasswordConfirm = (valueToCompare: string) => (value: string) =>
  valueToCompare === value;

type SignupFormState = Record<string, { value: any; isValid: boolean }>;

const SignupScreen = ({ navigation }) => {
  const [formState, setFormState] = useState<SignupFormState>({});

  const getFormValidationState = () => Object.entries(formState).find(([, value]) => value.isValid);

  const handleChangeValue = (fieldName: string) => (value: any) => {
    setFormState((prevValue) => ({
      ...prevValue,
      [fieldName]: {
        ...prevValue[fieldName],
        value,
      },
    }));
  };

  const handleChangeValidity = (fieldName: string) => (isValid: boolean) => {
    setFormState((prevValue) => ({
      ...prevValue,
      [fieldName]: {
        ...prevValue[fieldName],
        isValid,
      },
    }));
  };

  const handleSubmit = async () => {
    console.log('SUBMIT', formState);
    const { error, data } = await supabase.auth.signUp({
      email: formState.email.value,
      password: formState.password.value,
    });
    if (error) {
      console.log(error);
      return;
    }
    console.log('Signed in', data);
    navigation.navigate('Dashboard');
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
      }}>
      <View>
        <Text text30>Inscrivez-vous</Text>
        <TextField
          placeholder="Adresse email"
          floatingPlaceholder
          onChangeText={handleChangeValue('email')}
          enableErrors
          validate={['required', 'email', (value) => value.length > 6]}
          validationMessage={['Champ requis.', 'Adresse email invalide.']}
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 8,
          }}
          validateOnBlur
          onChangeValidity={handleChangeValidity('email')}
        />
        <TextField
          placeholder="Mot de passe"
          floatingPlaceholder
          enableErrors
          validate={['required', validatePassword]}
          validationMessage={[
            'Champ requis.',
            'Le mot de passe doit contenir au moins 8 caractères.',
          ]}
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 8,
          }}
          onChangeText={handleChangeValue('password')}
          validateOnChange
          onChangeValidity={handleChangeValidity('password')}
        />
        <TextField
          placeholder="Confirmer le mot de passe"
          floatingPlaceholder
          onChangeText={handleChangeValue('passwordConfirm')}
          enableErrors
          validate={['required', validatePasswordConfirm(formState.password.value)]}
          validationMessage={['Champ requis.', 'Doit être identique au mot de passe']}
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 8,
          }}
          validateOnChange
          onChangeValidity={handleChangeValidity('passwordConfirm')}
        />
        <Button
          label="Inscription"
          borderRadius={8}
          size={Button.sizes.large}
          backgroundColor={Colors.purple30}
          disabled={!getFormValidationState()}
          onPress={handleSubmit}
          style={{
            marginBottom: 8,
          }}
        />
        <Button
          label="Déjà un compte ? Se connecter"
          size={Button.sizes.medium}
          backgroundColor={Colors.transparent}
          color="black"
          link
          onPress={() => navigation.navigate('Inscription')}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
