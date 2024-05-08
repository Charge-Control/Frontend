import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import Navigation from "../../components/nav/nav";

const MainPage = () => {
  return (
    <div className="container">
      <Navigation />
      <div className="mainImage"></div>
      <div className="content">
        <div className="title title-dark">Charge Control</div>
        <div className="title title-light">Charge Control</div>
        <div className="subtitle subtitle-dark">
          전기차 충전소 관리를
          <br />더 효율적으로
        </div>
        <div className="subtitle subtitle-light">
          전기차 충전소 관리를
          <br />더 효율적으로
        </div>
      </div>
    </div>
  );
};

export default MainPage;

ReactDOM.render(<MainPage />, document.getElementById("root"));
