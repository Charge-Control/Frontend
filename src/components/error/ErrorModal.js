import React from "react";
import "./errorModal.css";

const ErrorModal = ({ errorMessage, onClose }) => {
  return (
    <div className="error-modal-overlay">
      <div className="error-modal">
        <h3>Error</h3>
        <p className="error-message">{errorMessage}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default ErrorModal;
