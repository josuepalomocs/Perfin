import { faker } from "@faker-js/faker";
import { Transaction } from "../../../types/transaction";

import dayjs from "dayjs";
dayjs().format();

const NUM_ENTRIES = 75;

const getRandomDates = () => {
  let dates: Date[] = [];
  for (let i = 0; i < NUM_ENTRIES; i++) {
    const date = faker.date.between("2020-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z");
    dates[i] = date;
  }
  dates.sort((a, b) => {
    return a.valueOf() - b.valueOf();
  });
  return dates.reverse();
};

const getDummyTransactions = () => {
  let transactions: Transaction[] = [];
  const dateList = getRandomDates();
  for (let i = 0; i < NUM_ENTRIES; i++) {
    const id = i;
    const name = faker.company.name();
    const account = faker.finance.accountName();
    const date = dayjs(dateList[i]).format("MMM D, YYYY");
    const amount = `${faker.finance.amount(-1000, 1000, 2)}`;
    transactions[i] = { id, name, account, date, amount: amount.charAt(0) === "-" ? amount : `+${amount}` };
  }
  return transactions;
};

export default getDummyTransactions;
