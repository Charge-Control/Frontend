import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../components/config";

import "./join.css";

const JoinPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setVerificationCode] = useState(""); // 이메일 인증번호 상태
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false); // 이메일 인증 코드 발송 여부 상태
  const [isVerified, setIsVerified] = useState(false); // 이메일 인증 완료 여부 상태
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 이메일 인증 확인
    if (!isVerified) {
      alert("이메일 인증을 진행하세요.");
      return;
    }

    // 회원가입
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/join`, {
        email,
        name,
        password,
        carNumber,
        phoneNumber,
      });

      console.log("회원가입 응답 데이터:", response.data); // 서버 응답 데이터 콘솔 출력

      console.log("회원가입 성공:", response.data);
      alert("회원가입이 성공적으로 완료되었습니다!"); // 에러 메시지 초기화
      window.location.href = "/main"; // 메인 페이지로 이동
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert(error.response.data.message);
    }
  };

  const handleEmailVerification = async () => {
    // 이메일 발송
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/verify-email`, {
        email, // 사용자가 입력한 이메일
      });
      console.log("이메일 발송 성공:", response.data);
      setIsVerificationCodeSent(true); // 이메일 인증 코드 발송 상태 변경
    } catch (error) {
      console.error("이메일 발송 오류:", error);
      alert("이메일 발송 중 오류가 발생했습니다.");
    }
  };

  const handleVerificationSubmit = async () => {
    // 이메일 코드 인증
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/verification-code`,
        {
          code, // 사용자가 입력한 인증 코드
        }
      );
      console.log("이메일 코드 확인 성공:", response.data);
      setIsVerified(true); // 이메일 인증 완료 여부 상태 변경
      alert("이메일 인증이 완료되었습니다.");
    } catch (error) {
      console.error("이메일 코드 확인 오류:", error);
      setErrorMessage("이메일 코드 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="join-container">
      <div>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="one">
            <div>
              <label>이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>전화번호</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <div className="one">
              <div className="email-set">
                <label>이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {isVerificationCodeSent && !isVerified ? (
                  <div>
                    <label>인증번호 입력</label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />
                    <button type="button" onClick={handleVerificationSubmit}>
                      인증 완료
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={handleEmailVerification}>
                    이메일 인증
                  </button>
                )}
              </div>
            </div>

            <div>
              <label>차량번호</label>
              <input
                type="text"
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value)}
              />
            </div>

            <div>
              <label>비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label>비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">회원가입</button>
          </div>
        </form>
        <p>
          이미 계정이 있으신가요? <a href="login">로그인</a>
        </p>
      </div>
    </div>
  );
};

export default JoinPage;
