import { useState } from "react";

const actions = [
  {
    id: "thumbnail",
    ramp: "green",
    impact: "High Impact",
    title: "Improve Thumbnail",
    desc: "Use larger text and higher contrast.",
    detail: "Test a close-up face with bold 3-4 word text. On this channel, high-contrast thumbnails with faces average 18% higher CTR.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
      </svg>
    ),
  },
  {
    id: "upload-time",
    ramp: "amber",
    impact: "Medium Impact",
    title: "Change Upload Time",
    desc: "Best audience activity: 7 PM – 10 PM",
    detail: "Shift your next 3 uploads into this window. Your last 10 videos uploaded outside it underperformed by an average of 31%.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M12 14v3l2 1" />
      </svg>
    ),
  },
  {
    id: "hook",
    ramp: "green",
    impact: "High Impact",
    title: "Stronger Hook",
    desc: "Ask a question in first 5 seconds.",
    detail: "Open on the question your title promises to answer, before any branding or intro. This typically lifts 30-second retention.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="6 3 20 12 6 21 6 3" />
      </svg>
    ),
  },
  {
    id: "trending-topic",
    ramp: "green",
    impact: "High Impact",
    title: "Trending Topic Suggestion",
    desc: "React Projects for Placement Season",
    detail: "Search interest for this angle is rising in your niche right now. Consider it for your next 1-2 uploads while demand is high.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Recommendations({ onMentor }) {
  const [applied, setApplied] = useState({});
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded((cur) => (cur === id ? null : id));
  };

  const toggleApplied = (id, e) => {
    e.stopPropagation();
    setApplied((cur) => ({ ...cur, [id]: !cur[id] }));
  };

  const appliedCount = Object.values(applied).filter(Boolean).length;

  return (
    <>
      <style>{`
        .rc-wrap{color:#e8e8f0;font-family:inherit}
        .rc-title{font-size:24px;font-weight:700;color:#e8e8f0;margin-bottom:4px}
        .rc-subtitle{font-size:13.5px;color:#8585a0;margin-bottom:8px}

        .rc-progress{display:flex;align-items:center;gap:10px;margin-bottom:28px}
        .rc-progress-track{flex:1;max-width:220px;height:6px;background:#1e1e2d;border:1px solid #2a2a3d;border-radius:10px;overflow:hidden}
        .rc-progress-fill{height:100%;background:#22c55e;border-radius:10px;transition:width .25s ease}
        .rc-progress-label{font-size:12px;color:#8585a0;white-space:nowrap}

        .rc-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:36px}
        @media(max-width:560px){.rc-grid{grid-template-columns:1fr}}

        .rc-card{background:#1e1e2d;border:1px solid #2a2a3d;border-radius:14px;padding:20px;position:relative;cursor:pointer;transition:border-color .15s,transform .15s}
        .rc-card:hover{border-color:#39394f;transform:translateY(-1px)}
        .rc-card.expanded{border-color:#7c5cfc}
        .rc-card.is-applied{border-color:rgba(34,197,94,.4);background:rgba(34,197,94,.05)}

        .rc-icon{width:42px;height:42px;border-radius:11px;display:grid;place-items:center;margin-bottom:16px}
        .rc-icon svg{width:20px;height:20px}
        .rc-icon.r-green{background:rgba(34,197,94,.15);color:#22c55e}
        .rc-icon.r-amber{background:rgba(245,166,35,.15);color:#f5a623}

        .rc-pill{position:absolute;top:20px;right:20px;border-radius:20px;padding:4px 12px;font-size:11.5px;font-weight:600}
        .rc-pill.r-green{background:rgba(34,197,94,.15);color:#22c55e;border:1px solid rgba(34,197,94,.3)}
        .rc-pill.r-amber{background:rgba(245,166,35,.15);color:#f5a623;border:1px solid rgba(245,166,35,.3)}

        .rc-card-title{font-weight:600;font-size:15.5px;color:#e8e8f0;margin-bottom:6px;padding-right:90px}
        .rc-card-desc{color:#8585a0;font-size:13px;line-height:1.5}

        .rc-detail{margin-top:14px;padding-top:14px;border-top:1px solid #2a2a3d;font-size:12.5px;color:#b4b4c4;line-height:1.6}
        .rc-detail-label{color:#9d7ffe;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.04em;display:block;margin-bottom:6px}

        .rc-card-footer{display:flex;justify-content:flex-end;margin-top:16px}
        .rc-mark-btn{display:flex;align-items:center;gap:6px;background:#16161f;border:1px solid #2a2a3d;color:#b4b4c4;font-size:12px;font-weight:600;padding:7px 12px;border-radius:8px;cursor:pointer;font-family:inherit;transition:all .15s}
        .rc-mark-btn:hover{border-color:#7c5cfc;color:#9d7ffe}
        .rc-mark-btn.is-done{background:rgba(34,197,94,.12);border-color:rgba(34,197,94,.4);color:#22c55e}
        .rc-mark-btn svg{width:14px;height:14px}

        .rc-cta{text-align:center;background:#1e1e2d;border:1px solid #2a2a3d;border-radius:14px;padding:28px 20px}
        .rc-cta p{color:#8585a0;font-size:14px;margin-bottom:16px}
        .rc-btn-primary{background:#7c5cfc;color:#fff;border:none;border-radius:10px;padding:11px 24px;font-size:13.5px;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:8px;transition:background .15s}
        .rc-btn-primary:hover{background:#9d7ffe}
        .rc-btn-primary svg{width:16px;height:16px}
      `}</style>

      <div className="rc-wrap">
        <h1 className="rc-title">Recommended Actions</h1>
        <p className="rc-subtitle">Actionable steps to improve your performance.</p>

        <div className="rc-progress">
          <div className="rc-progress-track">
            <div
              className="rc-progress-fill"
              style={{ width: `${(appliedCount / actions.length) * 100}%` }}
            />
          </div>
          <span className="rc-progress-label">{appliedCount} of {actions.length} marked done</span>
        </div>

        <div className="rc-grid">
          {actions.map((a) => {
            const isOpen = expanded === a.id;
            const isDone = !!applied[a.id];
            return (
              <div
                className={`rc-card ${isOpen ? "expanded" : ""} ${isDone ? "is-applied" : ""}`}
                key={a.id}
                onClick={() => toggleExpand(a.id)}
              >
                <span className={`rc-pill r-${a.ramp}`}>{a.impact}</span>

                <div className={`rc-icon r-${a.ramp}`}>{a.icon}</div>

                <div className="rc-card-title">{a.title}</div>
                <div className="rc-card-desc">{a.desc}</div>

                {isOpen && (
                  <div className="rc-detail">
                    <span className="rc-detail-label">How to do this</span>
                    {a.detail}
                  </div>
                )}

                <div className="rc-card-footer">
                  <button
                    className={`rc-mark-btn ${isDone ? "is-done" : ""}`}
                    onClick={(e) => toggleApplied(a.id, e)}
                  >
                    <CheckIcon />
                    {isDone ? "Marked done" : "Mark as done"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rc-cta">
          <p>Need personalized help implementing these?</p>
          <button className="rc-btn-primary" onClick={onMentor}>
            Connect with Mentor
            <ArrowIcon />
          </button>
        </div>
      </div>
    </>
  );
}