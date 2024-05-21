import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="container">
      <div className="mainImage"></div>
      <div className="content">
        <div className="main-title-dark">Charge Control</div>
        <div className="main-title-light">Charge Control</div>
        <div className="main-subtitle-dark">
          전기차 충전소 관리를
          <br />더 효율적으로
        </div>
        <div className="main-subtitle-light">
          전기차 충전소 관리를
          <br />더 효율적으로
        </div>
      </div>
    </div>
  );
};

export default MainPage;
