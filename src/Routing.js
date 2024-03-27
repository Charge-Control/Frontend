import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import MainPage from "./components/Main";
import IntroPage from "./components/Intro";
import InquirePage from "./components/Inquire";
import ViolationPage from "./components/Violation";
import LoginPage from "./components/Login";
import JoinPage from "./components/Join";

function Routing() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/inquire" element={<InquirePage />} />
          <Route path="/violation" element={<ViolationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
