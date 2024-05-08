import React from "react";
import "./successModal.css";

const SuccessModal = ({ successMessage, onClose }) => {
  return (
    <div className="success-modal-overlay">
      <div className="success-modal">
        <h3>Success</h3>
        <p className="success-message">{successMessage}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default SuccessModal;
