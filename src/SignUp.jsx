import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaFacebookF } from "react-icons/fa";
import { SiGmail, SiGithub } from "react-icons/si";
import "./SignIn.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // const [loading, setLoading] = useState(false)
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return toast.error("Password do not match!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "foo-bar",
      });
    }
    createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigate("/signin");
        toast.success("Success", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
        });
      })
      .catch(() => {
        toast.error("Failed to create an account!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
        });
      });
  };

  return (
    <div className="container">
      <div className="form-action">
        <div className="form-left">
          <h1>Create Account</h1>
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
          <p>or create your new account</p>
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
              <input
                type="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="Confirm password"
                required
              />
            </div>
            <button className="submit" type="submit">
              Sign up
            </button>
          </form>
        </div>
        <div className="form-right">
          <div className="form-right-content">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <Link to="/signin">
              <button className="button-sign-up">Sign in</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
