import React from "react";
import { Link } from "react-router-dom";

const PetitionListU = () => {
  return (
    <div className="container">
      <h1>이것은..petitionListU</h1>
      <h1>사용자 전용 - 이의신청 조회 - 리스트</h1>
      <Link to="/view-my-petition">
        <button className="detailButton">내 이의신청 상세</button>
      </Link>
    </div>
  );
};

export default PetitionListU;
