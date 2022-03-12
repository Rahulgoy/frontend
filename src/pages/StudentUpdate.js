import * as Yup from 'yup';
import { useState,useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// import {db} from '../config/Firebase.js';
// material
import { Stack, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import LinearProgress from '@mui/material/LinearProgress';
import { getDatabase, ref, set,onValue } from "firebase/database";
import { getDownloadURL, getStorage, ref as ref_storage, uploadBytes } from "firebase/storage";
import Avatar from "@mui/material/Avatar";


function writeUserData(values, imageUrl,videoUrl){
    const db = getDatabase();
    // console.log(db);
    set(ref(db,'students/'+values.rollNumber),{
        name : values.firstName+" "+values.lastName,
        email: values.email,
        rollNumber: values.rollNumber,
        hostel: values.hostel,
        imageUrl : imageUrl,
        videoUrl : videoUrl
      });
    }
    
    
    
    // ----------------------------------------------------------------------
function StudentUpdate({studentInfo}) {
    // useEffect(()=>{
    //     onValue(stuValue,(snapshot)=>{
    //             const data=snapshot.val();
    //             // console.log(data);
    //             setStuInfo(data);
    //     })
    //     },[]);
    // // console.log(rollNumber);
    // const db=getDatabase();
    // const stuValue=ref(db,'students/'+rollNumber);
    // const [stuInfo,setStuInfo]=useState({});
    
    const storage = getStorage();
    // console.log(studentInfo.imageUrl);
    const [image, setImage] = useState(null);
    const [imageName,setImageName]=useState("Change Profile Pic");
    const [video,setVideo ]=useState(null);
    const [videoName,setVideoName]=useState("Change Video");
    const [imgUrl, setImgUrl] = useState(null);
    const [vidUrl,setVidUrl]=useState(null);
    const [uploading,setUploading]=useState(false);
    // const [student,setStudent]=useState(null);
  const navigate = useNavigate();
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
  
  // console.log(studentInfo.email);
  const formik = useFormik({
      initialValues:{
        firstName:studentInfo.name,
        lastName:studentInfo.name,
        email:studentInfo.email,
        rollNumber:studentInfo.rollNumber,
        hostel:studentInfo.hostel
      },
      validationSchema: RegisterSchema,
      onSubmit: () => {
        writeUserData(formik.values, imgUrl,vidUrl);
        //   console.log(formik.values);
        navigate('/dashboard/user', { replace: true });
      }
  });
  //   console.log(fName);
  
    
  
  const handleImageChange = (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);  
            // window.alert("here");
            // window.alert(e.target.files);
            // console.log(e.target.files[0].name);
            // displayName=!displayName;
            setImageName("File : "+e.target.files[0].name);
            
        }
      };
    const handleVideoChange = (e) => {
      if(e.target.files[0]){
          setVideo(e.target.files[0]);  
          // window.alert("here");
          // window.alert(e.target.files);
          // console.log(e.target.files[0].name);
          // displayName=!displayName;
          setVideoName("File : "+e.target.files[0].name);
          console.log(video);
      }
  };
    // useEffect(()=>{
    //     setImgUrl(stuInfo.imageUrl);
    //     setStudent({
    //         firstName:stuInfo.name,
    //         lastName:stuInfo.name,
    //         email:stuInfo.email,
    //         rollNumber:stuInfo.rollNumber,
    //         hostel:stuInfo.hostel
    //     });
    // },[stuInfo]);
    // console.log(fName);
    
    // console.log(stuInfo);
    
    useEffect(()=>{
      setImgUrl(studentInfo.imageUrl);
      setVidUrl(studentInfo.videoUrl)
      // setStudent(studentInfo);
    },[]);
    
    
    useEffect(()=>{
      if(!image){
        return;
      }
      handleImageSubmit();
    },[image]);
    
    useEffect(()=>{
      if(!video){
        return;
      }
      handleVideoUpload();
    },[video]);
    
    const handleVideoUpload = () => {
        const videoRef = ref_storage(storage,`video/${video.name}`);
        setUploading(true);
        uploadBytes(videoRef, video)
        .then(()=>{
            getDownloadURL(videoRef).then((url)=>{
                setVidUrl(url);
                setUploading(false);
            })
            .catch((error)=>{
                console.log(error.message,"Error");
                setUploading(false);
            });
            // setImage(null);
        })
        .catch((error)=>{
            console.log(error.message);
            setUploading(false);
        });
    };

    
    const handleImageSubmit = () => {
      // console.log(image);
      const imageRef = ref_storage(storage, `image/${image.name}`);
      uploadBytes(imageRef, image)
      .then(()=>{
        getDownloadURL(imageRef).then((url)=>{
          setImgUrl(url);
        })
        .catch((error)=>{
          console.log(error.message,"Error");
        });
      })
      .catch((error)=>{
        console.log(error.message);
      });
    };



  const { errors, touched, handleSubmit, isSubmitting, getFieldProps} = formik;

    // console.log(student.firstName);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off"  noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
        <Avatar style={{alignSelf: 'center'}} src={imgUrl} sx={{ mx: "auto",width: 150, height: 150  }} />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent="center" alignItems="center" mt={4}>
            
        {/* <Box sx={{display:'flex',flexDirection: 'row', mt: 5, justifyContent:'center'}}> */}
          <LoadingButton variant="outlined" component="label">{imageName}
  
            <input hidden type="file" onChange={handleImageChange}/>

          </LoadingButton>
        
          {/* <LoadingButton variant="contained" component="label" onClick={}>Upload</LoadingButton> */}
        {/* </Box> */}
        </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First Name"
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
            <LoadingButton variant="outlined" component="label">{videoName}
              <input hidden type="file" onChange={handleVideoChange}/>  
            </LoadingButton>
            {/* <LoadingButton variant="contained" component="label" onClick={handleVideoUpload}>Upload</LoadingButton> */}
            </Stack>
            {uploading?(<LinearProgress/>
          ):(
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Update Profile
          </LoadingButton>)}
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export default StudentUpdate;
