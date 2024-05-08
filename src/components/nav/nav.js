/*
import React, { useState, useEffect, useRef } from "react";
import "./nav-main.css";

const Navigation = () => {
  const [isSubMenuOpenViolation, setIsSubMenuOpenViolation] = useState(false); // 위반 내역 조회 서브 메뉴 열림 여부 상태
  const [isSubMenuOpenInquire, setIsSubMenuOpenInquire] = useState(false); // 소통 창구 서브 메뉴 열림 여부 상태
  const [isMainPage, setIsMainPage] = useState(true); // 메인 페이지 여부 상태 추가
  const navRef = useRef(null);

  useEffect(() => {
    setIsMainPage(
      window.location.pathname === "/main" || window.location.pathname === "/"
    ); // 현재 URL을 통해 메인 페이지 여부를 판단하여 상태 업데이트
  }, []);

  useEffect(() => {
    // isMainPage 상태에 따라 다른 CSS 파일을 동적으로 import
    if (isMainPage) {
      import("./nav-main.css"); // import 함수를 사용하여 동적으로 모듈을 가져옴
    } else {
      import("./nav-sub.css"); // import 함수를 사용하여 동적으로 모듈을 가져옴
    }
  }, [isMainPage]); // isMainPage 상태가 변경될 때마다 실행

  const toggleSubMenuViolation = (event) => {
    event.stopPropagation(); // 이벤트 전파 중지
    setIsSubMenuOpenViolation(!isSubMenuOpenViolation); // 위반 내역 조회 서브 메뉴의 열림 상태를 토글
  };

  const toggleSubMenuInquire = (event) => {
    event.stopPropagation(); // 이벤트 전파 중지
    setIsSubMenuOpenInquire(!isSubMenuOpenInquire); // 소통 창구 서브 메뉴의 열림 상태를 토글
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsSubMenuOpenViolation(false);
        setIsSubMenuOpenInquire(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar" ref={navRef}>
      <a href="/main" className="brand">
        :ChargeControl
      </a>

      <div className="nav-items">
        <a href="/intro" className="nav-item">
          서비스 소개
        </a>
        <a href="/evmap" className="nav-item">
          충전소 찾기
        </a>
        <div className="nav-item" onClick={toggleSubMenuViolation}>
          위반내역 조회
          {isSubMenuOpenViolation && (
            <div className="sub-menu1">
              <a href="/view-all-violations">전체 위반 내역 조회</a>
              <a href="/view-all-petitions">이의 신청 확인</a>
            </div>
          )}
        </div>
        <div className="nav-item" onClick={toggleSubMenuInquire}>
          소통 창구
          {isSubMenuOpenInquire && (
            <div className="sub-menu2">
              <a href="/view-all-inquires">문의하기</a>
              <a href="/view-all-faq">FAQ</a>
            </div>
          )}
        </div>
      </div>

      <div className="user-actions">
        <a href="/join" className="action">
          회원가입
        </a>
        <span className="action">/</span>
        <a href="/login" className="action">
          로그인
        </a>
      </div>
    </div>
  );
};

export default Navigation;
*/

/* 사용자 이름 / 로그아웃*/

import React, { useState, useEffect, useRef } from "react";
import "./nav-main.css";

import setIsLoggedIn from "../../pages/login/login.js";

const Navigation = ({ isLoggedIn }) => {
  const [isSubMenuOpenViolation, setIsSubMenuOpenViolation] = useState(false);
  const [isSubMenuOpenInquire, setIsSubMenuOpenInquire] = useState(false);
  const [isMainPage, setIsMainPage] = useState(true);
  const [userName, setUserName] = useState(""); // 사용자 이름을 저장하는 상태 변수
  const navRef = useRef(null);

  useEffect(() => {
    setIsMainPage(
      window.location.pathname === "/main" || window.location.pathname === "/"
    );
  }, []);

  useEffect(() => {
    if (isMainPage) {
      import("./nav-main.css");
    } else {
      import("./nav-sub.css");
    }
  }, [isMainPage]);

  const toggleSubMenuViolation = (event) => {
    event.stopPropagation();
    setIsSubMenuOpenViolation(!isSubMenuOpenViolation);
  };

  const toggleSubMenuInquire = (event) => {
    event.stopPropagation();
    setIsSubMenuOpenInquire(!isSubMenuOpenInquire);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsSubMenuOpenViolation(false);
        setIsSubMenuOpenInquire(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // 로그아웃 함수 - 로그아웃 시 로그인 상태를 false로 변경합니다.
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <div className="navbar" ref={navRef}>
      <a href="/main" className="brand">
        :ChargeControl
      </a>

      <div className="nav-items">
        <a href="/intro" className="nav-item">
          서비스 소개
        </a>
        <a href="/evmap" className="nav-item">
          충전소 찾기
        </a>
        <div className="nav-item" onClick={toggleSubMenuViolation}>
          위반내역 조회
          {isSubMenuOpenViolation && (
            <div className="sub-menu1">
              <a href="/view-all-violations">전체 위반 내역 조회</a>
              <a href="/view-all-petitions">이의 신청 확인</a>
            </div>
          )}
        </div>
        <div className="nav-item" onClick={toggleSubMenuInquire}>
          소통 창구
          {isSubMenuOpenInquire && (
            <div className="sub-menu2">
              <a href="/view-all-inquires">문의하기</a>
              <a href="/faq">FAQ</a>
            </div>
          )}
        </div>
      </div>

      <div className="user-actions">
        {isLoggedIn ? ( // 로그인 상태에 따라 다른 내용을 렌더링합니다. ???????? 이거 반영 안됨
          <>
            <span className="user-name">{userName}</span>
            <span className="action" onClick={handleLogout}>
              로그아웃
            </span>
          </>
        ) : (
          <>
            <a href="/join" className="action">
              회원가입
            </a>
            <span className="action">/</span>
            <a href="/login" className="action">
              로그인
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
