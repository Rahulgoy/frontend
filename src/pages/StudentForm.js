import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import {db} from '../config/Firebase.js';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// component
import Iconify from '../components/Iconify';
import { getDatabase, ref, set } from "firebase/database";
import { getDownloadURL, getStorage, ref as ref_storage, uploadBytes } from "firebase/storage";
import Avatar from "@mui/material/Avatar";





// ----------------------------------------------------------------------
function StudentForm() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    rollNumber: Yup.number().positive().integer().required('Roll Number is required').moreThan(99999999,'Must be 9 digit').lessThan(1000000000,'Must be 9 digit'),                 
    // hostel: Yup.string().uppercase().required('Hostel is Required').max(1,'TOO Long!')
    hostel: Yup.string().required('Hostel is Required').matches(/^[A-Z]+$/,'Must be Hostel name')
  });

  const writeUserData = (values, imageUrl, videoUrl) => {

    console.log(imageUrl);
    console.log(videoUrl);
    const db = getDatabase();
    // console.log(db);
    set(ref(db,'students/'+values.rollNumber),{
        name : values.firstName+" "+values.lastName,
        email: values.email,
        rollNumber: values.rollNumber,
        hostel: values.hostel,
        imageUrl : imageUrl,
        videoUrl : videoUrl,
    });
}










  // Image Upload
    const [image, setImage] = useState(null);
    const [chooseImg, setChooseImg] = useState("Choose Profile Pic");
    const handleImageChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);  
            setChooseImg("File : "+e.target.files[0].name);
        }
    };
    const handleChooseImg = () =>{
      setChooseImg("File :");
    }
    const handleImageUpload = (image) => {
      console.log("Image Upload")
        if(image){
          console.log("Image detected: ", image);
          const imageRef = ref_storage(storage, `images/${image.name}`);
        uploadBytes(imageRef, image)
        .then(()=>{
            getDownloadURL(imageRef).then((url)=>{
              console.log(url);
              setImageUrl(url);
            })
            .catch((error)=>{
                console.log(error.message,"Error");
            });
            setImage(null);
        })
        .catch((error)=>{
            console.log(error.message);
        });
        }
        
    };



  // Video Upload
  const storage = getStorage();
    const [video, setVideo] = useState(null);
    const [chooseVid, setChooseVid] = useState("Choose Video");
    const handlevideoChange = (e) => {
        if(e.target.files[0]){
            setVideo(e.target.files[0]);  
            setChooseVid("File : "+e.target.files[0].name);
        }
    };
    const handleChooseVid = () =>{
      setChooseVid("File :");
    }
    const handleVideoUpload = (video) => {
        if(video){
          const videoRef = ref_storage(storage, `videos/${video.name}`);
        uploadBytes(videoRef, video)
        .then(()=>{
            getDownloadURL(videoRef).then((url)=>{
                setVideoUrl(url);
            })
            .catch((error)=>{
                console.log(error.message,"Error");
            });
            setVideo(null);
        })
        .catch((error)=>{
            console.log(error.message);
        });
        }
    };

    // console.log(video);

    const formik = useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        rollNumber: '',
        hostel: '',
      },
      validationSchema: RegisterSchema,
      onSubmit: () => {

        if(image){
          handleImageUpload(image)
          .then(()=>{
            if(video){
              handleVideoUpload(video)
              .then(()=>{
                writeUserData(formik.values, imageUrl, videoUrl);
              }).catch((error)=>{
                console.log(error.message,"Error");
            });
            }
          }).catch((error)=>{
            console.log(error.message,"Error");
        });
        }else if(video){
          handleVideoUpload(video)
              .then(()=>{
                writeUserData(formik.values, imageUrl, videoUrl);
              }).catch((error)=>{
                console.log(error.message,"Error");
            });
        }else{
          writeUserData(formik.values, imageUrl, videoUrl);
        }
        
        
        
      //   console.log(formik.values);
        navigate('/dashboard/user', { replace: true });
      }
    });

    console.log(videoUrl)
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Avatar style={{alignSelf: 'center'}} src={imageUrl} sx={{ mx: "auto",width: 150, height: 150  }} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent="center" alignItems="center" mt={4}>
            <LoadingButton variant="outlined" component="label" onClick={handleChooseImg}>{chooseImg}
              <input hidden type="file" onChange={handleImageChange}/>
            </LoadingButton>
            <LoadingButton variant="contained" component="label" onClick={handleImageUpload}>Upload</LoadingButton>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <TextField
                fullWidth
                autoComplete="rollNumber"
                label="Roll Number"
                {...getFieldProps('rollNumber')}
                
                error={Boolean(touched.rollNumber && errors.rollNumber)}
                helperText={touched.rollNumber && errors.rollNumber}
            />
            <TextField
                fullWidth
                autoComplete="hostel"
                label="Hostel"
                {...getFieldProps('hostel')}
                
                error={Boolean(touched.hostel && errors.hostel)}
                helperText={touched.hostel && errors.hostel}
            />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent="center" alignItems="center">
            <LoadingButton variant="outlined" component="label" onClick={handleChooseVid}>{chooseVid}
              <input hidden type="file" onChange={handlevideoChange}/>  
            </LoadingButton>
            <LoadingButton variant="contained" component="label" onClick={handleVideoUpload}>Upload</LoadingButton>
            </Stack>
            
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Add Student
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export default StudentForm;
