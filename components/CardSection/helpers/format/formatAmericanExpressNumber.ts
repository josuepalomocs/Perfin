const formatAmericanExpressNumber = (number: string) => {
  return number
    .replace(/[^\dA-Z]/g, "")
    .replace(/(.{10})/g, "$1 ")
    .replace(/(.{4})/, "$1 ")
    .trim();
};

export default formatAmericanExpressNumber;
