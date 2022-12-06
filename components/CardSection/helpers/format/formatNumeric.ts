const formatNumeric = (string: string) => {
  return string.replace(/[^\dA-Z]/g, "");
};

export default formatNumeric;
