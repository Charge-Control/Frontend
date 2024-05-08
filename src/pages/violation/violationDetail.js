// violationDetail.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViolationDetail = () => {
  const [violation, setViolation] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchViolationDetail = async () => {
      try {
        const response = await fetch(`/violation_test.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch violation detail");
        }
        const data = await response.json();
        const foundViolation = data.find((violation) => violation.id === id);
        setViolation(foundViolation);
      } catch (error) {
        console.error("Error fetching violation detail:", error);
      }
    };

    fetchViolationDetail();
  }, [id]);

  if (!violation) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="violationDetail">
      <h2>Violation Detail</h2>
      <p>차량 번호: {violation && violation["차량번호"]}</p>
      <p>날짜 및 시간: {violation && violation["날짜_시간"]}</p>
      <p>위반 내용: {violation && violation["위반_내역"]}</p>
      {violation.imagePath && (
        <div className="violationImageContainer">
          <img
            src={violation.imagePath}
            alt="Violation"
            className="violationImage"
          />
        </div>
      )}
    </div>
  );
};

export default ViolationDetail;
