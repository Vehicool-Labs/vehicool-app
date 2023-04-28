import { useState } from 'react';

type FormState = Record<string, { value: any; isValid: boolean }>;

type FormProperties = {
  initialValues?: Record<string, any>;
};

const convertInitialValuesToState = (values?: Record<string, any>): FormState => {
  if (values) {
    const convertedEntries = Object.entries(values).map(([key, value]) => [
      key,
      { value, isValid: true },
    ]);
    return Object.fromEntries(convertedEntries);
  }
  return {};
};

const useForm = ({ initialValues }: FormProperties) => {
  const [formState, setFormState] = useState<FormState>(convertInitialValuesToState(initialValues));

  const isFormInvalid = Object.entries(formState).find(([, value]) => !value.isValid);

  const handleChangeValue = (fieldName: string) => (value: any) => {
    setFormState((prevValue) => ({
      ...prevValue,
      [fieldName]: {
        ...prevValue[fieldName],
        value,
      },
    }));
  };

  const handleValidateInput = (fieldName: string) => (isValid: boolean) => {
    setFormState((prevValue) => ({
      ...prevValue,
      [fieldName]: {
        ...prevValue[fieldName],
        isValid,
      },
    }));
  };

  return {
    formState,
    handleChangeValue,
    isFormInvalid,
    handleValidateInput,
  };
};

export default useForm;
