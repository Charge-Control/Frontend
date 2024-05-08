// JoinPage.js
import React, { useState } from "react";
import "./join.css";
/*nav 안넣어도 됨*/

const JoinPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !carNumber || !password || !confirmPassword) {
      setErrorMessage("모든 필드를 입력하세요.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    console.log("폼이 성공적으로 제출되었습니다."); // 폼이 성공적으로 제출되었을 때 콘솔에 출력

    // 여기서 서버로 회원가입 정보를 전송하는 코드를 추가할 수 있습니다.
    // 이 예시에서는 여기서는 단순히 에러 메시지를 초기화합니다.
    setErrorMessage("");
  };

  const closeModal = () => {
    setErrorMessage("");
  };

  return (
    <div className="join-container">
      <div>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
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
            <label>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>차량번호</label>
            <input
              type="text"
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value)}
              required
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
        </form>
        <p>
          이미 계정이 있으신가요? <a href="login">로그인</a>
        </p>

        {errorMessage && (
          <div id="error-modal">
            <div>
              <h3>에러</h3>
              <p className="error-message">{errorMessage}</p>
              <button onClick={closeModal}>닫기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinPage;
