import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("mentee");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!email.trim() || !password.trim()) { setError("Please fill in all fields."); return; }
    if (mode === "signup" && !name.trim()) { setError("Please enter your name."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const body = mode === "login" ? { email, password } : { name, email, password, role };
      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Something went wrong."); return; }
      localStorage.setItem("cp_token", data.token);
      onAuth(data.user);
    } catch {
      setError("Network error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif", padding: "2rem" }}>
      <div style={{ position: "fixed", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,93,58,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: "440px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", marginBottom: "2.5rem" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: "linear-gradient(135deg,#ff5d3a,#e8472a)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(255,93,58,0.3)" }}>
            <i className="ti ti-video" style={{ fontSize: "20px", color: "#fff" }} />
          </div>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "20px", fontWeight: "700", color: "var(--text)", letterSpacing: "-0.02em" }}>Creator Pulse AI</span>
        </div>

        <div style={{ background: "var(--panel)", border: "1px solid var(--border-soft)", borderRadius: "20px", padding: "32px", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
          {/* Tab switcher */}
          <div style={{ display: "flex", background: "var(--panel-2)", borderRadius: "11px", padding: "4px", marginBottom: "28px" }}>
            {["login", "signup"].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }} style={{
                flex: 1, padding: "9px", borderRadius: "8px", border: "none", cursor: "pointer",
                fontSize: "13.5px", fontWeight: "600", fontFamily: "'Space Grotesk',sans-serif",
                letterSpacing: "-0.01em", transition: "all 0.18s",
                background: mode === m ? "var(--panel)" : "transparent",
                color: mode === m ? "var(--text)" : "var(--text-dim)",
                boxShadow: mode === m ? "0 2px 8px rgba(0,0,0,0.25)" : "none",
              }}>
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "24px", fontWeight: "700", letterSpacing: "-0.03em", margin: "0 0 5px", color: "var(--text)" }}>
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p style={{ fontSize: "13.5px", color: "var(--text-dim)", margin: 0 }}>
              {mode === "login" ? "Log in to your Creator Pulse account." : "Start your creator journey today."}
            </p>
          </div>

          {/* Role picker (signup only) */}
          {mode === "signup" && (
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>I am a</label>
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { key: "mentee", icon: "ti-sparkles", label: "Creator / Mentee", desc: "Get AI insights & mentorship" },
                  { key: "mentor", icon: "ti-school", label: "Mentor", desc: "Guide & coach creators" },
                ].map(r => (
                  <button key={r.key} onClick={() => setRole(r.key)} style={{
                    flex: 1, padding: "14px 12px", borderRadius: "12px",
                    border: role === r.key ? "1.5px solid var(--coral)" : "1.5px solid var(--border)",
                    background: role === r.key ? "rgba(255,93,58,0.07)" : "var(--panel-2)",
                    cursor: "pointer", textAlign: "left", transition: "all 0.15s"
                  }}>
                    <i className={`ti ${r.icon}`} style={{ fontSize: "18px", color: role === r.key ? "var(--coral)" : "var(--text-faint)", display: "block", marginBottom: "8px" }} />
                    <div style={{ fontSize: "13px", fontWeight: "700", color: role === r.key ? "var(--text)" : "var(--text-dim)", fontFamily: "'Space Grotesk',sans-serif", marginBottom: "3px" }}>{r.label}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-faint)", lineHeight: 1.4 }}>{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
            {mode === "signup" && (
              <div>
                <label style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>Full name</label>
                <div style={{ position: "relative" }}>
                  <i className="ti ti-user" style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", color: "var(--text-faint)" }} />
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ width: "100%", paddingLeft: "38px" }} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
                </div>
              </div>
            )}
            <div>
              <label style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>Email</label>
              <div style={{ position: "relative" }}>
                <i className="ti ti-mail" style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", color: "var(--text-faint)" }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: "100%", paddingLeft: "38px" }} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>Password</label>
              <div style={{ position: "relative" }}>
                <i className="ti ti-lock" style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", color: "var(--text-faint)" }} />
                <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" style={{ width: "100%", paddingLeft: "38px", paddingRight: "40px" }} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
                <button onClick={() => setShowPass(p => !p)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-faint)", padding: 0, display: "flex" }}>
                  <i className={`ti ${showPass ? "ti-eye-off" : "ti-eye"}`} style={{ fontSize: "16px" }} />
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", borderRadius: "9px", background: "rgba(255,93,58,0.1)", border: "1px solid rgba(255,93,58,0.25)", marginBottom: "16px" }}>
              <i className="ti ti-alert-circle" style={{ fontSize: "15px", color: "var(--coral)", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", color: "var(--coral)" }}>{error}</span>
            </div>
          )}

          <button className="btn-red" onClick={handleSubmit} disabled={loading} style={{ width: "100%", justifyContent: "center", display: "flex", alignItems: "center", gap: "8px", padding: "14px", fontSize: "15px" }}>
            {loading ? <><i className="ti ti-loader-2" style={{ animation: "spin 1s linear infinite" }} /> {mode === "login" ? "Logging in..." : "Creating account..."}</> : mode === "login" ? <><i className="ti ti-login" /> Log in</> : <><i className="ti ti-user-plus" /> Create account</>}
          </button>

          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "var(--text-faint)", marginTop: "20px" }}>
          By continuing you agree to our Terms &amp; Privacy Policy.
        </p>
      </div>
    </div>
  );
}