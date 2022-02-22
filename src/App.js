// // Store
import { Provider } from 'react-redux';
import store from './store/store';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { initializeApp } from "firebase/app";
// ----------------------------------------------------------------------


const firebaseConfig = {
  apiKey: "AIzaSyDlh8fdpOIas9sFLquKbIbGoRyN6fomzLU",
  authDomain: "face-recognition-51469.firebaseapp.com",
  databaseURL: "https://face-recognition-51469-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "face-recognition-51469",
  storageBucket: "face-recognition-51469.appspot.com",
  messagingSenderId: "1018849117258",
  appId: "1:1018849117258:web:16b8689ce10c064d0d52b3"
};
const app = initializeApp(firebaseConfig);

export default function App() {
  return (
    <Provider store={store}>
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
    </Provider>
  );
}
