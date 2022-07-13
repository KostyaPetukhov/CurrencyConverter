import { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

import formatNumber from '../../helpers/formatNumberHelper';

const useStyles = makeStyles(() => ({
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	currencies: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	text: {
		fontSize: 16,
		fontWeight: 700,
		paddingLeft: 8,
		paddingTop: 2,
	},
}));

const Header = () => {
	const [USD, setUSD] = useState(0);
	const [EUR, setEUR] = useState(0);

	useEffect(() => {
		axios
			.get(
				'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json'
			)
			.then((res) => {
				setUSD(formatNumber(res.data[0].rate));
			});
		axios
			.get(
				'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&json'
			)
			.then((res) => {
				setEUR(formatNumber(res.data[0].rate));
			});
	}, []);

	const classes = useStyles();
	return (
		<div>
			<AppBar position='static'>
				<Container fixed>
					<Toolbar className={classes.toolbar}>
						<Typography variant='h6'>CURRENCY CONVERTER</Typography>
						<Box marginRight={2} className={classes.currencies}>
							<Typography className={classes.text}>
								USD - {USD},
							</Typography>
							<Typography className={classes.text}>
								EUR - {EUR}
							</Typography>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
};

export default Header;
