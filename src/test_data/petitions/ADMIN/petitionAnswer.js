import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./petitionanswer.css";

/*test: petitioin-answer*/

const PetitionAnswer = () => {
  const [petition, setPetition] = useState(null);
  const [answer, setAnswer] = useState(""); // State to hold the answer text
  const { id } = useParams();

  useEffect(() => {
    const fetchPetitionDetail = async () => {
      try {
        const response = await fetch(`/petition_test.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch petition detail");
        }
        const data = await response.json();
        setPetition(data);
      } catch (error) {
        console.error("Error fetching petition detail:", error);
      }
    };

    fetchPetitionDetail();
  }, [id]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    // Implement your logic here to submit the answer
    console.log("Submitting answer:", answer);
    // You can send the answer to the server or handle it in any other way
    // For now, let's just clear the answer field
    setAnswer("");
  };

  if (!petition) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="petitionDetail">
      <h2 className="title">Petition Detail</h2>
      <p className="id-item">글 번호: {petition.id}</p>
      <p className="title-item">글 제목: {petition["글 제목"]}</p>
      <p className="username-item">작성자: {petition["사용자 이름"]}</p>
      <p className="carnum-item">차량 번호: {petition["차량 번호"]}</p>
      <p className="text-item">내용: {petition["글 내용"]}</p>

      {/* Answer Input Field */}
      <div className="answer-section">
        <textarea
          className="answer-input"
          placeholder="답변을 입력하세요..."
          value={answer}
          onChange={handleAnswerChange}
        />
        <button className="submit-answer-btn" onClick={handleSubmitAnswer}>
          답변하기
        </button>
      </div>
    </div>
  );
};

export default PetitionAnswer;
