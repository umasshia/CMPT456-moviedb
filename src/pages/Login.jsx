import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  
  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h1 className="form-header">Log In</h1>
        {error ? <p className="error">{error}</p> : null}
        <form onSubmit={handleSubmit} 
        className="form"
        name="login-form"
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
          <button className="submit-btn">
            Log In
          </button>
            <span className="form-footer">Don't have an account?</span>{" "}
            <Link to="/register">Register</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
