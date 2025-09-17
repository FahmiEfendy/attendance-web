import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PAGES } from "./constants/page";
import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import AuthorizationWrapper from "./components/auth/authorizationWrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGES.LOGIN} element={<LoginPage />} />
        <Route path={PAGES.REGISTER} element={<RegisterPage />} />
        <Route
          path={PAGES.HOME}
          element={
            <AuthorizationWrapper>
              <HomePage />
            </AuthorizationWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
