import React from "react";
import MainPage from "./pages/main/main";

function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
/*
// App.js
import React, { useState } from "react";
import LoginPage from "./pages/login/login";
import MainPage from "./pages/main/main";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // 더미 데이터 설정
  const dummyUsers = [
    {
      username: "user1",
      name: "John Doe",
      carNumber: "ABC123",
      email: "user1@example.com",
      password: "password1",
      role: "user",
    },
    {
      username: "admin",
      name: "Admin User",
      carNumber: "ADMIN001",
      email: "admin@example.com",
      password: "admin",
      role: "admin",
    },
  ];

  // 로그인 함수
  const handleLogin = (email, password) => {
    const user = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      // 인증 성공 시 로그인한 사용자 정보 저장
      setLoggedInUser(user);
      // 로컬 스토리지에 사용자 정보 저장
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    } else {
      alert("Invalid username or password");
    }
  };

  // 로그아웃 함수
  const handleLogout = () => {
    // 로그아웃 시 로그인한 사용자 정보 제거
    setLoggedInUser(null);
    // 로컬 스토리지에서 사용자 정보 제거
    localStorage.removeItem("loggedInUser");
  };

  return (
    <div>
      {loggedInUser ? (
        <div>
          <p>
            Welcome, {loggedInUser.name}! You are logged in as{" "}
            {loggedInUser.role}.
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
*/
