import { useState } from "react";

const videos = [
  {
    id: "v1",
    title: "How I Learned React in 30 Days",
    thumbBg: "linear-gradient(135deg,#7c5cfc,#c084fc)",
    viewsDropPct: 72,
    confidence: 87,
    reasons: [
      {
        ramp: "blue",
        icon: "thumbnail",
        title: "Thumbnail less engaging",
        detail: "CTR dropped below your 4% average.",
        fix: "Try a higher-contrast thumbnail with a close-up face and bold 3-4 word text. Videos with faces in the thumbnail average 18% higher CTR on this channel.",
      },
      {
        ramp: "purple",
        icon: "schedule",
        title: "Uploaded outside audience active hours",
        detail: "Uploaded at 9 AM. Audience active at 7 PM.",
        fix: "Schedule your next 3 uploads for 6:30-7:00 PM IST, when your audience activity peaks based on past watch-time data.",
      },
      {
        ramp: "coral",
        icon: "retention",
        title: "First 30 seconds retention dropped",
        detail: "45% of viewers left before 0:30.",
        fix: "Open with the result or payoff before the intro. Cut any channel branding intro longer than 3 seconds.",
      },
      {
        ramp: "teal",
        icon: "topic",
        title: "Topic saturation in niche",
        detail: "'Learn React' search volume is currently low.",
        fix: "Consider a more specific angle, e.g. 'React in 30 Days for Backend Devs' to reduce competition with broad tutorials.",
      },
    ],
  },
  {
    id: "v2",
    title: "5 VS Code Extensions You Need",
    thumbBg: "linear-gradient(135deg,#22c55e,#16a34a)",
    viewsDropPct: 38,
    confidence: 74,
    reasons: [
      {
        ramp: "purple",
        icon: "schedule",
        title: "Uploaded during a platform-wide low traffic window",
        detail: "Uploaded Sunday 11 PM, your lowest historical traffic slot.",
        fix: "Move uploads to Tuesday or Wednesday evening, your two strongest days by average views.",
      },
      {
        ramp: "teal",
        icon: "topic",
        title: "Similar video posted by a larger channel same week",
        detail: "A channel with 4x your subscribers covered this topic 2 days prior.",
        fix: "When close timing happens, lean into a differentiator in the title, e.g. naming your specific use case or stack.",
      },
    ],
  },
  {
    id: "v3",
    title: "Building a REST API with Node.js",
    thumbBg: "linear-gradient(135deg,#f59e0b,#ef4444)",
    viewsDropPct: 12,
    confidence: 56,
    reasons: [
      {
        ramp: "blue",
        icon: "thumbnail",
        title: "Thumbnail text may be too small on mobile",
        detail: "68% of your traffic is mobile; text under 40px tends to underperform.",
        fix: "Increase thumbnail text size and reduce word count to 3 words max for mobile legibility.",
      },
    ],
  },
];

const ICONS = {
  thumbnail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
    </svg>
  ),
  schedule: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M12 14v3l2 1" />
    </svg>
  ),
  retention: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  ),
  topic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 2 12l10 10 10-10z" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
};

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);
const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const ChevronIcon = ({ open }) => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .15s" }}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function Diagnosis({ onRecommend }) {
  const [activeVideoId, setActiveVideoId] = useState(videos[0].id);
  const [expandedReason, setExpandedReason] = useState(null);
  const [recommended, setRecommended] = useState(false);

  const video = videos.find((v) => v.id === activeVideoId) ?? videos[0];

  const toggleReason = (idx) => {
    setExpandedReason((cur) => (cur === idx ? null : idx));
  };

  const switchVideo = (id) => {
    setActiveVideoId(id);
    setExpandedReason(null);
    setRecommended(false);
  };

  const handleRecommend = () => {
    setRecommended(true);
    onRecommend?.(video);
  };

  return (
    <>
      <style>{`
        .dg-wrap{color:#e8e8f0;font-family:inherit}

        .dg-top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:22px;flex-wrap:wrap}
        .dg-title{font-size:24px;font-weight:700;color:#e8e8f0;margin-bottom:4px}
        .dg-subtitle{font-size:13.5px;color:#8585a0}
        .dg-subtitle strong{color:#b4b4c4;font-weight:500}

        .dg-video-picker{display:flex;gap:10px;overflow-x:auto;padding-bottom:6px;margin-bottom:26px;scrollbar-width:thin;scrollbar-color:#2a2a3d transparent}
        .dg-video-picker::-webkit-scrollbar{height:4px}
        .dg-video-picker::-webkit-scrollbar-thumb{background:#2a2a3d;border-radius:10px}
        .dg-video-chip{display:flex;align-items:center;gap:8px;background:#1e1e2d;border:1px solid #2a2a3d;border-radius:10px;padding:7px 12px 7px 7px;cursor:pointer;flex-shrink:0;transition:border-color .15s;font-family:inherit}
        .dg-video-chip:hover{border-color:#39394f}
        .dg-video-chip.active{border-color:#7c5cfc;background:rgba(124,92,252,.1)}
        .dg-video-thumb{width:30px;height:30px;border-radius:7px;flex-shrink:0}
        .dg-video-chip-title{font-size:12.5px;color:#e8e8f0;font-weight:500;white-space:nowrap;max-width:220px;overflow:hidden;text-overflow:ellipsis;text-align:left}
        .dg-video-chip-drop{font-size:10.5px;color:#8585a0;text-align:left}

        .dg-warning{background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.3);border-radius:12px;padding:16px 18px;margin-bottom:28px;display:flex;align-items:flex-start;gap:12px}
        .dg-warning-icon{width:36px;height:36px;border-radius:10px;background:rgba(245,166,35,.18);display:grid;place-items:center;flex-shrink:0;color:#f5a623}
        .dg-warning-icon svg{width:18px;height:18px}
        .dg-warning-title{color:#f5a623;font-weight:700;font-size:14.5px;margin-bottom:3px}
        .dg-warning-sub{color:#e0b066;font-size:12.5px}

        .dg-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
        .dg-section-title{font-size:15px;font-weight:700;color:#e8e8f0}
        .dg-confidence{background:rgba(239,68,68,.12);color:#f87171;border:1px solid rgba(239,68,68,.3);border-radius:20px;padding:4px 12px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:5px}
        .dg-confidence svg{width:13px;height:13px}

        .dg-reasons{display:flex;flex-direction:column;gap:10px;margin-bottom:32px}
        .dg-reason{background:#1e1e2d;border:1px solid #2a2a3d;border-radius:12px;transition:border-color .15s;overflow:hidden}
        .dg-reason:hover{border-color:#39394f}
        .dg-reason.expanded{border-color:#7c5cfc}
        .dg-reason-head{padding:16px 18px;display:flex;align-items:flex-start;gap:14px;cursor:pointer;width:100%;background:none;border:none;text-align:left;font-family:inherit;color:inherit}
        .dg-reason-icon{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;flex-shrink:0}
        .dg-reason-icon svg{width:18px;height:18px}
        .dg-reason-icon.r-blue{background:rgba(55,138,221,.15);color:#5b9fe8}
        .dg-reason-icon.r-purple{background:rgba(124,92,252,.15);color:#9d7ffe}
        .dg-reason-icon.r-coral{background:rgba(216,90,48,.15);color:#e08862}
        .dg-reason-icon.r-teal{background:rgba(29,158,117,.15);color:#3cc497}
        .dg-reason-body{flex:1;min-width:0}
        .dg-reason-title{font-weight:600;font-size:14px;color:#e8e8f0;margin-bottom:3px}
        .dg-reason-detail{color:#8585a0;font-size:12.5px;line-height:1.5}
        .dg-reason-chevron{color:#8585a0;flex-shrink:0;margin-top:2px}
        .dg-reason-chevron svg{width:16px;height:16px}
        .dg-reason-fix{padding:0 18px 16px 70px;font-size:12.5px;color:#b4b4c4;line-height:1.6}
        .dg-reason-fix-label{color:#9d7ffe;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.04em;display:block;margin-bottom:6px}

        .dg-actions{display:flex;justify-content:flex-end;align-items:center;gap:12px}
        .dg-recommended-note{font-size:12.5px;color:#22c55e;display:flex;align-items:center;gap:6px}
        .dg-recommended-note svg{width:15px;height:15px}
        .dg-btn-primary{background:#7c5cfc;color:#fff;border:none;border-radius:10px;padding:11px 22px;font-size:13.5px;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:8px;transition:background .15s}
        .dg-btn-primary:hover{background:#9d7ffe}
        .dg-btn-primary:disabled{background:#2a2a3d;color:#8585a0;cursor:default}
        .dg-btn-primary svg{width:16px;height:16px}
      `}</style>

      <div className="dg-wrap">
        <div className="dg-top">
          <div>
            <h1 className="dg-title">AI Performance Diagnosis</h1>
            <p className="dg-subtitle">Analysis for: <strong>"{video.title}"</strong></p>
          </div>
        </div>

        <div className="dg-video-picker">
          {videos.map((v) => (
            <button
              key={v.id}
              className={`dg-video-chip ${v.id === activeVideoId ? "active" : ""}`}
              onClick={() => switchVideo(v.id)}
            >
              <div className="dg-video-thumb" style={{ background: v.thumbBg }} />
              <div>
                <div className="dg-video-chip-title">{v.title}</div>
                <div className="dg-video-chip-drop">-{v.viewsDropPct}% views</div>
              </div>
            </button>
          ))}
        </div>

        <div className="dg-warning">
          <div className="dg-warning-icon">
            <AlertIcon />
          </div>
          <div>
            <div className="dg-warning-title">Performance drop detected</div>
            <div className="dg-warning-sub">Views decreased by {video.viewsDropPct}% compared to your last 5 uploads.</div>
          </div>
        </div>

        <div className="dg-section-header">
          <span className="dg-section-title">Possible Reasons</span>
          <span className="dg-confidence">
            <SparkleIcon />
            {video.confidence}% AI Confidence
          </span>
        </div>

        <div className="dg-reasons">
          {video.reasons.map((r, i) => {
            const isOpen = expandedReason === i;
            return (
              <div className={`dg-reason ${isOpen ? "expanded" : ""}`} key={i}>
                <button className="dg-reason-head" onClick={() => toggleReason(i)} aria-expanded={isOpen}>
                  <div className={`dg-reason-icon r-${r.ramp}`}>{ICONS[r.icon]}</div>
                  <div className="dg-reason-body">
                    <div className="dg-reason-title">{r.title}</div>
                    <div className="dg-reason-detail">{r.detail}</div>
                  </div>
                  <div className="dg-reason-chevron"><ChevronIcon open={isOpen} /></div>
                </button>
                {isOpen && (
                  <div className="dg-reason-fix">
                    <span className="dg-reason-fix-label">Suggested fix</span>
                    {r.fix}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="dg-actions">
          {recommended && (
            <span className="dg-recommended-note">
              <CheckIcon /> Recommendations generated
            </span>
          )}
          <button className="dg-btn-primary" onClick={handleRecommend} disabled={recommended}>
            {recommended ? "Recommendations ready" : "Get Growth Recommendations"}
            {!recommended && <ArrowIcon />}
          </button>
        </div>
      </div>
    </>
  );
}