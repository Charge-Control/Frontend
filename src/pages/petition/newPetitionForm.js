import React, { useState } from "react";
import "./newpetition.css";

const NewPetitionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 각 필드가 비어 있는지 확인
    if (!title || !userName || !carNumber || !content) {
      setErrorMessage("모든 필드를 입력해주세요.");
      return;
    }
    // 차량 번호 형식 검사
    const carNumberRegex = /^[0-9가-힣]{2}[0-9가-힣]{1}\s?[0-9가-힣]{4}$/;
    if (!carNumberRegex.test(carNumber)) {
      setErrorMessage("올바른 차량 번호를 입력해주세요.");
      return;
    }

    // 여기에서 onSubmit 처리를 직접 정의합니다.
    console.log("Form submitted with data:", {
      title,
      userName,
      carNumber,
      content,
    });

    // 입력 초기화
    setTitle("");
    setUserName("");
    setCarNumber("");
    setContent("");
    setErrorMessage("");
  };

  return (
    <form className="newpetitionform" onSubmit={handleSubmit}>
      <div className="title-form">
        <label htmlFor="title">제목:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="username-form">
        <label htmlFor="userName">사용자 이름:</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="carnum-form">
        <label htmlFor="carNumber">차량 번호:</label>
        <input
          type="text"
          id="carNumber"
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
        />
      </div>
      <div className="text-form">
        <label htmlFor="content">내용:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button type="submit" className="submit-btn">
        문의 보내기
      </button>
    </form>
  );
};

export default NewPetitionForm;
