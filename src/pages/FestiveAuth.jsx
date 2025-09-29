import React, { useState } from "react";

export default function FestiveAuth() {
  const [activeTab, setActiveTab] = useState("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    fullName: "",
    gender: "",
  });

  // "Database" in memory (replace with API later)
  const [users, setUsers] = useState([
    { email: "user1@example.com", username: "user1", password: "1234" },
    { email: "test@test.com", username: "testuser", password: "abcd" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab === "login") {
      const existingUser = users.find(
        (u) => u.email === form.email && u.password === form.password
      );
      if (existingUser) {
        alert(`✅ Welcome back, ${existingUser.username}!`);
      } else {
        alert("❌ Invalid credentials or account not found.");
      }
    } else {
      // REGISTER flow
      const emailExists = users.some((u) => u.email === form.email);
      const usernameExists = users.some((u) => u.username === form.username);

      if (emailExists) {
        alert("❌ Email already exists. Please use another one.");
        return;
      }
      if (usernameExists) {
        alert("❌ Username already exists. Please choose another.");
        return;
      }

      // New user → Save to state (mock DB)
      const newUser = {
        email: form.email,
        password: form.password,
        username: form.username,
        phone: form.phone,
        fullName: form.fullName,
        gender: form.gender,
      };
      setUsers([...users, newUser]);

      alert(`🎉 Registration successful! Welcome To AnandUtsav, ${form.fullName}`);
      setActiveTab("login"); // redirect back to login
      setForm({
        email: "",
        password: "",
        username: "",
        phone: "",
        fullName: "",
        gender: "",
      });
    }
  };

  return (
    <div className="festive-root">
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
            {activeTab === "register" && (
              <>
                <label className="field" htmlFor="username">
                  <input
                    id="username"
                    className="input"
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    required
                  />
                </label>

                <label className="field" htmlFor="fullName">
                  <input
                    id="fullName"
                    className="input"
                    type="text"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    required
                  />
                </label>

                <label className="field" htmlFor="phone">
                  <input
                    id="phone"
                    className="input"
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    required
                  />
                </label>

                <label className="field" htmlFor="gender">
                  <select
                    id="gender"
                    className="input"
                    value={form.gender}
                    onChange={(e) =>
                      setForm({ ...form, gender: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </>
            )}

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
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </label>

            <div className="btn-container">
              <button type="submit" className="btn">
                {activeTab === "login" ? "Login" : "Register"}
              </button>
            </div>
          </form>

          {/* 👇 Added feature here */}
          {activeTab === "login" ? (
            <p className="muted">
              Don’t have an account?{" "}
              <button
                className="link"
                onClick={() => setActiveTab("register")}
              >
                Register
              </button>
            </p>
          ) : (
            <p className="muted">
              Already have an account?{" "}
              <button
                className="link"
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
            </p>
          )}
        </div>
      </main>

      <style>{`
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
          max-width: 440px;
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

        .btn-container { display: flex; justify-content: center; }

        .btn {
          width: 160px;
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
          margin-top: 10px;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.85);
        }

        .link {
          background: none;
          border: none;
          color: #fff8e6;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
        }

        @media (max-width: 520px) {
          .card-wrap { padding: 18px; }
          .card { padding: 20px; border-radius: 14px; }
        }
      `}</style>
    </div>
  );
}





