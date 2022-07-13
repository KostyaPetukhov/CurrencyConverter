import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	input: {
		margin: 10,
	},
	select: {
		marginLeft: '5px !important',
	},
	item: {
		maxWidth: '400px !important',
	},
});

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 300,
			width: 20,
		},
	},
};

const CurrencyInput = (props) => {
	const { currencies, amount, currency, onAmountChange, onCurrencyChange } =
		props;
	const classes = useStyles();

	return (
		<div className={classes.input}>
			<TextField
				type='text'
				value={amount}
				label='Amount'
				onChange={(e) => onAmountChange(e.target.value)}
				variant='outlined'
			/>
			<FormControl>
				<InputLabel>Currency</InputLabel>
				<Select
					value={currency}
					onChange={(e) => onCurrencyChange(e.target.value)}
					input={<OutlinedInput label='Currency' />}
					className={classes.select}
					MenuProps={MenuProps}
				>
					{currencies.map((currency, index) => (
						<MenuItem key={index} value={currency}>
							{currency}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};

CurrencyInput.propTypes = {
	currencies: PropTypes.array.isRequired,
	amount: PropTypes.number.isRequired,
	currency: PropTypes.string.isRequired,
	onAmountChange: PropTypes.func.isRequired,
	onCurrencyChange: PropTypes.func.isRequired,
};

export default CurrencyInput;
