import { Card as CardType } from '../../../types';

// return default cards used for testing
// to be used only in a development environment
export const getTestCards = () => {
  return [
    {
      brand: 'visa',
      nickname: 'Chase Debit',
      number: '4578-4546-5465-2438',
      expirationDate: '10/25',
      csv: '325',
    },
    {
      brand: 'mastercard',
      nickname: 'Paypal Business',
      number: '5486-7521-8054-9586',
      expirationDate: '06/26',
      csv: '248',
    },
    {
      brand: 'discover',
      nickname: 'Discover Credit',
      number: '6578-4546-5465-2438',
      expirationDate: '05/24',
      csv: '895',
    },
    {
      brand: 'american-express',
      nickname: 'American Express Business',
      number: '3875-884536-94485',
      expirationDate: '12/26',
      csv: '985',
    },
  ];
};

// return the formatted card number, may differ between distinct card brands
// eg. Visa: 4242-4242-4242-4242 -> 4242 4242 4242 4242
// eg. American Express: 4242-424242-42424 -> 4242 424242 42424
export const getFormattedCardNumber = (cardBrand: string, cardNumber: string) => {
  let formattedCardNumber = '';
  let cardNumberStripped = cardNumber.replaceAll('-', '');
  if(cardBrand === 'american-express') {
    formattedCardNumber +=
      cardNumberStripped.slice(0, 4) + ' ' +
      cardNumberStripped.slice(4, 10) + ' ' +
      cardNumberStripped.slice(10, 15);
  } else {
    for(let i = 0; i < 16; i += 4) {
      formattedCardNumber += cardNumberStripped.slice(i, i + 4) + ' '
    }
  }
  return formattedCardNumber;
};

// copy the card number to the users' clipboard
export const copyCardNumberToClipboard = (cardNumber: string) => {
  navigator.clipboard.writeText(cardNumber);
};