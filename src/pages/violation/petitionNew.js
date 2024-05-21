import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../components/config";
import "./petitionNew.css";

const PetitionNew = () => {
  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (storedAccessToken && refreshToken) {
      setIsLoggedIn(true); // 로그인 상태 설정
      setAccessToken(storedAccessToken);
      fetchCurrentMember(storedAccessToken); // 현재 사용자 정보 가져오기
    }
  }, []);

  const fetchCurrentMember = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/currentMember`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { name, carNumber } = response.data; // 응답 데이터에서 이름과 차량번호 추출
      setUserName(name); // 사용자 이름 설정
      setCarNumber(carNumber); // 사용자 차량 번호 설정
    } catch (error) {
      console.error("사용자 정보 요청 오류:", error);
      alert("사용자 정보를 불러오는 데 실패했습니다."); // 오류 처리
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setErrorMessage("제목과 내용을 입력해주세요.");
      return;
    }

    if (!accessToken) {
      // 로그인되지 않은 경우
      setErrorMessage("로그인 후에 청원을 제출할 수 있습니다.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/question/write`,
        {
          violationId: 1,
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("문의가 성공적으로 제출되었습니다.");
      setTitle("");
      setContent("");
      setErrorMessage("");
      window.location.href = "/petitions"; // 이의신청 후에 이의신청 목록으로 이동
    } catch (error) {
      console.error("Error submitting petition: ", error);
      setErrorMessage("문의 제출에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <form className="newpetitionform" onSubmit={handleSubmit}>
      <div className="title-form">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="username-form">
        <label htmlFor="userName">사용자</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled // 사용자 이름은 수정 불가
        />
      </div>
      <div className="carnum-form">
        <label htmlFor="carNumber">차량 번호</label>
        <input
          type="text"
          id="carNumber"
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
          disabled // 차량 번호는 수정 불가
        />
      </div>
      <div className="text-form">
        <label htmlFor="content">이의신청</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button type="submit" className="submit-btn">
        이의신청
      </button>
    </form>
  );
};

export default PetitionNew;
