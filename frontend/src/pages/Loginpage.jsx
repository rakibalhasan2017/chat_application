import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import Spinner from "../components/Spinner.jsx";
import {useauthstore} from "../stores/useauthstore.jsx";

const Login = () => {
  const {loggedinuser, login, setloggedinuser} = useauthstore();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    setloading(true);
    try {
      const response = await login(data);
      // console.log("from the login page", response);
      setloading(false);
       setloggedinuser(response);
      //  console.log("from the login page", loggedinuser);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setloading(false);
      alert("Login error happened, check console");
    }
  };
  const handleLoginRedirect = () => {
    navigate("/signup"); // Navigate to login page on button click
  };
  
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h1>Log In</h1>
        <form onSubmit={handlesubmit}>
          <div className={styles.inputGroup}>
            <label>Email:</label>
            <input
              type="email"  
              value={email}
              onChange={(e) => setemail(e.target.value)}
              autoComplete="email"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        { <div className={styles.registerFooter}>
            <p>dont have an account?</p>
            <button onClick={handleLoginRedirect} className={styles.loginButton}>
              Sign Up
            </button>
          </div> }
      </div>

    </div>
  );
};

export default Login;