import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase/firebase";
import { addToFirestore } from "../../utilis/firebaseFunctions";

import { ToastContainer, toast } from "react-toastify";

import { Context } from "../../utilis/context";

const SignUp = () => {
  const { setId } = useContext(Context);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      email === "" ||
      password === "" ||
      lastName === "" ||
      firstName === ""
    ) {
      console.log("Please fill in required fields");
    } else {
      if (password == confirmpassword) {
        try {
          // Create a new user with email and password
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          const the_user = userCredential.user;
          const userId = the_user.uid;

          const userData = {
            last_name: lastName.toLowerCase(),
            first_name: firstName.toLowerCase(),
            userId: userId,
            email: email,
            password: password,
          };

          // Add the users name to Firestore
          await addToFirestore("geouser", userData);

          setId(userId);
          navigate("/screen");
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          // Handle registration errors
        }
      } else {
        toast.error("Your passwords are not the same");
      }
    }
  };

  return (
    <div className="isolate bg-white px-6 py-8 sm:py-10 lg:px-8">
      <div className="mx-auto w-[30rem] text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Geobyte
        </h2>
        <p className="mt-2 text-xl leading-8 text-gray-600">Register</p>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-14 max-w-xl sm:mt-16"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900 text-left"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900 text-left"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
          </div>
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
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900 text-left"
            >
              Confirm Password
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="confirm"
                id="confirm"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmpassword}
              />
            </div>
          </div>
          <div className="flex gap-x-4 sm:col-span-2">
            <div className="text-sm leading-6 text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-indigo-600">
                Log&nbsp;In
              </Link>
              .
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="block w-full rounded-md bg-blue px-3.5 py-2.5 text-center text-sm font-semibold mt-4 text-white shadow-sm"
            onClick={onSubmit}
          >
            Register
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
