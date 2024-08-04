import React, { useContext, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Footer from "../Footer/Footer";
import "./SignIn.css";
import { auth, googleAuth } from "../../FireBaseConfig/firebase";
import { useNavigate } from "react-router-dom";
import google_icon from '../../images/google-icon.png'
import { AuthContext } from "../AuthContext/Auth";
function SignIn() {
  const {currentUser,setCurrentUser}=useContext(AuthContext)
  const navigate = useNavigate();
  const errorRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const succesRef = useRef();
  const [error, setError] = useState();
  const [sucess, setSucess] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // !input element refernce array
  const inputEl = [emailRef, passwordRef];
  // !create user(sign up)
  async function createUser() {
    try {
      console.log(email, password);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setTimeout(() => {
        succesRef?.current?.classList.add("success");
      }, 50);
      setSucess("account has been created successfully!");
      inputEl?.forEach((el) => {
        el.current.value = "";
      });
      console.log(userCredential);
    } catch (error) {
     if(error?.message?.split(":")[1].split("(")[1].split("/")[1].split(")")[0]=="email-already-in-use"){
      setError(error?.message?.split(":")[1].split("(")[1].split("/")[1].split(")")[0])
     }else(
      setError(error.message.split(":")[1].split("(")[0])
     )
      setTimeout(() => {
        errorRef?.current?.classList.add("failed");
      }, 50);
  
      inputEl?.forEach((el) => {
        el.current.value = "";
      });
      console.error(error);
    }
  }

  // !sign in functionality with email and password
  async function Login() {
    console.log(email, password);
    try {
      console.log(email, password);
      const loggedinUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setTimeout(() => {
        succesRef?.current?.classList.add("success");
        navigate("/cart");
      }, 50);
      setSucess("Logged in successfully!");
      setCurrentUser(loggedinUser.user.email)
      console.log(loggedinUser)
      console.log(currentUser)
      inputEl?.forEach((el) => {
        el.current.value = "";
      });
      inputEl.forEach((el) => {
        el.current.value = "";
      });
      console.log(loggedinUser);
    } catch (error) {
      setTimeout(() => {
        errorRef?.current?.classList.add("failed");
      }, 50);
      setError(
        error.message.split(":")[1].split(")")[0].split("(")[1].split("/")[1]
      );
      errorRef?.current?.classList.add("failed");
      inputEl?.forEach((el) => {
        el.current.value = "";
      });
      console.log(errorRef);
      console.error(error);
    }
  }
  // !sign in functionality with google

  const SignInWithGoogle = async () => {
    try {
    const loggedinUser=  await signInWithPopup(auth, googleAuth);
      setTimeout(() => {
        succesRef?.current?.classList.add("success");
      }, 50);
      setSucess("Logged in successfully!");
      setCurrentUser(loggedinUser.user.email)
      console.log(currentUser)
      navigate("/cart")
      inputEl?.forEach((el) => {
        el.current.value = "";
      });
    } catch (error) {
      setTimeout(() => {
        errorRef?.current?.classList.add("failed");
      }, 50);
      setError(
        error.message.split(":")[1].split(")")[0].split("(")[1].split("/")[1]
      );
      errorRef?.current?.classList.add("failed");
      inputEl?.forEach((el) => {
        el.current.value = "";
      });
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="sign-in">
        <div className="form">
          <div className="sign-in-header">
            <h3>Sign in or Create an account</h3>
            <p id="error">
              {error ? (
                <span ref={errorRef}>{error}</span>
              ) : (
                <span ref={succesRef}>{sucess}</span>
              )}
            </p>
          </div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            ref={emailRef}
          ></input>
          <label htmlFor="password">Pasword</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
          ></input>
          <button onClick={Login}>Sign in</button>
          <button onClick={createUser}>Sign up</button>
          <h3>OR</h3>
          <button onClick={SignInWithGoogle}>
            <i><img src={google_icon} alt="google-icon"></img></i>Sign in with google
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignIn;
