import React, { useState } from "react";

export default function FestiveAuth() {
  const [activeTab, setActiveTab] = useState("login");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "login") {
      alert(`Logging in with ${form.email}`);
    } else {
      alert(`Registering with ${form.email}`);
    }
  };

  return (
    <div className="festive-root">
      {/* Main card */}
      <main className="card-wrap" role="main">
        <div className="card">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`tab ${activeTab === "register" ? "active" : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          <h1 className="title">
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </h1>

          <form className="form" onSubmit={handleSubmit}>
            <label className="field" htmlFor="email">
              <input
                id="email"
                className="input"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>

            <label className="field" htmlFor="password">
              <input
                id="password"
                className="input"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </label>

            {activeTab === "register" && (
              <label className="field" htmlFor="confirm-password">
                <input
                  id="confirm-password"
                  className="input"
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </label>
            )}

            <div className="btn-container">
              <button type="submit" className="btn">
                {activeTab === "login" ? "Login" : "Register"}
              </button>
            </div>

            <p className="muted">
              {activeTab === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <a
                href="#"
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(activeTab === "login" ? "register" : "login");
                }}
              >
                {activeTab === "login" ? "Register" : "Login"}
              </a>
            </p>
          </form>
        </div>
      </main>

      {/* Styles */}
      <style>{`
        /* Root layout with festive background */
        .festive-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url("/images/festival.png") no-repeat center center fixed;
          background-size: cover;
          position: relative;
          overflow: hidden;
          font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          color: #2b2b2b;
        }

        /* Overlay to make card visible */
        .festive-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          z-index: 0;
        }

        .card-wrap {
          z-index: 1;
          width: 100%;
          max-width: 420px;
          padding: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card {
          width: 100%;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          padding: 28px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.35);
          backdrop-filter: blur(10px) saturate(120%);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
        }

        .tabs {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 8px;
        }

        .tab {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.9);
          padding: 8px 16px;
          border-radius: 999px;
          font-weight: 600;
          cursor: pointer;
        }

        .tab.active {
          background: rgba(255,255,255,0.2);
          box-shadow: inset 0 -2px 0 rgba(255,255,255,0.1);
        }

        .title {
          text-align: center;
          margin: 8px 0 18px;
          font-size: 1.6rem;
          color: #fff8ee;
          text-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }

        .form { display: flex; flex-direction: column; gap: 12px; }

        .field { display: block; width: 100%; }

        .input {
          width: 100%;
          padding: 12px 10px;
          border-radius: 12px;
          border: none;
          outline: none;
          font-size: 0.95rem;
          background: rgba(255,255,255,0.9);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          color: #2b2b2b;
        }

        .btn-container {
          display: flex;
          justify-content: center;
        }

        .btn {
          width: 150px;
          padding: 12px 14px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          font-size: 1rem;
          background: linear-gradient(90deg, #ffd54f 0%, #ff8a65 50%, #ff6e40 100%);
          color: #2b2b2b;
          box-shadow: 0 6px 16px rgba(0,0,0,0.25);
          text-align: center;
          transition: transform 160ms ease, box-shadow 160ms ease;
        }
        .btn:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,0.3); }

        .muted {
          text-align: center;
          margin-top: 6px;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.85);
        }
        .link { color: #fff8e6; text-decoration: underline; }

        @media (max-width: 520px) {
          .card-wrap { padding: 18px; }
          .card { padding: 20px; border-radius: 14px; }
        }
      `}</style>
    </div>
  );
}



