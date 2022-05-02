import React from "react";
import "./App.css";
import ContactDetail from "../contact/ContactDetail";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import Layout from "./Layout";
import AddContact from "../contact/AddContact";
import EditContact from "../contact/EditContact";
import AppContexProvider from "../provider/AppContextProvider";
import AuthProvider from "../provider/AuthUserContextProvider";
import { SignIn, SignUp } from "./Loggin";
import Home from "./Home";

function App() {
  return (
    <AuthProvider>
      <AppContexProvider>
        <Routes>
          <Route exact path="signin" element={<SignIn />} />
          <Route exact path="signup" element={<SignUp />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route exact path="view/:id" element={<ContactDetail />} />
            <Route exact path="add" element={<AddContact />} />
            <Route exact path="edit/:id" element={<EditContact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContexProvider>
    </AuthProvider>
  );
}

export default App;
