import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing("4vh"),
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
  }  ,
  [theme.breakpoints.up('lg')]: {
    alignItems: 'flex-start',
    justifyContent:'space-between',
    padding: theme.spacing("4vh","4vw"),
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  return (
    <>
      <HeaderStyle>
        <Logo />
      </HeaderStyle>
      <Outlet />
    </>
  );
}
