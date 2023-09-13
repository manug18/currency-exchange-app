import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { colors } from '../styles/color';
import { useState } from 'react';
import { axiosInstance } from '../services/AxiosInstance';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [fromCurrencies, setFromCurrencies] = useState<string[]>([]);
  const [toCurrencies, setToCurrencies] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedCategory>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategory(value);
    setFromCurrencies(value !== 'All Categories' ? [value] : []);
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
        // Handle the API response here
        console.log(response.data);

        const names = response.data.currencies.map(
          (currency: { currency_name: any }) => currency.currency_name
        );
        setFromCurrencies(names);
        setToCurrencies(names);
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  };
  return (
    <Stack>
      <Typography color={colors.grey.grey_150} p={2} fontSize={25}>
        Currency Exchange Rates
      </Typography>

      <Stack direction={'row'}>
        <FormControl sx={{ width: '17vw', marginLeft: '40px' }} size="small">
          <InputLabel>From</InputLabel>
          <Select label="From" onChange={handleChange} value={selectedCategory}>
            <MenuItem value="All Categories">All Categories</MenuItem>
            {fromCurrencies.map((ca, index) => (
              <MenuItem key={index} value={ca}>
                {ca}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '17vw', marginLeft: '40px' }} size="small">
          <InputLabel>To</InputLabel>
          <Select label="From" onChange={handleSecondChange} value={toCurrency}>
            <MenuItem value="All Categories">All Categories</MenuItem>
            {toCurrencies.map((ca, index) => (
              <MenuItem key={index} value={ca}>
                {ca}
              </MenuItem>
            ))}{' '}
          </Select>
        </FormControl>
        <Button onClick={handleClick}>click me </Button>
      </Stack>
    </Stack>
  );
}
