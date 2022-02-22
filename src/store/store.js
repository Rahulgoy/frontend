import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { getFirestore, reduxFirestore } from "redux-firestore";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import Firebase from "../config/Firebase";
const initialState = {};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(Firebase, {
      userProfile: "users",
      useFirestoreForProfile: true,
      attachAuthIsReady: true,
    }),
    reduxFirestore(Firebase) // redux bindings for firestore
  )
);
export default store;
