import { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Button, Colors, Text, TextField, View } from 'react-native-ui-lib';

import { supabase } from '../../config/supabase';

const validatePassword = (value: string) => value.length >= 8;

type SigninFormState = Record<string, { value: any; isValid: boolean }>;

const SigninScreen = ({ navigation }) => {
  const [formState, setFormState] = useState<SigninFormState>({});

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
    const { error, data } = await supabase.auth.signInWithPassword({
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
        <Text text30>Connectez-vous</Text>
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
          onChangeText={handleChangeValue('password')}
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
          validateOnChange
          onChangeValidity={handleChangeValidity('password')}
        />
        <Button
          label="Connexion"
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
          label="Pas de compte ? S'inscrire"
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

export default SigninScreen;
