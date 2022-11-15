import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Register = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  // eslint-disable-next-line
  const { user, signUp } = UserAuth();
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
      <div className="w-full h-screen">
        
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Register</h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  className="p-3 my-2 bg-gray-700 rouded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  onChange={e => setEmail(e.target.value)}
                />
                
                <input
                  className="p-3 my-2 bg-gray-700 rouded"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  minLength="6"
                  onChange={e => setPassword(e.target.value)}
                />
                <input
                  className="p-3 my-2 bg-gray-700 rouded"
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="current-password"
                  required
                  minLength="6"
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <button type="submit" className="bg-red-600 py-3 my-6 rounded font-bold">
                  Register
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600">
                </div>
                <p className="py-8">
                  <span className="text-gray-600">
                    Already have an account?
                  </span>{" "}
                  <Link to="/logIn">Log In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
