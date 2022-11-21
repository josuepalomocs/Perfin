import { Card as CardType } from '../types';

export const getDefaultCardValues = (): CardType => {
  return {
    brand: '',
    nickname: '',
    number: '',
    expirationDate: '',
    csv: '',
  };
};

