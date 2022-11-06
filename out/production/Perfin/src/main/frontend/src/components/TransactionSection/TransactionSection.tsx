import React from 'react';
import Button from "../Button/Button";
import List from "../List/List";
import Text from '../Text/Text'
import Transaction from "../Transaction/Transaction";
import {usePlaidLink} from 'react-plaid-link';
import {CountryCode, DepositoryAccountSubtype, LinkTokenCreateRequest} from "plaid";
import styles from './transactionSection.module.css';

const TransactionSection = () => {
    return (
        <section className={styles.container}>
            <Text className={styles.title} as={'p'}>TRANSACTIONS</Text>
            <List className={styles.list} type={'ul'}>
                <Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
                <Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
            </List>
            <Button className={styles.linkAccount} text={'Link Bank Account'} onClick={() => {}}/>
        </section>
    );
}

export default TransactionSection;
