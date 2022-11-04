import React from 'react';
import styles from './transaction.module.css';

interface TransactionProps {
    icon: string,
    name: string,
    date: string,
    account: string,
    amount: number,
}

const Transaction = ({  } : TransactionProps) => {
    return (
        <div className={styles.container}>

        </div>
    );
}

export default Transaction;