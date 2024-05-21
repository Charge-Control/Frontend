import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../components/config";
import { FaSearch } from "react-icons/fa";
import "./violationList.css";

const ViolationList = () => {
  const [userRole, setUserRole] = useState(""); // userRole 상태 추가
  const [violations, setViolations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      fetchCurrentMember(accessToken); // 현재 사용자 정보 가져오기
      fetchViolations(accessToken); // 위반 기록 불러오기
    }
  }, []);

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

  const fetchViolations = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/violation/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data; // 데이터 추출
      setViolations(data);
      setSearchResults(data); // 초기 검색 결과 설정
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    // Filter violations based on the searchTerm
    const filteredViolations = violations.filter((violation) =>
      violation.carNumber.includes(searchTerm)
    );
    setSearchResults(filteredViolations);
  };
  const getDisplayedViolations = () => {
    const sortedViolations = [...searchResults].sort((a, b) => b.id - a.id);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedViolations.slice(startIndex, endIndex);
  };

  const getPageNumbers = () => {
    const pagesCount = Math.ceil(searchResults.length / itemsPerPage);
    const pagesToShow = 5;
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = currentPage - halfPagesToShow;
    startPage = Math.max(startPage, 1);
    let endPage = startPage + pagesToShow - 1;
    endPage = Math.min(endPage, pagesCount);
    startPage = Math.max(endPage - pagesToShow + 1, 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div
      className={`violationList ${userRole === "ADMIN" ? "admin" : "nonAdmin"}`}
    >
      {userRole === "ADMIN" && (
        <div className="violation-search">
          <input
            type="text"
            placeholder="차량 번호를 입력하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
      )}

      <ul>
        {getDisplayedViolations().map((violation, index) => (
          <li key={index}>
            <div className="violationItemContainer">
              {violation.carImage && (
                <div className="violationImageContainer">
                  <img
                    src={violation.carImage}
                    alt="Violation"
                    className="violationImage"
                  />
                </div>
              )}
              <div>
                <div className="carNumber">차량번호: {violation.carNumber}</div>
                <div className="violationDate"> {violation.violationDate}</div>
                <div className="violationDetails">
                  위반 내용: {violation.violationContent}
                </div>
              </div>
              <Link to={`/violation-detail/${violation.id}`}>
                <button className="detailButton">상세 정보</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="paginationButtonContainer">
        <button
          className="paginationButton"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>
        {getPageNumbers().map((number) => (
          <button
            key={number}
            className={`paginationButton ${
              currentPage === number ? "active" : ""
            }`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          className="paginationButton"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(searchResults.length / itemsPerPage)
          }
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default ViolationList;
