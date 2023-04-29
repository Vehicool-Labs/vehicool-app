export const validatePassword = (value: string) => value.length >= 8;
export const validatePasswordConfirm = (valueToCompare: string) => (value: string) =>
  valueToCompare === value;
