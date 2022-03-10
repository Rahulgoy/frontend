import { useEffect } from 'react';

// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "./redux/slices/authSlice";
import { saveStudents } from './redux/slices/studentsSlice';
import { getDatabase, ref, onValue} from "firebase/database";
// ----------------------------------------------------------------------

export default function App() {
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const user = useSelector((state) => state.auth.value);
  // console.log("user from state", user);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user));
      } else {
        dispatch(saveUser(null));
      }
    });


    const db=getDatabase();
    const stuValue=ref(db,'students/');
    onValue(stuValue,(snapshot)=>{
      const data=snapshot.val();
      // console.log(data);
      const arr = [];
      Object.keys(data).forEach(key => { 
        arr.push(data[key]);
      })
      if (data) {
        dispatch(saveStudents(arr));
      } else {
        dispatch(saveStudents("null"));
      }
    })
  }, [auth, dispatch]);
  return (
    
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
    
  );
}
