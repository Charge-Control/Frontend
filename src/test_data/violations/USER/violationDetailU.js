import React from "react";
import { Link } from "react-router-dom";

const VioltaionDetailU = () => {
  return (
    <div className="container">
      <h1>이것은..violtaionDetailU</h1>
      <h1>사용자 전용 - 위반내역 조회 - 상세</h1>
      <Link to="/petition-new">
        <button className="detailButton">이의신청하기</button>
      </Link>
    </div>
  );
};

export default VioltaionDetailU;
