import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, customerArray, db, manufacturerArray } from "./Firebase";
import "./signup_signin.css";
import { doc, getDoc } from "firebase/firestore";

export default function Signin() {
  const [input, setInput] = useState({ userName: "", password: ""});
  const [userType,setUserType] = useState("customer");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(input.userName, input.password)
      .then(async(authUser) => {

        let userType;
        if(customerArray.includes(authUser.user.uid)){
          userType = "customer";
        }
        else if(manufacturerArray.includes(authUser.user.uid)){
          userType = "manufacturer";
        }
        else{
          userType = "delivery";
        }

        const docRef = doc(db, userType, authUser.user.uid);

        // Fetch the document
        const docSnap = await getDoc(docRef);

        const direction = docSnap.data().userType.toLowerCase();

        navigate(`/${direction}`);
      })
      .catch((error) => alert(error.message));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-header">Login</h2>
        <br />
        <div className="auth-form-login">
          <form onSubmit={handleSubmit} className="auth-form-login">
            <div className="input-container">
              <input
                type="email"
                placeholder="email"
                name="userName"
                onChange={handleChange}
                value={input.userName}
              />
              <label>User Email</label>
            </div>
            <br />
            <div className="input-container">
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                value={input.password}
              />
              <label>Password</label>
            </div>
            <button type="submit" className="btn btn-2">
              Login
            </button>
            <br />
            <div className="redirect">
              Don't have an account?{" "}
              <Link to="/signup" className="link-color">
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
