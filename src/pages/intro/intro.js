import React from "react";
import "./intro.css";

const IntroPage = () => {
  return (
    <div className="container">
      <div>
        <div className="introImage"></div>
      </div>
      <div className="intro-content">
        <div className="introTitle">Charge Control에 오신 것을 환영합니다!</div>
        <div className="introContents1">
          Charge Control은 충북대학교 정보통신공학부 학부생이 만든 Web
          site입니다. 전기차의 인기가 높아짐에 따라 충전 인프라와 관련된 정보의
          필요성도 증가하고 있습니다. 저희 사이트는 전기차 충전소의 위치와 상세
          정보, 그리고 관련 법규 위반내역을 손쉽게 조회할 수 있는 플랫폼입니다.
        </div>
        <br />
        <br />
        <div className="introContents2">우리의 목표</div>
        <br />
        <div className="introContents3">
          저희 사이트는 전기차 사용자들에게 보다 편리하고 효율적인 충전 환경을
          제공하고, 법규 준수를 독려하여 안전하고 깨끗한 전기차 문화를 조성하는
          데 기여하고자 합니다. 사용자 여러분의 적극적인 이용과 피드백을 통해
          지속적으로 발전하는 서비스를 제공하겠습니다. 감사합니다.
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
