import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./nav-main.css";

const Navigation = () => {
  const [isSubMenuOpenViolation, setIsSubMenuOpenViolation] = useState(false); // 서브메뉴 열림 상태
  const [isMainPage, setIsMainPage] = useState(true); // 메인 페이지 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const [userName, setUserName] = useState(""); // 사용자 이름
  const [userRole, setUserRole] = useState(""); // 사용자 역할 (admin 또는 user)

  const navRef = useRef(null); // 네비게이션 참조

  useEffect(() => {
    setIsMainPage(
      window.location.pathname === "/main" || window.location.pathname === "/"
    ); // 현재 페이지가 메인 페이지인지 확인
  }, []);

  useEffect(() => {
    if (isMainPage) {
      import("./nav-main.css"); // 메인 페이지일 때 nav-main.css 로드
    } else {
      import("./nav-sub.css"); // 서브 페이지일 때 nav-sub.css 로드
    }
  }, [isMainPage]);

  const toggleSubMenuViolation = (event) => {
    event.stopPropagation();
    if (!isLoggedIn) {
      alert("로그인하세요");
      window.location.href = "/login"; // 로그인 페이지로 이동
    } else {
      setIsSubMenuOpenViolation(!isSubMenuOpenViolation); // 서브메뉴 토글
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsSubMenuOpenViolation(false); // 네비게이션 외부 클릭 시 서브메뉴 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      setIsLoggedIn(true); // 로그인 상태 설정
      fetchCurrentMember(accessToken); // 현재 사용자 정보 가져오기
    }
  }, []);

  const fetchCurrentMember = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/currentMember`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { role, name } = response.data; // 응답 데이터에서 역할과 이름 추출
      setUserName(name); // 사용자 이름 설정
      setUserRole(role); // 사용자 역할 설정
    } catch (error) {
      console.error("사용자 정보 요청 오류:", error);
      alert("사용자 정보를 불러오는 데 실패했습니다."); // 오류 처리
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그인 상태 해제
    setUserName(""); // 사용자 이름 초기화
    setUserRole(""); // 사용자 역할 초기화
    localStorage.removeItem("accessToken"); // 액세스 토큰 제거
    localStorage.removeItem("refreshToken"); // 리프레시 토큰 제거
    window.location.href = "/main"; // 메인 페이지로 이동
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
          {isSubMenuOpenViolation && isLoggedIn && (
            <div className="sub-menu1">
              {userRole === "ADMIN" ? (
                <>
                  <a className="sub-name1" href="/violations">
                    전체 위반내역 조회
                  </a>
                  <a className="sub-name2" href="/petitions">
                    이의신청 조회
                  </a>
                </>
              ) : (
                <>
                  <a className="sub-name1" href="/violations">
                    내 위반내역 조회
                  </a>
                  <a className="sub-name2" href="/petitions">
                    이의신청 확인
                  </a>
                </>
              )}
            </div>
          )}
        </div>
        <a href="/faq" className="nav-item">
          FAQ
        </a>
      </div>

      <div className="user-actions">
        {isLoggedIn ? (
          <>
            <span className="user-name">{userName}님, 반갑습니다</span>
            <span className="action">/</span>
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
