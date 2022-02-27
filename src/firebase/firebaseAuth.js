import { getAuth, signInWithPopup, GoogleAuthProvider,signOut,createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
export const googleSignIn = () => {
    return new Promise((resolve,reject) => {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth,provider)
      .then(result=> {
        console.log('successfully logged in, ' ,result.user.displayName);
        const user = result.user;
        resolve(user);
      })
      .catch(err => {

        console.error('there was an error, ', err);
        resolve(null);
      })
    })
    
}

export const emailRegister = (email,password) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        resolve(user);
        // ...
      })
      .catch((error) => {
        console.error('there was an error, ', error);
        const errorCode = error.code;
        const errorMessage = error.message;
        resolve(null);
        // ..
      });
  })
  
}

export const emailSignIn = (email,password) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        resolve(user);
        // ...
      })
      .catch((error) => {
        console.error('there was an error, ', error);
        const errorCode = error.code;
        const errorMessage = error.message;
        resolve(null);
        // ..
      });
  })
  
}

export const signOutAuth = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    signOut(auth).then(()=>{
      console.log('Signed Out')
      resolve(null);
    }).catch((err)=>{
      console.error('Signed Out Error',err)
      resolve(null);
    })
  })
    

}