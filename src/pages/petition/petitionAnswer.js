import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../components/config";
import "./petitionanswer.css";

/* 관리자 */

const PetitionAnswer = () => {
  const [petition, setPetition] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [answerContent, setAnswerContent] = useState("");
  const [isEditingAnswer, setIsEditingAnswer] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      fetchPetitionDetail(accessToken);
      fetchPetitionAnswer(accessToken);
      fetchCurrentMember(accessToken);
    }
  }, [id]);

  const handleEditButtonClick = () => {
    setIsEditingAnswer(true);
    setAnswerContent(petition.answer.content);
  };

  const handleCancelEdit = () => {
    setIsEditingAnswer(false);
    setAnswerContent("");
  };

  const handleEditAnswer = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      await axios.patch(
        `${API_BASE_URL}/api/v1/answer/modify/${id}`,
        {
          content: answerContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("답변이 성공적으로 수정되었습니다.");
      window.location.href = `/petition-answer/${id}`;
    } catch (error) {
      console.error("Error editing answer:", error);
      alert("답변 수정 중 오류가 발생했습니다.");
    }
    setIsEditingAnswer(false);
  };

  const handleDeleteAnswer = async () => {
    if (window.confirm("정말로 답변을 삭제하시겠습니까?")) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        await axios.delete(`${API_BASE_URL}/api/v1/answer/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert("답변 성공적으로 삭제되었습니다.");
        window.location.href = "/petitions";
      } catch (error) {
        console.error("Error deleting petition:", error);
        alert("답변 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const fetchPetitionDetail = async (token) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/question/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setPetition(data);
    } catch (error) {
      console.error("Error fetching petition data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPetitionAnswer = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/answer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const answerData = response.data.data;
      setPetition((prevPetition) => ({
        ...prevPetition,
        answer: answerData,
      }));
    } catch (error) {
      console.error("Error fetching petition answer:", error);
    }
  };

  const fetchCurrentMember = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/currentMember`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { role, name } = response.data;
      setUserRole(role);
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
      alert("사용자 정보를 불러오는 데 실패했습니다.");
    }
  };

  const handleAnswerSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      await axios.post(
        `${API_BASE_URL}/api/v1/answer/write`,
        {
          questionId: id,
          content: answerContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("답변이 제출되었습니다");
      setPetition((prevPetition) => ({
        ...prevPetition,
        isWrite: true,
        answer: { content: answerContent, writer: currentUser.name },
      }));
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("답변 제출에 실패했습니다.");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!petition) {
    return <div className="error">Failed to load petition data.</div>;
  }

  return (
    <div className="petitionAnswer">
      <h2 className="title"></h2>
      <div className="petition-contents">
        <div className="titiles">
          <div className="first">
            <p>제목: {petition.title}</p>
            <p>작성자: {petition.writer}</p>
            <p>차량 번호: {petition.carNumber}</p>
          </div>
          <div className="second">
            <p>작성 날짜: {petition.createdDate}</p>
            <p>{petition.isWrite ? "답변완료" : "미응답"}</p>
          </div>
        </div>

        <p className="text-item"> {petition.content}</p>
        {petition.answer && !isEditingAnswer ? (
          <>
            <p className="answer-item">
              <span className="answer-title1">
                <span className="answer-title2">
                  관리자({petition.answer.writer}){" "}
                </span>
                <br />
                답변
                <br />
              </span>
              <span className="answer-content">{petition.answer.content}</span>
            </p>

            {userRole === "ADMIN" && (
              <div>
                <button
                  className="petition-detail-button"
                  onClick={handleEditButtonClick}
                >
                  답변 수정
                </button>
                <button
                  className="delete-answer-button"
                  onClick={handleDeleteAnswer}
                >
                  답변 삭제
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {userRole === "ADMIN" && !petition.isWrite && (
              <div className="answer-form">
                <textarea
                  value={answerContent}
                  onChange={(e) => setAnswerContent(e.target.value)}
                  placeholder="답변을 입력하세요"
                />
                <button
                  className="petition-detail-button"
                  onClick={handleAnswerSubmit}
                >
                  답변 제출
                </button>
              </div>
            )}
          </>
        )}

        {isEditingAnswer && (
          <div className="edit-form">
            <textarea
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              placeholder="답변을 수정하세요"
            />
            <button
              className="petition-detail-button"
              onClick={handleEditAnswer}
            >
              답변 수정
            </button>
            <button className="cancel-edit-btn" onClick={handleCancelEdit}>
              수정 취소
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetitionAnswer;
