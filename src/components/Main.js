import React from "react";
import ReactDOM from "react-dom";
import "./../style/MainStyle.css";

const MainPage = () => {
  return (
    <div className="container">
      <div>
        <img
          src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
        />
      </div>
      <div className="content">
        <div className="title title-dark">
          전기차 충전소 관리를
          <br />더 효율적으로
        </div>
        <div className="title title-light">
          전기차 충전소 관리를
          <br />더 효율적으로
        </div>
        <div className="subtitle subtitle-dark">Charge Control</div>
        <div className="subtitle subtitle-light">Charge Control</div>
      </div>
    </div>
  );
};

export default MainPage;

ReactDOM.render(<MainPage />, document.getElementById("root"));
