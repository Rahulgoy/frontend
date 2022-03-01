import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue} from "firebase/database";
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, TextField} from '@mui/material';
import Avatar from "@mui/material/Avatar";
import { LoadingButton } from '@mui/lab';


const Profile = () => {
    const {roll} = useParams();
    const [user, setUser] = useState([]);
    const [imgUrl, setImageUrl] = useState(user.imageUrl);
    const [vidUrl,setVideoUrl]=useState(user.videoUrl);
    

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
    
      const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ')[1],
          email: user.email,
          rollNumber: user.rollNumber,
          hostel: user.hostel,
          imageUrl: user.imageUrl,
          videoUrl: user.videoUrl
        },
        validationSchema: RegisterSchema,
        onSubmit: () => {
          
        }
      });

  useEffect(()=>{
    const db=getDatabase();
    const stuValue=ref(db,'students/'+roll);
    onValue(stuValue,(snapshot)=>{
      const data=snapshot.val();
      console.log(data);
      setUser(data);
    })
  },[])
  console.log(imgUrl);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Avatar style={{alignSelf: 'center'}} src={imgUrl} sx={{ mx: "auto",width: 150, height: 150  }} />
        
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              InputLabelProps={{ shrink: true }}
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              InputLabelProps={{ shrink: true }}
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            InputLabelProps={{ shrink: true }}
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
                InputLabelProps={{ shrink: true }}
                label="Roll Number"
                {...getFieldProps('rollNumber')}
                
                error={Boolean(touched.rollNumber && errors.rollNumber)}
                helperText={touched.rollNumber && errors.rollNumber}
            />
            <TextField
                fullWidth
                autoComplete="hostel"
                InputLabelProps={{ shrink: true }}
                label="Hostel"
                {...getFieldProps('hostel')}
                
                error={Boolean(touched.hostel && errors.hostel)}
                helperText={touched.hostel && errors.hostel}
            />
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
  )
}

export default Profile