import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViolationListU = () => {
  const [violations, setViolations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/violation_test.json")
      .then((response) => response.json())
      .then((data) => {
        setViolations(data);
        setSearchResults(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    const filteredViolations = violations.filter((violation) =>
      violation.차량번호.includes(" 1234")
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
              <Link to={`/view-my-violations/${violation.id}`}>
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

export default ViolationListU;
