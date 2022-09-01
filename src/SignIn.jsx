import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../Context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";


import { FaFacebookF } from "react-icons/fa";
import { SiGmail, SiGithub } from "react-icons/si";

import "./SignIn.scss";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false)

  let navigate = useNavigate();

  const { dispatch } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
        toast.success("Login successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
        });
      })
      .catch(() => {
        toast.error("Failed to access account!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
        });
      });
  };

  return (
    <div className="container">
      <div className="form-action">
        <div className="form-left">
          <h1>Sign in</h1>
          <div className="action-with">
            <div className="action-icon">
              <FaFacebookF className="facebook" />
            </div>
            <div className="action-icon">
              <SiGmail className="gmail" />
            </div>
            <div className="action-icon">
              <SiGithub className="github" />
            </div>
          </div>
          <p>or use your account</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <p>Forgot your password?</p>
            <button className="submit" type="submit">
              Sign in
            </button>
          </form>
        </div>
        <div className="form-right">
          <div className="form-right-content">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <Link to="/signup">
              <button className="button-sign-up">Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
