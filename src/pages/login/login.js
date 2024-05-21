import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "../../components/loginForm/loginForm";
import { API_BASE_URL } from "../../components/config";

import "./login.css";

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      // API 연결
      const response = await axios.post(`${API_BASE_URL}/api/v1/login`, {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data.data;

      if (accessToken && refreshToken) {
        // 토큰 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`; //헤더
        setIsLoggedIn(true);
        console.log("로그인되었습니다.");
        window.location.href = "/main"; // 로그인 후에 메인 페이지로 이동

        // 사용자 정보 요청
        const memberResponse = await axios.get(
          `${API_BASE_URL}/api/v1/currentMember`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } else {
        throw new Error("토큰이 반환되지 않았습니다.");
      }
    } catch (error) {
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
      console.error("로그인 오류:", error);
    }
  };
  return (
    <div className="login-container">
      <div className="content">
        <div>
          <h2>로그인</h2>
          <LoginForm onLogin={handleLogin} />
          <p>
            계정이 없으신가요? <a href="Join">회원가입</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
