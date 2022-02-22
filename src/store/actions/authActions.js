import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut as lOut } from "firebase/auth";

export const signIn = (credentials) => {
  const auth=getAuth();
  signInWithEmailAndPassword(auth,credentials.email, credentials.password)
    .then((userCredential) => {
      const user=userCredential.user;
      console.log("Donne");
      return user;
    })
    .catch((err) => {
      console.log(err);
    });
  };

export const signOut = () => {
  const auth=getAuth();
  lOut(auth).then(()=>{
    console.log("Logged Out");
  }).catch((error)=>{
    console.log(error);
  });
};

export const signUp = (newUser) => {
    const auth=getAuth();
      createUserWithEmailAndPassword(auth,newUser.email, newUser.password)
      .then((userCredential) => {
        // console.log(resp);
        const user=userCredential.user;
        return user;
      })
      .catch((err)=>{
        console.log(err);
      })
};

