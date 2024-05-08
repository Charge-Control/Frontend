import React, { useState, useEffect } from "react";
import "./faq.css";

const FaqPage = () => {
  const [faqData, setFaqData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [filteredFaqData, setFilteredFaqData] = useState([]); // 필터링된 FAQ 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const faqsPerPage = 10; // 페이지당 FAQ 수

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("faq.json");
        const data = await response.json();
        setFaqData(data);
        setFilteredFaqData(data);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchData();
  }, []);

  // 선택된 질문의 id를 저장하는 state
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // 질문 클릭 시 해당 질문의 id를 selectedQuestion state에 설정
  const handleQuestionClick = (id) => {
    setSelectedQuestion(selectedQuestion === id ? null : id);
  };

  // 검색어를 변경할 때마다 호출되는 함수
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색 버튼 클릭 시 실행되는 함수
  const handleSearch = () => {
    const filteredData = faqData.filter(
      (item) => item.질문.includes(searchTerm) || item.답변.includes(searchTerm)
    );
    setFilteredFaqData(filteredData);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  // 현재 페이지의 FAQ 목록을 계산하는 함수
  const indexOfLastFaq = currentPage * faqsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
  const currentFaqs = filteredFaqData.slice(indexOfFirstFaq, indexOfLastFaq);

  // 페이지 번호를 변경하는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 총 페이지 수를 반환하는 함수
  const getPageCount = () => Math.ceil(filteredFaqData.length / faqsPerPage);

  // 페이지 번호를 생성하는 함수
  const getPageNumbers = () => {
    const pageCount = getPageCount();
    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="faq-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div className="faq-set">
        {currentFaqs.map((item) => (
          <div key={item.id} className="faq-item">
            <h3 onClick={() => handleQuestionClick(item.id)}>Q. {item.질문}</h3>
            {selectedQuestion === item.id && (
              <p className="answer">A. {item.답변}</p>
            )}
          </div>
        ))}
      </div>
      {/* 페이지네이션 */}
      <div className="pagination">
        {getPageNumbers().map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
