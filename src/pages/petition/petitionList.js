import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../components/config";
import { FaSearch } from "react-icons/fa";
import "./petitionList.css";

const PetitionList = () => {
  const [petitions, setPetitions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("title");
  const [searchResults, setSearchResults] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const petitionsPerPage = 15;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      fetchCurrentMember(accessToken);
      fetchPetitions(accessToken);
    }
  }, []);

  useEffect(() => {
    if (isSearching) {
      handleSearch();
    }
  }, [isSearching]);

  const fetchCurrentMember = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/currentMember`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { role } = response.data;
      setUserRole(role);
    } catch (error) {
      console.error("Error fetching current member: ", error);
      alert("Failed to fetch user information.");
    }
  };

  const fetchPetitions = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/question/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      setPetitions(data);
    } catch (error) {
      console.error("Error fetching petitions: ", error);
      alert("Failed to fetch petitions.");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortedPetitions = petitions
    .slice()
    .sort((a, b) => b.questionId - a.questionId);
  const indexOfLastPetition = currentPage * petitionsPerPage;
  const indexOfFirstPetition = indexOfLastPetition - petitionsPerPage;
  const currentPetitions = isSearching
    ? searchResults.slice(indexOfFirstPetition, indexOfLastPetition)
    : sortedPetitions.slice(indexOfFirstPetition, indexOfLastPetition);

  const getPageNumbers = () => {
    const totalPetitions = isSearching
      ? searchResults.length
      : petitions.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPetitions / petitionsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const fetchPetitionsByTitle = async (token, searchTerm) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/question/search?title=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching petitions by title: ", error);
      alert("Failed to fetch petitions by title.");
    }
  };

  const fetchPetitionsByContent = async (token, searchTerm) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/question/search?content=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching petitions by content: ", error);
      alert("Failed to fetch petitions by content.");
    }
  };

  const fetchPetitionsByWriter = async (token, searchTerm) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/question/search?writer=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching petitions by writer: ", error);
      alert("Failed to fetch petitions by writer.");
    }
  };

  const fetchPetitionsByVehicleNumber = async (token, searchTerm) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/question/search?carnumber=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching petitions by vehicle number: ", error);
      alert("Failed to fetch petitions by vehicle number.");
    }
  };

  const handleSearch = () => {
    const accessToken = localStorage.getItem("accessToken");
    setIsSearching(true); // Enable searching state

    switch (searchOption) {
      case "title":
        fetchPetitionsByTitle(accessToken, searchTerm);
        break;
      case "content":
        fetchPetitionsByContent(accessToken, searchTerm);
        break;
      case "writer":
        fetchPetitionsByWriter(accessToken, searchTerm);
        break;
      case "vehicleNumber":
        fetchPetitionsByVehicleNumber(accessToken, searchTerm);
        break;
      default:
        console.error("Invalid search option");
    }
    setCurrentPage(1); // Reset to the first page after search
  };

  return (
    <div className="petitionList">
      <div className="petition-search">
        <select
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
        >
          {userRole === "ADMIN" ? (
            <>
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="writer">이름</option>
              <option value="vehicleNumber">차량 번호</option>
            </>
          ) : (
            <>
              <option value="title">제목</option>
              <option value="content">내용</option>
            </>
          )}
        </select>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="petitionbutton">
          <button onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="tableContainer">
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
              <tr key={petition.questionId}>
                <td>
                  {isSearching
                    ? searchResults.length - (indexOfFirstPetition + index)
                    : petitions.length - (indexOfFirstPetition + index)}
                </td>
                <td>
                  <Link
                    to={
                      userRole === "ADMIN"
                        ? `/petition-answer/${petition.questionId}`
                        : `/petition-detail/${petition.questionId}`
                    }
                  >
                    {petition.title}
                  </Link>
                </td>
                <td>{petition.writer}</td>
                <td>{petition.createdDate}</td>
                <td>{petition.isWrite ? "답변완료" : "미응답"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="paginationContainer">
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
              currentPage ===
              Math.ceil(
                (isSearching ? searchResults.length : petitions.length) /
                  petitionsPerPage
              )
            }
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetitionList;
