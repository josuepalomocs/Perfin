import React from 'react';
import Image from '../Image/Image';
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
		<li className={styles.container}>
			<Image className={styles.logo} src={'https://logo.clearbit.com/apple.com?size=200'} alt={'Merchant Image'} width={50} height={50} />
				<div className={styles.middleContent}>
					<Text className={styles.name} type={'p'}>APPLE</Text>
					<Text className={styles.date} type={'p'}>Nov 1, 2022</Text>
				</div>
				<div className={styles.rightContent}>
					<Text className={styles.name} type={'p'}>QUICKSILVER 7116</Text>
					<Text className={styles.date} type={'p'}>-$54.77</Text>
				</div>
		</li>
	);
}

export default Transaction;