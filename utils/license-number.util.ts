export const validateLicenseNumber = (value: string) =>
  value.match(
    /[A-HJ-NP-TV-Z]{2}[\s-]{0,1}[0-9]{3}[\s-]{0,1}[A-HJ-NP-TV-Z]{2}|[0-9]{2,4}[\s-]{0,1}[A-Z]{1,3}[\s-]{0,1}[0-9]{2}/
  );

export const formatLicenseNumber = (value: string) => {
  return value.trim().replace(' ', '').replace('-', '');
};
