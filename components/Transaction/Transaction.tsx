import React from 'react';
import Container from '../Container/Container';
import Image from '../Image/Image';
import ListItem from '../ListItem/ListItem';
import Text from "../Text/Text";
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
		<ListItem className={styles.item}>
			<Image className={styles.merchantLogo} src={'https://logo.clearbit.com/target.com'} alt={'Merchant logo'} width={40} height={40} />
			<Text className={styles.merchantName} type={'p'}>Target</Text>
			<Text className={styles.date} type={'p'}>Nov 1, 2022</Text>
			<Text className={styles.accountName} type={'p'}>QuickSilver 7116</Text>
			<Text className={styles.amount} type={'p'}>-$54.77</Text>
		</ListItem>
	);
}

export default Transaction;