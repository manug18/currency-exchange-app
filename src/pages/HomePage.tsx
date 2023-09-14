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
} from '@mui/material';
import { colors } from '../styles/color';
import { useState } from 'react';
import { axiosInstance } from '../services/AxiosInstance';
import { Currency, GraphData } from '../models/Currency';
import { Line } from 'react-chartjs-2';
import LineChart from '../components/LineChart';

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
          console.log(response.data.to[0].mid);
          setRetrievedAmount(response.data.to[0].mid);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleConvertData = () => {
    if (selectedCategory && toCurrency) {
      const apiEndpoint = `https://xecdapi.xe.com/v1/historic_rate/period/?from=${selectedCategory}&to=${toCurrency}&start_timestamp=2023-09-12&end_timestamp=2023-09-13&per_page=500`;

      axiosInstance
        .get(apiEndpoint)
        .then((response) => {
          console.log(response.data.to.INR);
          setGraphData(response.data.to.INR);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  console.log(graphData);

  return (
    <Stack>
      <Typography color={colors.grey.grey_150} p={2} fontSize={25}>
        Currency Exchange Rates
      </Typography>
      <LineChart data={graphData} />
      {/* <Doughnut data={} /> */}
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
                {ca.iso} {ca.currency_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '17vw', marginLeft: '40px' }} size="small">
          <InputLabel>To</InputLabel>
          <Select label="From" onChange={handleSecondChange} value={toCurrency}>
            <MenuItem value="All Categories">All Categories</MenuItem>
            {currency.map((ca, index) => (
              <MenuItem key={index} value={ca.iso}>
                {ca.iso}
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
    </Stack>
  );
}
