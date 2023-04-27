import { Colors, TextField, TextFieldProps } from 'react-native-ui-lib';

type InputProperties = TextFieldProps & {
  type?: 'email' | 'password' | 'text';
  isValid?: boolean;
};

const Input = ({ type = 'text', isValid = true, ...rest }: InputProperties) => {
  return (
    <TextField
      secureTextEntry={type === 'password'}
      style={{
        borderColor: isValid === false ? Colors.danger : Colors.light,
        borderWidth: 1,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 8,
      }}
      validationMessageStyle={{
        paddingLeft: 16,
        paddingTop: 4,
      }}
      {...rest}
    />
  );
};

export default Input;
