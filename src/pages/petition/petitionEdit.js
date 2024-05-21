import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../components/config";
import "./petitionEdit.css";

const PetitionEdit = () => {
  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const { id } = useParams(); // id 매개변수 추출

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (storedAccessToken && refreshToken) {
      setIsLoggedIn(true);
      setAccessToken(storedAccessToken);
      fetchCurrentMember(storedAccessToken);
    }
  }, []);

  // 이름, 차량 번호 추출
  const fetchCurrentMember = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/currentMember`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { name, carNumber } = response.data;
      setUserName(name);
      setCarNumber(carNumber);
    } catch (error) {
      console.error("사용자 정보 요청 오류:", error);
      alert("사용자 정보를 불러오는 데 실패했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setErrorMessage("제목과 내용을 입력해주세요.");
      return;
    }

    if (!accessToken) {
      setErrorMessage("로그인 후에 청원을 제출할 수 있습니다.");
      return;
    }

    try {
      await axios.patch(
        `${API_BASE_URL}/api/v1/question/modify/${id}`, // id 매개변수 사용
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("이의신청이 성공적으로 수정되었습니다.");
      window.location.href = `/petition-detail/${id}`;
    } catch (error) {
      console.error("Error editing petition:", error);
      alert("이의신청 수정 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    window.location.href = `/petition-detail/${id}`; // 수정 취소하면 디테일로 이동
  };

  return (
    <form className="editpetitionform" onSubmit={handleSubmit}>
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
          disabled
        />
      </div>
      <div className="carnum-form">
        <label htmlFor="carNumber">차량 번호:</label>
        <input
          type="text"
          id="carNumber"
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
          disabled
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
        수정하기
      </button>
      <button type="button" className="cancel-btn" onClick={handleCancel}>
        수정취소
      </button>
    </form>
  );
};

export default PetitionEdit;
