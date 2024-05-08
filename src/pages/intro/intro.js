import React from "react";
import "./intro.css";

/*nav 안넣어도 됨*/
const IntroPage = () => {
  return (
    <div className="container">
      <div>
        <div className="introImage"></div>
      </div>
      <div className="intro-content">
        <div className="introTitle">Charge Control</div>
        <div className="introContents">
          charge control은 충북대학교 정보통신공학부 하태보가 만든 웹사이트
          입니다.
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
