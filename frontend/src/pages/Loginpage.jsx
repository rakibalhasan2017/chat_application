import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import Spinner from "../components/Spinner.jsx";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    setloading(true);
    try {
      console.log("kichu ki print hoi");
      const response = await axios.post(`http://localhost:5000/api/auth/login`, data,  { withCredentials: true });   
      setloading(false);
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
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
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