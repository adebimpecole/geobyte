import React, { lazy, Suspense, useState, useMemo, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { Context } from "./utilis/context";

import "./App.css";

const SignUp = lazy(() => import("./pages/authentication/SignUp"));
const LogIn = lazy(() => import("./pages/authentication/LogIn"));
const Screen = lazy(() => import("./components/Screen"));

function App() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("Home");
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [deletes, setDeletes] = useState(false);
  const [nav, setNav] = useState(false);

  let providerValue = useMemo(
    () => ({
      open,
      setOpen,
      page,
      setPage,
      id,
      setId,
      edit,
      setEdit,
      deletes,
      setDeletes,
      nav,
      setNav,
    }),
    [
      open,
      setOpen,
      page,
      setPage,
      id,
      setId,
      edit,
      setEdit,
      deletes,
      setDeletes,
      nav,
      setNav,
    ]
  );

  // Save user to localStorage as a JSON string
  useEffect(() => {
    if (id == null || id == 0 || id == undefined) {
    } else {
      localStorage.setItem("id", JSON.stringify(id));
      localStorage.setItem("page", JSON.stringify(page));
    }
  }, [id]);

  // Retrieve user from localStorage and parse it to an object
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const storedPage = localStorage.getItem("page");

    if (storedId) {
      setId(JSON.parse(storedId));
    }
    if (storedPage) {
      setPage(JSON.parse(storedPage));
    }
  }, []);

  return (
    <div className="w-full">
      <BrowserRouter>
        <Context.Provider value={providerValue}>
          <Routes>
            <Route exact path="/" element={<SignUp />} />
            <Route
              exact
              path="/signup"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SignUp />
                </Suspense>
              }
            />
            <Route
              exact
              path="/login"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LogIn />
                </Suspense>
              }
            />
            <Route
              exact
              path="/screen"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Screen />
                </Suspense>
              }
            />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
