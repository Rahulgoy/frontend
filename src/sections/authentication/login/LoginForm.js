import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { connect } from "react-redux";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import { signIn } from '../../../store/actions/authActions';

// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

function LoginForm() {
  const auth=getAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      // const user = signIn(formik.values);

      signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Singed in user: ", user);
        navigate('/dashboard/app', { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error occured: ", errorCode, errorMessage);
        setSubmitting(false);
        navigate('/login', { replace: true });
      });

      // console.log(formik.values);
      
    }
  });

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="/reset" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     authError: state.auth.authError,
//     auth: state.firebase.auth,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     signIn: (creds) => dispatch(signIn(creds)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default LoginForm;