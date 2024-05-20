import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function AdminLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmitButton = () => {
    if (values.email && values.password) {
      setErrorMsg("");
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((response) => {
          const user = response.user;
          if (user) {
            navigate("/inventory");
          }
        })
        .catch((err) => {
          setErrorMsg(err.message);
        });
    } else {
      setErrorMsg("Please fill all the required fields!");
    }
  };

  return (
    <>
      <div>
        <div>
          <h3>Medicare</h3>
          <h4>Welcome Back!</h4>
        </div>
      </div>
      <div>
        <div>
          <div>
            <label htmlFor="exampleInputEmail1">Email Address</label>
            <input
              type="email"
              onChange={(event) => {
                setValues((prev) => ({ ...prev, email: event.target.value }));
              }}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email Address"
            />
          </div>
          <div>
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              onChange={(event) => {
                setValues((prev) => ({ ...prev, password: event.target.value }));
              }}
              type="password"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div>{errorMsg && <div>{errorMsg}</div>}</div>
          <div>
            <button id="submit" type="submit" onClick={handleSubmitButton}>
              Login
            </button>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register here!</Link> <br />
          </div>
        </div>
      </div>
    </>
  );
}
