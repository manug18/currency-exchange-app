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
import { useState } from 'react';
import { axiosInstance } from '../services/AxiosInstance';
import { Currency, GraphData } from '../models/Currency';
import { Line } from 'react-chartjs-2';
import LineChart from '../components/LineChart';
import CurrencyFlag from 'react-currency-flags';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [fromCurrencies, setFromCurrencies] = useState<string[]>([]);
  const [toCurrencies, setToCurrencies] = useState<string[]>([]);
  const [currency, setCurrency] = useState<Currency[]>([]);
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [amount, setAmount] = useState<string>('1');
  const [retrievedAmount, setRetrievedAmount] = useState<string>('');
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
  const handleClick = () => {
    axiosInstance
      .get('/')
      .then((response) => {
        setCurrency(response.data.currencies);

        const names = response.data.currencies.map(
          (currency: { currency_name: any }) => currency.currency_name
        );
        setFromCurrencies(names);
        setToCurrencies(names);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleConvert = () => {
    if (selectedCategory && toCurrency) {
      const apiEndpoint = `https://xecdapi.xe.com/v1/convert_from/?from=${selectedCategory}&to=${toCurrency}&amount=${amount}`;

      axiosInstance
        .get(apiEndpoint)
        .then((response) => {
          setRetrievedAmount(response.data.to[0].mid);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleConvertData = () => {
    if (selectedCategory && toCurrency) {
      const apiEndpoint = `https://xecdapi.xe.com/v1/historic_rate/period/?from=${selectedCategory}&to=${toCurrency}&start_timestamp=2023-09-01&end_timestamp=2023-09-13&per_page=500`;

      axiosInstance
        .get(apiEndpoint)
        .then((response) => {
          const toCurrencyData = response.data.to[toCurrency];
          setGraphData(toCurrencyData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Stack>
      <Typography color={colors.grey.grey_150} p={2} fontSize={25}>
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
        <FormControl sx={{ width: '17vw', marginLeft: '40px' }} size="small">
          <InputLabel>From</InputLabel>
          <Select label="From" onChange={handleChange} value={selectedCategory}>
            <MenuItem value="All Categories">All Categories</MenuItem>
            {currency.map((ca, index) => (
              <MenuItem key={index} value={ca.iso}>
                <ListItemIcon>
                  <CurrencyFlag currency={ca.iso} />
                </ListItemIcon>
                <Typography pr={1}> {ca.iso}</Typography>

                {ca.currency_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '17vw', marginLeft: '40px' }} size="small">
          <InputLabel>To</InputLabel>
          <Select label="From" onChange={handleSecondChange} value={toCurrency}>
            <MenuItem value="All Currencies">All Currencies</MenuItem>
            {currency.map((ca, index) => (
              <MenuItem key={index} value={ca.iso}>
                <ListItemIcon>
                  <CurrencyFlag currency={ca.iso} />
                </ListItemIcon>
                <Typography pr={1}> {ca.iso}</Typography>
                {ca.currency_name}
              </MenuItem>
            ))}{' '}
          </Select>
        </FormControl>
        <Button onClick={handleClick}>click me </Button>
        <Button onClick={handleConvert}>Convert </Button>
        <Button onClick={handleConvertData}>Convert </Button>

        <Typography color={colors.grey.grey_200}>
          {amount}
          {selectedCategory}={retrievedAmount}
          {toCurrency}
        </Typography>
      </Stack>
      <Stack sx={{ height: '50vh' }} p={2}>
        {' '}
        <LineChart data={graphData} />
      </Stack>
    </Stack>
  );
}
