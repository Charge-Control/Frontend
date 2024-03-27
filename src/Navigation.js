import React from "react";
import "./style/NavStyle.css"; // styles.css 파일을 import

const Navigation = () => {
  return (
    <div class="navbar">
      <div class="brand">:ChargeControl</div>
      <div class="nav-items">
        <div class="nav-item">충전소 찾기</div>
        <div class="nav-item">위반 내역 조회</div>
        <div class="nav-item">서비스 소개</div>
        <div class="nav-item">소통 창구</div>
      </div>
      <div class="user-actions">
        <div class="action">회원가입</div>
        <div class="action">/</div>
        <div class="action">로그인</div>
      </div>
    </div>
  );
};

export default Navigation;
