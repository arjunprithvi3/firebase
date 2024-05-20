import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export default function AdminRegister() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmission = () => {
    if (values.name && values.email && values.password && values.confirmPassword) {
      setErrorMsg("");
      if (values.password === values.confirmPassword) {
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then(async (response) => {
            const user = response.user;
            await updateProfile(user, {
              displayName: values.name,
            });
            setSuccessMsg("Registration done successfully!");
            setTimeout(() => {
              setSuccessMsg("");
              navigate("/");
            }, 3000);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setErrorMsg("Passwords don't match!");
      }
    } else {
      setErrorMsg("Please fill out all required fields");
    }
  };

  return (
    <>
      <div>
        <div>
          <h3>MediCare</h3>
          <h4>Register</h4>
        </div>
      </div>
      <div>
        <div>
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="exampleInputEmail1">Email Address</label>
            <input
              type="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email Address"
              onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(event) => setValues((prev) => ({ ...prev, password: event.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="exampleInputPassword2">Confirm Password</label>
            <input
              type="password"
              id="exampleInputPassword2"
              placeholder="Confirm Password"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, confirmPassword: event.target.value }))
              }
            />
          </div>
          <div>{errorMsg && <div>{errorMsg}</div>}</div>
          <div>{successMsg && <div>{successMsg}</div>}</div>
          <div>
            <button type="submit" onClick={handleSubmission}>
              Register
            </button>
          </div>
          <div>
            Already have an account? <Link to="/">Login here!</Link>
          </div>
        </div>
      </div>
    </>
  );
}
