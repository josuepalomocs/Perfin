import React, { useEffect, useState } from 'react';
import createLinkToken from '../../plaid/services/createLinkToken';
import Button from "../Button/Button";
import List from "../List/List";
import PlaidLink from '../PlaidLink/PlaidLink';
import Text from '../Text/Text'
import Transaction from "../Transaction/Transaction";
import styles from './transactionSection.module.css';

const TransactionSection = () => {
	const [renderPlaidLink, setRenderPlaidLink] = useState(false);
	const [linkToken, setLinkToken] = useState<string | null>(null);

	useEffect(() => {
		(async() => {
			if(renderPlaidLink && !linkToken) {
				setLinkToken(await createLinkToken());
			}
		})();
	}, [renderPlaidLink, linkToken]);

	return (
		<section className={styles.container}>
			<Text className={styles.title} as={'p'}>TRANSACTIONS</Text>
				<List className={styles.list} type={'ul'}>
					<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
					<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
				</List>
			<Button className={styles.linkAccount} text={'Link Bank Account'} onClick={() => { setRenderPlaidLink(true) }}/>
			{ linkToken ? <PlaidLink linkToken={ linkToken } /> : <></> }
		</section>
	);
}

export default TransactionSection;
