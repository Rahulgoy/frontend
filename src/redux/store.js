import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import logger from 'redux-logger'
import studentsSlice from "./slices/studentsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),

});