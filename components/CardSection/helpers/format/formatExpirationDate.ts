// Return a string in the appropriate expiration date format, given a card expiration date
// eg. 01 / 25

const formatExpirationDate = (expirationDate: string) => {
  return expirationDate
    .replace(/^(.{2}\s{1}\/{1})$/, expirationDate.charAt(0))
    .replace(/[^\dA-Z]/g, "")
    .replace(/^(.{2})/, "$1 / ");
};

export default formatExpirationDate;
