import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { auth } from "../../config/firebase/firebase";

import { ToastContainer, toast } from "react-toastify";

import { Context } from "../../utilis/context";

const LogIn = () => {
  const { setId } = useContext(Context);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const db = getFirestore();

  const onLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Please fill in required fields");
    } else {
      console.log("check");
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;

          // Reference to the user's document in Firestore
          const userDocRef = collection(db, "geouser");

          const query1 = query(userDocRef, where("userId", "==", user.uid));

          getDocs(query1)
            .then((querySnapshot1) => {
              if (!querySnapshot1.empty) {
                // Retrieve the first document that matches the query from the 'users' collection
                const docSnapshot1 = querySnapshot1.docs[0];
                const userData = docSnapshot1.data();
                console.log(true);
                setId(userData.userId);
                navigate("/screen");
              } else {
                console.log("No user found");
              }
            })
            .catch((error) => {
              toast.error("Error getting user data");
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(error);
          if (errorCode === "auth/invalid-login-credentials") {
            toast.error("Invalid Email or Password");
          }
          if (errorCode === "auth/network-request-failed") {
            toast.error("Network error");
          }
        });
    }
  };

  return (
    <div className="isolate bg-white px-6 py-8 sm:py-10 lg:px-8 mt-16">
      <div className="mx-auto w-[30rem] text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Geobyte
        </h2>
        <p className="mt-2 text-xl leading-8 text-gray-600">Log In</p>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-14 max-w-xl sm:mt-16"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900 text-left"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900 text-left"
            >
              Password
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>

          <div className="flex gap-x-4 sm:col-span-2">
            <div className="text-sm leading-6 text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-indigo-600">
                Sign&nbsp;Up
              </Link>
              .
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="block w-full rounded-md bg-blue px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm mt-4"
            onClick={onLogin}
          >
            Log In
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LogIn;
