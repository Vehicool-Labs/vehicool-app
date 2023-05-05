import { Colors, TextField, TextFieldProps, View } from 'react-native-ui-lib';

type InputProperties = TextFieldProps & {
  type?: 'email' | 'password' | 'text';
  isValid?: boolean;
  isDebounced?: boolean;
  debounceDelay?: number;
};

const DEBOUNCE_DELAY = 400;

const Input = ({
  type = 'text',
  isValid = true,
  onChangeText,
  isDebounced = false,
  debounceDelay = DEBOUNCE_DELAY,
  ...rest
}: InputProperties) => {
  let delay: NodeJS.Timeout;

  const handleClearDelay = () => {
    clearTimeout(delay);
  };

  const handleChangeText = (value) => {
    if (isDebounced) {
      handleClearDelay();
      delay = setTimeout(() => {
        onChangeText(value);
      }, debounceDelay);
    } else {
      onChangeText(value);
    }
  };

  return (
    <View style={{ marginBottom: 0 }}>
      <TextField
        secureTextEntry={type === 'password'}
        onChangeText={handleChangeText}
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
        }}
        {...rest}
      />
    </View>
  );
};

export default Input;
