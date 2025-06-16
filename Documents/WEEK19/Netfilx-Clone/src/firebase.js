import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAyglk9vCa2Mx9H_XHifQ6TcvXcd8CrSPg",
  authDomain: "netflix-clone-9b840.firebaseapp.com",
  projectId: "netflix-clone-9b840",
  storageBucket: "netflix-clone-9b840.firebasestorage.app",
  messagingSenderId: "990913924311",
  appId: "1:990913924311:web:7749c5bc8389d452bc7492",
  measurementId: "G-XH57M1EK1X"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    localStorage.setItem("email", "email");
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};
 


const login = async (email,password)=>{
            try{
                await signInWithEmailAndPassword(auth,email,password)
                localStorage.setItem("email", "email");
            }catch(error){
                console.log(error)
                toast.error(error.code.split('/')[1].split('-').join(" "));
            }
}

const logout=()=>{
  localStorage.removeItem("email");
signOut(auth)
}


export {auth,db,login,signUp,logout}