import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { LoginForm } from '../sections/authentication/login';
import AuthSocial from '../sections/authentication/AuthSocial';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { ResetForm } from '../sections/authentication/reset';

// ----------------------------------------------------------------------


const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.value);

  return (
    <RootStyle title="Login">
      

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          
        </Typography>
        <img src="/static/illustrations/illustration_login.png" alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Reset Password
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>
          

          <ResetForm />

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              display: { sm: 'none' }
            }}
          >
            Don’t have an account?&nbsp;
            <Link variant="subtitle2" component={RouterLink} to="register" underline="hover">
              Get started
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
