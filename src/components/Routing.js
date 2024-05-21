import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/login/login";
import JoinPage from "../pages/join/join";
import MainPage from "../pages/main/main";
import IntroPage from "../pages/intro/intro";
import MapPage from "../pages/map/evmap";
import FaqPage from "../pages/faq/faq";

//위반내역 조회
import ViolationList from "../pages/violation/violationList";
import ViolationDetail from "../pages/violation/violationDetail";
import PetitionNew from "../pages/violation/petitionNew";
import PetitionEdit from "../pages/petition/petitionEdit";

//이의신청 조회

import PetitionList from "../pages/petition/petitionList";
import PetitionDetail from "../pages/petition/petitionDetail";
import PetitionAnswer from "../pages/petition/petitionAnswer";

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
          <Route path="/faq" element={<FaqPage />} />

          <Route path="/violations" element={<ViolationList />} />
          <Route path="/violation-detail/:id" element={<ViolationDetail />} />

          <Route path="/petition-new" element={<PetitionNew />} />
          <Route path="/petition-edit/:id" element={<PetitionEdit />} />

          <Route path="/petitions" element={<PetitionList />} />
          <Route path="/petition-answer/:id" element={<PetitionAnswer />} />
          <Route path="/petition-detail/:id" element={<PetitionDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
