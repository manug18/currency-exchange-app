import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material';

export const CustomButton = styled(LoadingButton)(({ theme }) => ({
  // height: '3rem',
  [theme.breakpoints.down('md')]: {
    width: '75%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
