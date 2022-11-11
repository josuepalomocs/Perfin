import React, { useEffect, useState } from 'react';
import createLinkToken from '../../plaid/services/createLinkToken';
import Button from "../Button/Button";
import Container from '../Container/Container';
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
			<Text className={styles.heading} type={'p'}>Transactions</Text>
			<List className={styles.list} type={'ul'}>
				<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
				<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
				<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
				<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
				<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
				<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
				<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
				<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
				<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
				<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
				<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
				<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
				<Transaction icon={'walmart'} name={'spotify'} date={'Oct 18'} account={'CHASE'} amount={20.22} />
			</List>
			<Container className={styles.actionsContainer}>
				<Button className={styles.linkAccount} onClick={() => { setRenderPlaidLink(true) }}>Link Account</Button>
			</Container>
			{ linkToken ? <PlaidLink linkToken={ linkToken } /> : <></> }
		</section>
	);
}

export default TransactionSection;
