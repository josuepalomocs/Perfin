import { Card as CardType } from '../types';

const currentYear = new Date().getFullYear();

export const getCardBrandOptions = () => {
  return [
    'Visa',
    'Mastercard',
    'American Express',
    'Discover',
  ];
};

export const getCardExpirationMonthOptions = () => {
  return ['01', '02', '03', '04', 
    '05', '06', '07', '08', 
    '09', '10', '11', '12'];
};

export const getCardExpirationYearOptions = () => {
  let options = [];
  for(let i = 0; i < 20; i++) {
    options[i] = (currentYear + i).toString();
  }
  return options;
};

export const getDefaultCardValues = (): CardType => {
  return {
    id: 0,
    brand: 'Visa',
    holder: '',
    number: '',
    expirationMonth: '01',
    expirationYear: currentYear.toString(),
    cvv: '',
  };
};

