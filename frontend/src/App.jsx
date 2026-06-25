import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Diagnosis from "./components/Diagnosis";
import Recommendations from "./components/Recommendations";
import Mentors from "./components/Mentors";
import CreatorScore from "./components/CreatorScore";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-text">Creator Pulse AI</span>
        </div>

        <nav>
          <button
            className={`nav-item ${page === "dashboard" ? "active" : ""}`}
            onClick={() => setPage("dashboard")}
          >
            <span className="nav-icon">⊞</span>
            Dashboard
          </button>

          <button
            className={`nav-item ${page === "diagnosis" ? "active" : ""}`}
            onClick={() => setPage("diagnosis")}
          >
            <span className="nav-icon">∿</span>
            AI Diagnosis
          </button>

          <button
            className={`nav-item ${
              page === "recommendations" ? "active" : ""
            }`}
            onClick={() => setPage("recommendations")}
          >
            <span className="nav-icon">💡</span>
            Recommendations
          </button>

          <button
            className={`nav-item ${page === "mentors" ? "active" : ""}`}
            onClick={() => setPage("mentors")}
          >
            <span className="nav-icon">👤</span>
            Mentors
          </button>

          <button
            className={`nav-item ${page === "score" ? "active" : ""}`}
            onClick={() => setPage("score")}
          >
            <span className="nav-icon">🏆</span>
            Creator Pulse Score
          </button>
        </nav>

        <div className="user-info">
          <div className="user-avatar">U</div>
          <span>User</span>
        </div>
      </aside>

      <main className="main-content">
        {page === "dashboard" && (
          <Dashboard onAnalyze={() => setPage("diagnosis")} />
        )}

        {page === "diagnosis" && (
          <Diagnosis onRecommend={() => setPage("recommendations")} />
        )}

        {page === "recommendations" && (
          <Recommendations onMentor={() => setPage("mentors")} />
        )}

        {page === "mentors" && <Mentors />}

        {page === "score" && <CreatorScore />}
      </main>
    </div>
  );
}