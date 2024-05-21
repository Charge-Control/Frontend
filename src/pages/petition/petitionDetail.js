import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../components/config";
import "./petitionDetail.css";

/*사용자*/

const PetitionDetail = () => {
  const [petition, setPetition] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      fetchPetitionDetail(accessToken);
      fetchPetitionAnswer(accessToken);
      fetchCurrentMember(accessToken);
    }
  }, [id]);

  // 이의신청 수정
  const handleModifyPetition = async () => {
    window.location.href = `/petition-edit/${id}`; // 이의신청 수정창으로 이동
  };

  // 이의신청 삭제
  const handleDeletePetition = async () => {
    if (window.confirm("정말로 이의신청을 삭제하시겠습니까?")) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        await axios.delete(`${API_BASE_URL}/api/v1/question/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert("이의신청이 성공적으로 삭제되었습니다.");
        window.location.href = "/petitions"; // 삭제 후 이의신청 리스트로 이동
      } catch (error) {
        console.error("Error deleting petition:", error);
        alert("이의신청 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // 이의신청 상세
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
      const data = response.data.data; // 데이터 추출
      setPetition(data);
    } catch (error) {
      console.error("Error fetching petition data: ", error);
      setLoading(false);
    }
  };

  //답변 조회
  const fetchPetitionAnswer = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/answer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const answerData = response.data.data; // 데이터 추출
      setPetition((prevPetition) => ({
        ...prevPetition,
        answer: answerData, // 답변 데이터 추가
      }));
    } catch (error) {
      console.error("Error fetching petition answer:", error);
    }
  };

  // 권한 조회
  const fetchCurrentMember = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/currentMember`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { role } = response.data; // 권한 추출
      setUserRole(role); // 권한 설정
    } catch (error) {
      console.error("Error fetching user information:", error);
      alert("사용자 정보를 불러오는 데 실패했습니다."); // 오류 처리
    } finally {
      setLoading(false); // 모든 API 호출 완료 후 로딩 상태 변경
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!petition) {
    return <div className="error">Failed to load petition data.</div>;
  }

  return (
    <div className="petitionDetail">
      <h2 className="title1"></h2>
      <div className="petition-contents1">
        <div className="titiles1">
          <div className="first1">
            <p>글 제목: {petition.title}</p>
            <p>작성자: {petition.writer}</p>
            <p>차량 번호: {petition.carNumber}</p>
          </div>
          <div className="second1">
            <p>작성 날짜: {petition.createdDate}</p>
            <p>{petition.isWrite ? "답변완료" : "미응답"}</p>
          </div>
        </div>
        <p className="text-item1"> {petition.content}</p>
        {petition.answer && (
          <p className="answer-item1">
            <span className="answer-title1">
              <span className="answer-title2">
                관리자({petition.answer.writer})<br />
              </span>
              답변
              <br />
            </span>
            <span className="answer-content1">{petition.answer.content}</span>
          </p>
        )}
        {!petition.isWrite && (
          <div className="button-container">
            <div className="edit-button">
              <button onClick={handleModifyPetition}>수정</button>
            </div>
            <div className="delete-button">
              <button onClick={handleDeletePetition}>삭제</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetitionDetail;
