import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { RegisterForm } from '../sections/authentication/register';
import AuthSocial from '../sections/authentication/AuthSocial';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '57%',
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

export default function Register() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.value);

  useEffect(() => {
    if (user) {
      // User is signed in.
      // console.log(user)
      navigate('/dashboard/app', { replace: true });
      
    } else {
      // console.log("User not logged in")
      // User is not signed in.
    }
  },[user])
  return (
    <RootStyle title="Register">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Login
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <img alt="RegistegerIcon" src="/static/illustrations/hostelN.jpg" />
      </SectionStyle>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              Facial Surveillance System
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Enter your details below to register.
            </Typography>
          </Box>

          {/* <AuthSocial /> */}

          <RegisterForm />

          {/* <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            By registering, I agree to Minimal&nbsp;
            <Link underline="always" color="textPrimary">
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" color="textPrimary">
              Privacy Policy
            </Link>
            .
          </Typography> */}

          <Typography
            variant="subtitle2"
            sx={{
              mt: 3,
              textAlign: 'center',
              display: { sm: 'none' }
            }}
          >
            Already have an account?&nbsp;
            <Link underline="hover" to="/login" component={RouterLink}>
              Login
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
