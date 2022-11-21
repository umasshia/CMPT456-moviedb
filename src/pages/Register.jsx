import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserAuth } from "../context/AuthContext";

const Register = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const validatePassword = () => {
    if (password !== '' && confirmPassword !== '')
      return password === confirmPassword
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validatePassword()) {
      try {
        await signUp(email, password);
        navigate("/logIn");
      } 
      catch(error) {
        console.log(error);
      }  
    }else{
      alert('Passwords do not match')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h1 className="form-header">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="form"
        >
          <input
            className="input"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            onChange={e => setEmail(e.target.value)}
          />
          
          <input
            className="input"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            minLength="6"
            onChange={e => setPassword(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Confirm Password"
            autoComplete="current-password"
            required
            minLength="6"
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            Register
          </button>
          <div>
            <span className="form-footer">
              Already have an account?
            </span>{" "}
            <Link to="/logIn">Log In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
