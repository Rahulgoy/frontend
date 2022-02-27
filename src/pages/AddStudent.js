import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Grid,Typography,Stack } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import  StudentForm  from './StudentForm';
import AuthSocial from '../sections/authentication/AuthSocial';

import React, {useState} from 'react'
import { render } from 'react-dom'
// import VideoRecorder from 'react-video-recorder'
import { LoadingButton } from '@mui/lab';
// 
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";



// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  maxHeight: '70',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '45vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(0, 0)
}));

// const App = () => (
//   <VideoRecorder />
// )



// ----------------------------------------------------------------------
// var displayName=false;
var Choose="Choose Profile Pic";
// var Choose="Choose"
export default function Register() {
    const storage = getStorage();
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const handleImageChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);  
            // window.alert("here");
            // window.alert(e.target.files);
            // console.log(e.target.files[0].name);
            // displayName=!displayName;
            Choose="File : "+e.target.files[0].name;
        }
    };
    const handleChoose = () =>{
      Choose="File :";
      // window.alert(e.target.files[0]);
    }
    

    console.log(url);

  return (
    <RootStyle title="Register">
      {/* <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        
      {/* // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        }); */}
        {/* <input
          accept="image/*"
          className={classes.input}
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
        />
        <label htmlFor="raised-button-file">
          <Button variant="raised" component="span" className={classes.button}>
            Upload
          </Button>
        </label> */}
        {/* <img alt="register" src="/static/illustrations/illustration_register.png" /> */}
        {/* render(<App />, document.getElementById('root')) */}

      {/* </SectionStyle> */}

      <Container sx = {{ mx: "auto" }} maxWidth="sm">
        
      <Typography align = "center" variant="h4" sx={{ mx: "auto", mb: 4 }}>
          Register New Student
        </Typography>
        <ContentStyle>
          {/* <Box sx={{ mb: 5 }}>
            <Typography variant="h4" sx={{ mx: "auto"}} gutterBottom>
              Register a New Student
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Free forever. No credit card needed.
            </Typography>
          </Box> */}

          {/* <AuthSocial /> */}

          <StudentForm/>
          
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

          {/* <Typography 
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
          </Typography> */}
        </ContentStyle>
        
      </Container>
    </RootStyle>
  );
}