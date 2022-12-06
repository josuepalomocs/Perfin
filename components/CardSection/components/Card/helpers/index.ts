// return the formatted card number, may differ between distinct card brands
// eg. Visa: 4242424242424242 -> 4242 4242 4242 4242
// eg. American Express: 424242424242424 -> 4242 424242 42424
export const getFormattedCardNumber = (cardBrand: string, cardNumber: string) => {
  let formattedCardNumber = "";
  if (cardBrand === "american-express") {
    formattedCardNumber += cardNumber.slice(0, 4) + " " + cardNumber.slice(4, 10) + " " + cardNumber.slice(10, 15);
  } else {
    for (let i = 0; i < 16; i += 4) {
      formattedCardNumber += cardNumber.slice(i, i + 4) + (i != 12 ? " " : "");
    }
  }
  return formattedCardNumber;
};

// return the formatted hidden card number, may differ between distinct card brands
// eg. Visa: 4242 4242 4242 4242 -> •••• •••• •••• 4242
// eg. American Express: 4242 424242 42424 -> •••• •••••• 42424
export const hideFormattedCardNumber = (cardBrand: string, cardNumber: string) => {
  if (cardBrand === "american-express") {
    return cardNumber.replace(/(\d{4})/, "•••• ").replace(/(\d{6})/, "•••••• ");
  }
  return cardNumber.replaceAll(/(\d{4}(?!$))/g, "•••• ");
};
