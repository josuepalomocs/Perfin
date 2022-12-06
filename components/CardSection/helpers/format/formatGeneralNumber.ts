const formatGeneralNumber = (number: string) => {
  return number
    .replace(/[^\dA-Z]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

export default formatGeneralNumber;
