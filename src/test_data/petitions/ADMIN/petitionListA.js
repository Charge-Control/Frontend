import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./petitionListA.css";

const PetitionListA = () => {
  const [petitions, setPetitions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const petitionsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/petition_test.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // 데이터를 역순으로 정렬하여 설정합니다.
        setPetitions(data.reverse());
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // Get current petitions
  const indexOfLastPetition = currentPage * petitionsPerPage;
  const indexOfFirstPetition = indexOfLastPetition - petitionsPerPage;
  const currentPetitions = petitions.slice(
    indexOfFirstPetition,
    indexOfLastPetition
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(petitions.length / petitionsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="petitionList">
      <div className="tableContainer">
        {/* 테이블 컨테이너 */}
        <table>
          <thead>
            <tr>
              <th>글 번호</th>
              <th>글 제목</th>
              <th>작성자</th>
              <th>작성 날짜</th>
              <th>답변 여부</th>
            </tr>
          </thead>
          <tbody>
            {currentPetitions.map((petition, index) => (
              <tr key={petition.id}>
                {/* 글 번호 계산을 역순으로 조정 */}
                <td>{petitions.length - (indexOfFirstPetition + index)}</td>
                <td>
                  <Link to={`/view-all-petitions/${petition.id}`}>
                    {petition["글 제목"]}
                  </Link>
                </td>
                <td>{petition["사용자 이름"]}</td>
                <td>{petition["작성 날짜"]}</td>
                <td>{petition["답변 여부"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="paginationContainer">
        {/* 페이지네이션 컨테이너 */}
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
              currentPage === Math.ceil(petitions.length / petitionsPerPage)
            }
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetitionListA;

/*
import React from "react";
import { Link } from "react-router-dom";

const PetitionListA = () => {
  return (
    <div className="container">
      <h1>이것은..petitionListA</h1>
      <h1>관리자 전용 - 이의신청 조회 - 리스트</h1>
      <Link to="/petition-answer">
        <button className="detailButton">전체 이의신청 상세 및 답변</button>
      </Link>
    </div>
  );
};

export default PetitionListA;
*/
