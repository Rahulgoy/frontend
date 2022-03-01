import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// components
import Logo from '../components/Logo';
import { red } from '@mui/material/colors';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'space-between',
  [theme.breakpoints.up('xs')]: {
    justifyContent: 'center',
    padding: theme.spacing("5vh"),
  },
  [theme.breakpoints.up('sm')]: {
    alignItems: 'flex-start',
    justifyContent:'space-between',
    padding: theme.spacing("4vh","4vw")
  },
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    justifyContent:'space-between',
    padding: theme.spacing("5vh","5vw")
  },
  [theme.breakpoints.up('lg')]: {
    alignItems: 'flex-start',
    justifyContent:'space-between',
    padding: theme.spacing("4vh","4vw"),
  },
}));

// ----------------------------------------------------------------------

AuthLayout.propTypes = {
  children: PropTypes.node
};

export default function AuthLayout({ children }) {
  return (
    <HeaderStyle>
      <Logo />
      <Typography
        variant="body2"
        sx={{
          display: { xs: 'none', sm: 'block' },
          mt: { md: -2 }
        }}
      >
        {children}
      </Typography>
    </HeaderStyle>
  );
}
