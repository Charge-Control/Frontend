import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./violationListA.css";

const ViolationListA = () => {
  const [violations, setViolations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/violation_test.json")
      .then((response) => response.json())
      .then((data) => setViolations(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    const filteredViolations = violations.filter((violation) =>
      violation.차량번호.includes(searchTerm)
    );
    setViolations(filteredViolations);
  };

  const getDisplayedViolations = () => {
    const sortedViolations = [...violations].sort((a, b) => b.id - a.id); // ID를 기준으로 역순으로 정렬
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedViolations.slice(startIndex, endIndex);
  };

  const getPageNumbers = () => {
    const pagesCount = Math.ceil(violations.length / itemsPerPage);
    const pagesToShow = 5; // 한 번에 보여줄 페이지 수
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = currentPage - halfPagesToShow;
    startPage = Math.max(startPage, 1); // 페이지 번호가 음수가 되지 않도록 보정
    let endPage = startPage + pagesToShow - 1;
    endPage = Math.min(endPage, pagesCount); // endPage가 pagesCount를 초과하지 않도록 보정
    startPage = Math.max(endPage - pagesToShow + 1, 1); // 페이지 번호를 제한하여 보여줄 페이지 수 제어
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="violationList">
      <input
        type="text"
        placeholder="차량 번호를 입력하세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      <ul>
        {getDisplayedViolations().map((violation, index) => (
          <li key={index}>
            <div className="violationItemContainer">
              {violation.imagePath && (
                <div className="violationImageContainer">
                  <img
                    src={violation.imagePath}
                    alt="Violation"
                    className="violationImage"
                  />
                </div>
              )}
              <div>
                <div className="carNumber">차량번호: {violation.차량번호}</div>
                <div className="violationdate">
                  위반 날짜: {violation.날짜_시간}
                </div>
                <div className="violationDetails">
                  위반 내용: {violation.위반_내용}
                </div>
              </div>
              <Link to={`/view-all-violations/${violation.id}`}>
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
          disabled={currentPage === Math.ceil(violations.length / itemsPerPage)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default ViolationListA;

/*
import React from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 가져오기

const ViolationListA = () => {
  return (
    <div className="container">
      <h1>이것은..violationListA</h1>
      <h1>관리자 전용 - 위반내역 조회 - 리스트</h1>
      <Link to="/view-all-violation">
        <button className="detailButton">위반내역 상세</button>
      </Link>
    </div>
  );
};

export default ViolationListA;
*/
