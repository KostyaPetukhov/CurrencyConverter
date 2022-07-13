import { useState, useEffect } from 'react';
import axios from 'axios';

import CurrencyInput from '../CurrencyInput';
import formatNumber from '../../helpers/formatNumberHelper';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	page: {
		margin: 50,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: 0,
	},
});

const MainPage = () => {
	const classes = useStyles();

	const [amount1, setAmount1] = useState(1);
	const [amount2, setAmount2] = useState(1);
	const [currency1, setCurrency1] = useState('UAH');
	const [currency2, setCurrency2] = useState('UAH');
	const [rates, setRates] = useState([]);

	useEffect(() => {
		axios.get('https://cdn.cur.su/api/nbu.json').then((res) => {
			setRates(res.data.rates);
		});
	}, []);

	const handleAmount1Change = (amount1) => {
		setAmount1(amount1);
		setAmount2(
			formatNumber((amount1 * rates[currency2]) / rates[currency1])
		);
	};

	const handleCurrency1Change = (currency1) => {
		setCurrency1(currency1);
		setAmount2(
			formatNumber((amount1 * rates[currency2]) / rates[currency1])
		);
	};

	const handleAmount2Change = (amount2) => {
		setAmount2(amount2);
		setAmount1(
			formatNumber((amount2 * rates[currency1]) / rates[currency2])
		);
	};

	const handleCurrency2Change = (currency2) => {
		setCurrency2(currency2);
		setAmount1(formatNumber(amount2 * rates[currency1]) / rates[currency2]);
	};

	return (
		<div className={classes.page}>
			<CurrencyInput
				currencies={Object.keys(rates)}
				amount={amount1}
				currency={currency1}
				onAmountChange={handleAmount1Change}
				onCurrencyChange={handleCurrency1Change}
			/>
			<CurrencyInput
				currencies={Object.keys(rates)}
				amount={amount2}
				currency={currency2}
				onAmountChange={handleAmount2Change}
				onCurrencyChange={handleCurrency2Change}
			/>
		</div>
	);
};

export default MainPage;
