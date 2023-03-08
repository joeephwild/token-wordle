import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [registeredUser, setRegisteredUser] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setRegisteredUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  const addData = async() => {
    try {
      const docRef = await addDoc(collection(db, "accounts"), {
        firstName: firstName,
        lastName: lastName
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleSignup = async () => {
    try {
      if (
        !email ||
        !password ||
        !confirmPassword ||
        confirmPassword !== password
      )
        return alert("please fill form properly");
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      setIsSuccess(true)
    } catch (error) {
      console.log(error.message);
      setIsSuccess(false)
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        handleSignup,
        email,
        password,
        setPassword,
        setConfirmPassword,
        confirmPassword,
        setEmail,
        registeredUser,
        isSuccess,
        setIsSuccess,
        firstName,
        lastName,
        addData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useStateContext = () => useContext(AuthContext);
