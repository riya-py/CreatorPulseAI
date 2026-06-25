import { useState } from "react";

// Same data-shape the original Dashboard used — kept intact so this drops
// into the existing app without changing how it's wired up.
const stats = [
  {
    label: "Total Views",
    icon: "↗",
    iconBg: "rgba(124,92,252,.18)",
    iconColor: "#9d7ffe",
    value: "22,400",
    trend: "+12% from last month",
    up: true,
  },
  {
    label: "CTR",
    icon: "✦",
    iconBg: "rgba(245,166,35,.18)",
    iconColor: "#f5a623",
    value: "3.1%",
    trend: "-0.4% from last month",
    up: false,
  },
  {
    label: "Average Watch Time",
    icon: "🕐",
    iconBg: "rgba(14,165,233,.18)",
    iconColor: "#38bdf8",
    value: "2m 45s",
    trend: "+5s from last month",
    up: true,
  },
  {
    label: "Subscribers Gained",
    icon: "👥",
    iconBg: "rgba(34,197,94,.18)",
    iconColor: "#22c55e",
    value: "+143",
    trend: "+24 from last month",
    up: true,
  },
];

const videos = [
  {
    title: "How I Learned React in 30 Days",
    views: "1.2k",
    ctr: "2.1%",
    status: "underperforming",
    grad: "linear-gradient(135deg,#ef4444,#dc2626)",
  },
  {
    title: "5 Editing Tricks Every Creator Needs",
    views: "48.6k",
    ctr: "9.4%",
    status: "top",
    grad: "linear-gradient(135deg,#22c55e,#16a34a)",
  },
];

function VideoThumb({ grad }) {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: "12px",
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        background: grad,
        boxShadow: "0 0 0 2px #16161f, 0 0 0 3.5px rgba(255,255,255,0.14)",
        position: "relative",
      }}
    >
      <span style={{ color: "#fff", fontSize: 18, textShadow: "0 1px 2px rgba(0,0,0,0.25)" }}>▶</span>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "12px",
          background: "linear-gradient(160deg, rgba(255,255,255,0.22), transparent 55%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function Dashboard({ onAnalyze = () => {} }) {
  const [analyzing, setAnalyzing] = useState(null);

  const handleAnalyze = (video) => {
    setAnalyzing(video.title);
    onAnalyze(video);
  };

  return (
    <>
      <style>{`
        .db-wrap{font-family:inherit;color:#e8e8f0}
        .db-title{font-size:32px;font-weight:700;margin-bottom:4px;color:#e8e8f0}
        .db-subtitle{color:#8585a0;margin-bottom:32px;font-size:14px}

        .db-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:40px}
        @media(max-width:900px){.db-stats-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:520px){.db-stats-grid{grid-template-columns:1fr}}

        .db-stat-card{background:#1e1e2d;border:1px solid #2a2a3d;border-radius:14px;padding:20px;transition:border-color .2s,transform .2s}
        .db-stat-card:hover{border-color:#7c5cfc;transform:translateY(-2px)}
        .db-stat-top{display:flex;align-items:center;justify-content:space-between}
        .db-stat-label{color:#8585a0;font-size:13px;font-weight:500}
        .db-stat-icon{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;font-size:14px;flex-shrink:0}
        .db-stat-value{font-size:28px;font-weight:700;margin:14px 0 4px;color:#e8e8f0}
        .db-stat-trend{font-size:12.5px;font-weight:500;display:flex;align-items:center;gap:4px}
        .trend-up{color:#22c55e}
        .trend-down{color:#f87171}

        .db-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
        .db-section-title{font-size:20px;font-weight:700;color:#e8e8f0}
        .db-view-all{color:#9d7ffe;font-size:12.5px;cursor:pointer;text-decoration:none}

        .db-video-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        @media(max-width:760px){.db-video-grid{grid-template-columns:1fr}}

        .db-video-card{background:#1e1e2d;border:1px solid #2a2a3d;border-radius:12px;padding:18px 20px;display:flex;flex-direction:column;gap:14px;transition:border-color .2s,transform .2s}
        .db-video-card:hover{border-color:#7c5cfc;transform:translateY(-2px)}
        .db-video-card.is-warn{border-color:rgba(239,68,68,.35)}

        .db-video-top{display:flex;align-items:flex-start;gap:14px}
        .db-video-body{flex:1;min-width:0}

        .db-video-badge{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;font-weight:600;padding:3px 10px;border-radius:20px;margin-bottom:8px}
        .badge-underperform{background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.3)}
        .badge-top{background:rgba(34,197,94,.15);color:#22c55e;border:1px solid rgba(34,197,94,.3)}

        .db-video-title{font-size:15px;font-weight:700;margin-bottom:6px;color:#e8e8f0;line-height:1.3}
        .db-video-meta{color:#8585a0;font-size:13px}

        .db-btn-analyze{width:100%;background:#ef4444;color:#fff;border:none;border-radius:9px;padding:10px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .15s}
        .db-btn-analyze:hover{background:#dc2626}
        .db-btn-analyze:disabled{background:#2a2a3d;color:#8585a0;cursor:default}

        .db-btn-insights{width:100%;background:rgba(34,197,94,.15);border:1px solid #22c55e;color:#22c55e;border-radius:9px;padding:10px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .15s}
        .db-btn-insights:hover{background:rgba(34,197,94,.25)}
      `}</style>

      <div className="db-wrap">
        <h1 className="db-title">Dashboard</h1>
        <p className="db-subtitle">Welcome back, User!</p>

        {/* Stats Cards */}
        <div className="db-stats-grid">
          {stats.map((s, i) => (
            <div className="db-stat-card" key={i}>
              <div className="db-stat-top">
                <span className="db-stat-label">{s.label}</span>
                <span className="db-stat-icon" style={{ background: s.iconBg, color: s.iconColor }}>
                  {s.icon}
                </span>
              </div>
              <div className="db-stat-value">{s.value}</div>
              <div className={`db-stat-trend ${s.up ? "trend-up" : "trend-down"}`}>
                {s.up ? "↑" : "↓"} {s.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Video Performance */}
        <div className="db-section-header">
          <span className="db-section-title">Recent Video Performance</span>
          <a className="db-view-all" href="#" onClick={(e) => e.preventDefault()}>
            View all videos →
          </a>
        </div>

        <div className="db-video-grid">
          {videos.map((v, i) => {
            const isWarn = v.status === "underperforming";
            return (
              <div className={`db-video-card ${isWarn ? "is-warn" : ""}`} key={i}>
                <div className="db-video-top">
                  <VideoThumb grad={v.grad} />
                  <div className="db-video-body">
                    <span className={`db-video-badge ${isWarn ? "badge-underperform" : "badge-top"}`}>
                      {isWarn ? "⚠ Underperforming" : "★ Top Performer"}
                    </span>
                    <div className="db-video-title">{v.title}</div>
                    <div className="db-video-meta">
                      Views: {v.views} &nbsp;•&nbsp; CTR: {v.ctr}
                    </div>
                  </div>
                </div>

                {isWarn ? (
                  <button
                    className="db-btn-analyze"
                    disabled={analyzing === v.title}
                    onClick={() => handleAnalyze(v)}
                  >
                    {analyzing === v.title ? "Analyzing…" : "Analyze Performance"}
                  </button>
                ) : (
                  <button className="db-btn-insights" onClick={() => handleAnalyze(v)}>
                    View Insights
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}