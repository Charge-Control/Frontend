import React, { useState, useEffect } from "react";
import ErrorModal from "../../components/error/ErrorModal";
import LoginForm from "../../components/loginForm/loginForm";
import "./login.css";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 저장하는 상태 변수

  useEffect(() => {
    // 로그인 상태에 따라 페이지를 이동합니다.
    if (isLoggedIn) {
      window.location.href = "/main"; // 로그인이 되어 있으면 메인 페이지로 이동
    }
  }, [isLoggedIn]);

  /*로그인 임시 구현*/
  const handleLogin = (email, password) => {
    if (email === "user@example.com" && password === "password") {
      alert("사용자 계정으로 로그인 성공!");
      console.log("폼이 성공적으로 제출되었습니다.");
      setIsLoggedIn(true); // 로그인 상태를 true로 변경
    } else if (email === "admin@example.com" && password === "adminpassword") {
      alert("관리자 계정으로 로그인 성공!");
      console.log("폼이 성공적으로 제출되었습니다.");
      setIsLoggedIn(true); // 로그인 상태를 true로 변경
    } else {
      setErrorMessage("이메일 또는 비밀번호가 잘못되었습니다.");
      console.log("폼이 제출되지 못함.");
    }
  };

  const closeModal = () => {
    setErrorMessage("");
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
          {errorMessage && (
            <ErrorModal errorMessage={errorMessage} onClose={closeModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
