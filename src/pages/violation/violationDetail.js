import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../components/config";
import "./violationDetail.css"; // 필요 시 스타일 파일 추가

const ViolationDetail = () => {
  const [violation, setViolation] = useState(null);
  const [userRole, setUserRole] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      fetchViolationDetail(accessToken);
      fetchCurrentMember(accessToken);
    }
  }, [id]);

  const fetchViolationDetail = async (token) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/violation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data; // 데이터 추출
      setViolation(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

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
      console.error("사용자 정보 요청 오류:", error);
      alert("사용자 정보를 불러오는 데 실패했습니다."); // 오류 처리
    }
  };

  if (!violation) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="violationDetail-title">
      <h2>위반내역 상세 조회</h2>
      <div className="violationDetail">
        <h3>차량 번호: {violation.carNumber}</h3>
        <p>{violation.violationDate}</p>
        <p>위반 장소: {violation.violationPlace}</p>
        <p>법령: 환경친화적 자동차의 개발 및 보급 촉진에 관한 법률</p>
        <p>위반 내용: {violation.violationContent}</p>
        <p>과태료: 100,000원 </p>
        {violation.carImage && (
          <div className="violationImageContainer">
            <img
              src={violation.carImage}
              alt="Violation"
              className="violationImage"
            />
          </div>
        )}
        {userRole === "USER" && (
          <div className="appealButtonContainer">
            <Link to="/petition-new" className="appealButton">
              이의신청하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViolationDetail;
