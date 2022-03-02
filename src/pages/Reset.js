import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
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
  width: '165%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2,1)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: "85%",
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing("24vh", 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.value);

  return (
    <RootStyle title="Reset Password">

      <AuthLayout>
      </AuthLayout>      

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <img src="/static/illustrations/hostelO_1.png" alt="ResetPageIcon" />
      </SectionStyle>

      <Container maxWidth="xs"  sx={{mx:"auto"}}>
        <ContentStyle>
          <Stack >
            <Typography variant="h4" gutterBottom>
              Reset Password
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your e-mail id to generate new password.</Typography>
          </Stack>
          <ResetForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
