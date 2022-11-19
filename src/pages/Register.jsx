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
      <div className="w-full h-screen">
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto text-[#FFFDE3]">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl text-[#FFFDE3]">Register</h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  className="p-3 my-2 bg-inherit border border-[#FFFDE3] placeholder:text-[#FFFDE3] placeholder:opacity-50"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  onChange={e => setEmail(e.target.value)}
                />
                
                <input
                  className="p-3 my-2 bg-inherit border border-[#FFFDE3] placeholder:text-[#FFFDE3] placeholder:opacity-50"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  minLength="6"
                  onChange={e => setPassword(e.target.value)}
                />
                <input
                  className="p-3 my-2 bg-inherit border border-[#FFFDE3] placeholder:text-[#FFFDE3] placeholder:opacity-50"
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="current-password"
                  required
                  minLength="6"
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <button type="submit" className="border border-[#FFFDE3] hover:bg-[#FFFDE3] hover:text-[#141515] py-3 my-6 font-bold">
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
