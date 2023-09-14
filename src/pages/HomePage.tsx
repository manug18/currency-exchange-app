import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
  Stack,
  Typography,
  TextField,
  SvgIcon,
  ListItemIcon,
} from '@mui/material';
import { colors } from '../styles/color';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../services/AxiosInstance';
import { Currency, GraphData } from '../models/Currency';
import { Line } from 'react-chartjs-2';
import LineChart from '../components/LineChart';
import CurrencyFlag from 'react-currency-flags';
import { convertCurrency, fetchCurrencies, fetchHistoricRates } from '../services/BaseFile';
import { CustomButton } from '../components/CustomButton';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [fromCurrencies, setFromCurrencies] = useState<string[]>([]);
  const [toCurrencies, setToCurrencies] = useState<string[]>([]);
  const [currency, setCurrency] = useState<Currency[]>([]);
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [amount, setAmount] = useState<string>('1');
  const [retrievedAmount, setRetrievedAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [graphLoading, setGraphLoading] = useState<boolean>(false);
  const handleChange = (event: SelectChangeEvent<typeof selectedCategory>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategory(value);
    setFromCurrencies(value !== 'All Categories' ? [value] : []);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
  const handleSecondChange = (event: SelectChangeEvent<typeof selectedCategory>) => {
    const {
      target: { value },
    } = event;
    setToCurrency(value);
    setToCurrencies(value !== 'All Categories' ? [value] : []);
  };
  useEffect(() => {
    // Fetch currencies automatically when the page loads
    fetchCurrencies()
      .then((currencies) => {
        setCurrency(currencies);
        const names = currencies.map((currency: { currency_name: any }) => currency.currency_name);
        setFromCurrencies(names);
        setToCurrencies(names);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleConvert = () => {
    setLoading(true);
    if (selectedCategory && toCurrency) {
      convertCurrency(selectedCategory, toCurrency, amount)
        .then((retrievedAmount) => {
          setRetrievedAmount(retrievedAmount);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleConvertData = () => {
    setGraphLoading(true);
    if (selectedCategory && toCurrency) {
      fetchHistoricRates(selectedCategory, toCurrency)
        .then((toCurrencyData) => {
          setGraphData(toCurrencyData);
          setGraphLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Stack>
      <Typography color={colors.grey.grey_1000} p={2} fontSize={40}>
        Currency Exchange Rates
      </Typography>

      <Stack direction={'row'}>
        <TextField
          sx={{ width: '17vw', marginLeft: '40px' }}
          id="outlined-basic"
          label="Amount"
          value={amount}
          onChange={handleValueChange}
          variant="outlined"
          size="small"
        />
        <FormControl sx={{ width: '20vw', px: 2 }} size="small">
          <InputLabel>From</InputLabel>
          <Select label="From" onChange={handleChange} value={selectedCategory}>
            <MenuItem value="All Categories" sx={{ bgcolor: colors.grey.grey_150 }}>
              All Categories
            </MenuItem>
            {currency.map((ca, index) => (
              <MenuItem key={index} value={ca.iso} sx={{ bgcolor: colors.grey.grey_150 }}>
                <ListItemIcon>
                  <CurrencyFlag currency={ca.iso} />
                  <Typography px={1}>
                    {ca.iso} {ca.currency_name}
                  </Typography>
                </ListItemIcon>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '20vw', px: 1 }} size="small">
          <InputLabel>To</InputLabel>
          <Select
            label="From"
            onChange={handleSecondChange}
            value={toCurrency}
            sx={{ color: colors.grey.grey_100 }}
          >
            <MenuItem value="All Currencies" sx={{ bgcolor: colors.grey.grey_150 }}>
              All Currencies
            </MenuItem>
            {currency.map((ca, index) => (
              <MenuItem
                key={index}
                value={ca.iso}
                sx={{ bgcolor: colors.grey.grey_900, color: colors.grey.grey_100 }}
              >
                <ListItemIcon>
                  <CurrencyFlag currency={ca.iso} />
                  <Typography px={1}>
                    {ca.iso} {ca.currency_name}
                  </Typography>
                </ListItemIcon>
              </MenuItem>
            ))}{' '}
          </Select>
        </FormControl>
        <CustomButton
          variant="contained"
          onClick={handleConvert}
          loading={loading}
          disabled={!toCurrency}
          sx={{ mx: 1, backgroundColor: colors.grey.grey_1000 }}
        >
          Publish
        </CustomButton>
        <CustomButton
          variant="contained"
          onClick={handleConvertData}
          loading={graphLoading}
          sx={{ mx: 1, bgcolor: colors.grey.grey_1000 }}
        >
          Get Historic Data
        </CustomButton>

        <Typography color={colors.grey.grey_200}>
          {amount}
          {selectedCategory}={retrievedAmount}
          {toCurrency}
        </Typography>
      </Stack>
      <Stack sx={{ height: '50vh' }} px={30} py={5}>
        {graphData.length > 0 && <LineChart data={graphData} />}
      </Stack>
    </Stack>
  );
}
