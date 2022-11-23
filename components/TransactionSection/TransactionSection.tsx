import React, { useEffect, useState } from 'react';
import createLinkToken from '../../plaid/services/createLinkToken';
import { Container, Typography } from '@mui/material';
import PlaidLink from '../PlaidLink/PlaidLink';
import { DataGrid } from '@mui/x-data-grid';
import styles from './styles/transactionSection.module.css';
import { getDataGridColumns, getDataGridRows } from './utilities';

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
		<Container className={styles.container}>
			<Typography className={styles.title} variant='inherit'>Transactions</Typography>
			<DataGrid className={styles.dataGrid}
				rows={getDataGridRows()}
				columns={getDataGridColumns()}
				disableColumnSelector
				disableColumnFilter
			/>
			{ linkToken ? <PlaidLink linkToken={ linkToken } /> : <></> }
		</Container>
	);
}

export default TransactionSection;
