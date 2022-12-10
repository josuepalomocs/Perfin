import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { Transaction } from "../../../types/transaction";

const getDummyCompanyName = () => {
  return faker.company.name();
};

const getDummyType = () => {
  return faker.commerce.department();
};

const getDummyDate = (from: string, to: string) => {
  const dummyDate = faker.date.between(from, to);
  return dummyDate;
};

const getDummyAmount = (min: number, max: number) => {
  return faker.finance.amount(min, max);
};

const getDummyTransaction = (id: number) => {
  const dateFrom = "2018-01-01T00:00:00.000Z";
  const dateTo = "2022-01-01T00:00:00.000Z";
  const amountMin = -1000;
  const amountMax = 1000;

  const dummyTransaction = {
    id,
    name: getDummyCompanyName(),
    type: getDummyType(),
    date: getDummyDate(dateFrom, dateTo),
    amount: getDummyAmount(amountMin, amountMax),
  };

  return dummyTransaction;
};

const sortDummyTransactionListByMostRecent = (dummyTransactionList: Transaction[]) => {
  dummyTransactionList.sort((a, b) => {
    return (b.date.valueOf() as number) - (a.date.valueOf() as number);
  });
};

const formatDummyTransactionListDate = (dummyTransactionList: Transaction[]) => {
  for (const dummyTransaction of dummyTransactionList) {
    dummyTransaction.date = dayjs(dummyTransaction.date).format("MMM DD, YYYY");
  }
};

const getDummyTransactionList = (length: number) => {
  let dummyTransactionList: Transaction[] | [] = [];

  for (let i = 0; i < length; i++) {
    dummyTransactionList[i] = getDummyTransaction(i);
  }

  sortDummyTransactionListByMostRecent(dummyTransactionList);

  formatDummyTransactionListDate(dummyTransactionList);

  return dummyTransactionList;
};

export default getDummyTransactionList;
