import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import MainPage from "../pages/main/main";
import IntroPage from "../pages/intro/intro";
import MapPage from "../pages/map/evmap";

import LoginPage from "../pages/login/login";
import JoinPage from "../pages/join/join";

import ViolationList from "../pages/violation/violationList";
import ViolationDetail from "../pages/violation/violationDetail";

import PetitionList from "../pages/petition/petitionList";
import PetitionDetail from "../pages/petition/petitionDetail";

import NewPetitionForm from "../pages/petition/newPetitionForm";

import FaqPage from "../pages/faq/faq";

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
          <Route path="/evmap" element={<MapPage />} />

          <Route path="/view-all-violations" element={<ViolationList />} />
          <Route
            path="/violation-detail/:index"
            element={<ViolationDetail />}
          />

          <Route path="/view-all-petitions" element={<PetitionList />} />
          <Route path="/petition-detail/:id" element={<PetitionDetail />} />

          <Route path="/newpetition" element={<NewPetitionForm />} />

          <Route path="/faq" element={<FaqPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
