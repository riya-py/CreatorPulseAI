import { useState } from "react";

const mentors = [
  {
    name: "Gaurav Chaudhary",
    channelName: "Technical Guruji",
    niche: "Tech & Productivity",
    rating: 4.9,
    reviews: 312,
    sessions: 180,
    tag: "Tech & Gadget Reviews",
    badge: "Top Rated",
    badgeClass: "badge-top-rated",
    subscribers: "23.7M Subscribers",
    bio: "Tech reviewer and YouTube creator helping the next wave of creators build sustainable channels around honest product storytelling.",
    seed: "Gaurav-Chaudhary",
    grad: "linear-gradient(135deg,#7c5cfc,#c084fc)",
  },
  {
    name: "Shlok Srivastava",
    channelName: "Tech Burner",
    niche: "Tech & Productivity",
    rating: 4.8,
    reviews: 198,
    sessions: 140,
    tag: "Gadgets & Tech Hacks",
    badge: "Rising Star",
    badgeClass: "badge-rising",
    subscribers: "12.4M Subscribers",
    bio: "Known for sharp, high-energy tech content. Mentors creators on hooks, pacing, and building a recognizable on-screen identity.",
    seed: "Shlok-Srivastava",
    grad: "linear-gradient(135deg,#f59e0b,#ef4444)",
  },
  {
    name: "Pranjal Kamra",
    channelName: "Pranjal Kamra",
    niche: "Finance & Business",
    rating: 4.9,
    reviews: 276,
    sessions: 200,
    tag: "Stock Market & Finance",
    badge: "Top Mentor",
    badgeClass: "badge-top-mentor",
    subscribers: "9.1M Subscribers",
    bio: "Finance educator focused on making investing simple. Mentors creators on building trust and explaining complex topics simply.",
    seed: "Pranjal-Kamra",
    grad: "linear-gradient(135deg,#22c55e,#16a34a)",
  },
  {
    name: "Ranveer Allahbadia",
    channelName: "BeerBiceps",
    niche: "Lifestyle & Vlogs",
    rating: 4.7,
    reviews: 341,
    sessions: 220,
    tag: "Podcast & Lifestyle",
    badge: "Growth Hacker",
    badgeClass: "badge-growth",
    subscribers: "8.2M Subscribers",
    bio: "Podcast host and lifestyle creator. Mentors on long-form interview craft, guest booking, and building a personal brand.",
    seed: "Ranveer-Allahbadia",
    grad: "linear-gradient(135deg,#6366f1,#8b5cf6)",
  },
  {
    name: "Dhruv Rathee",
    channelName: "Dhruv Rathee",
    niche: "Education",
    rating: 5.0,
    reviews: 489,
    sessions: 310,
    tag: "Education & Awareness",
    badge: "Top Rated",
    badgeClass: "badge-top-rated",
    subscribers: "31.5M Subscribers",
    bio: "Educational creator covering social and political topics. Mentors on research-backed storytelling and structuring long explainers.",
    seed: "Dhruv-Rathee",
    grad: "linear-gradient(135deg,#ef4444,#dc2626)",
  },
  {
    name: "Ajay (Ajjubhai)",
    channelName: "Total Gaming",
    niche: "Gaming",
    rating: 4.8,
    reviews: 512,
    sessions: 180,
    tag: "Free Fire & Gaming",
    badge: "Growth Hacker",
    badgeClass: "badge-growth",
    subscribers: "38M Subscribers",
    bio: "One of India's biggest gaming creators. Mentors on livestream energy, consistency, and growing a gaming community.",
    seed: "Ajay-Ajjubhai",
    grad: "linear-gradient(135deg,#0ea5e9,#0284c7)",
  },
  {
    name: "Ajey Nagar",
    channelName: "CarryMinati",
    niche: "Shorts & Reels",
    rating: 4.9,
    reviews: 623,
    sessions: 95,
    tag: "Comedy & Roast",
    badge: "Top Mentor",
    badgeClass: "badge-top-mentor",
    subscribers: "45.2M Subscribers",
    bio: "Comedy creator known for sharp editing and roast culture. Mentors on short-form pacing, timing, and editing rhythm.",
    seed: "Ajey-Nagar",
    grad: "linear-gradient(135deg,#f59e0b,#d97706)",
  },
];

const recommended = [
  {
    name: "Sandeep Maheshwari",
    niche: "Motivation & Education",
    rating: 4.9,
    reviews: 402,
    grad: "linear-gradient(135deg,#22c55e,#16a34a)",
    seed: "Sandeep-Maheshwari",
  },
  {
    name: "Nikhil Kamath",
    niche: "Finance & Investing",
    rating: 4.8,
    reviews: 189,
    grad: "linear-gradient(135deg,#f59e0b,#d97706)",
    seed: "Nikhil-Kamath",
  },
  {
    name: "Bhuvan Bam",
    niche: "Comedy & Shorts",
    rating: 4.9,
    reviews: 534,
    grad: "linear-gradient(135deg,#ef4444,#dc2626)",
    seed: "Bhuvan-Bam",
  },
];

const slots = ["Mon 9 AM", "Mon 2 PM", "Tue 10 AM", "Wed 7 PM", "Thu 11 AM", "Fri 4 PM"];

// Backing data for "Your Mentor Journey" popups
const mySessions = [
  { mentorName: "Gaurav Chaudhary", seed: "Gaurav-Chaudhary", grad: "linear-gradient(135deg,#7c5cfc,#c084fc)", title: "YouTube Growth Strategy", date: "24 June 2026, 07:00 PM", status: "Upcoming" },
  { mentorName: "Pranjal Kamra", seed: "Pranjal-Kamra", grad: "linear-gradient(135deg,#22c55e,#16a34a)", title: "Monetization Roadmap Review", date: "18 June 2026, 06:00 PM", status: "Completed" },
  { mentorName: "Pranjal Kamra", seed: "Pranjal-Kamra", grad: "linear-gradient(135deg,#22c55e,#16a34a)", title: "Portfolio Diversification Q&A", date: "02 June 2026, 05:30 PM", status: "Completed" },
];

const activeMentorNames = ["Gaurav Chaudhary", "Pranjal Kamra"];

// Colorful initials-based avatar. No external network calls, so it never
// breaks or shows a broken-image icon — and it's styled to look intentional
// rather than like a generic placeholder.
function initialsFor(nameOrSeed = "") {
  const clean = nameOrSeed.replace(/[-_]/g, " ").trim();
  const parts = clean.split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return clean.slice(0, 2).toUpperCase();
}

function AvatarImg({ seed, name, initials, grad, size = 64 }) {
  const display = initials || initialsFor(name || seed);
  const background = grad || "linear-gradient(135deg,#7c5cfc,#c084fc)";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        position: "relative",
        display: "grid",
        placeItems: "center",
        background,
        boxShadow: "0 0 0 2px #16161f, 0 0 0 3.5px rgba(255,255,255,0.14)",
      }}
    >
      <span
        style={{
          fontWeight: 700,
          fontSize: size * 0.36,
          color: "#fff",
          letterSpacing: "0.02em",
          textShadow: "0 1px 2px rgba(0,0,0,0.25)",
          userSelect: "none",
        }}
      >
        {display}
      </span>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "linear-gradient(160deg, rgba(255,255,255,0.22), transparent 55%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function Mentors() {
  const [search, setSearch] = useState("");
  const [nicheFilter, setNicheFilter] = useState("");

  // Two independent modal modes: "profile" (view-only) and "booking" (slot picker)
  const [profileMentor, setProfileMentor] = useState(null);
  const [bookingMentor, setBookingMentor] = useState(null);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [confirmedSlot, setConfirmedSlot] = useState(null);
  const [booked, setBooked] = useState(false);

  // Generic list/info popup, used for journey-stat detail views and "view all" links.
  // { kind: "sessions" | "active-mentors" | "all-mentors" | "all-recommended", title }
  const [infoModal, setInfoModal] = useState(null);
  const closeInfo = () => setInfoModal(null);

  const filtered = mentors.filter((m) => {
    const matchQ =
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.niche.toLowerCase().includes(search.toLowerCase()) ||
      m.channelName.toLowerCase().includes(search.toLowerCase());
    const matchN = !nicheFilter || m.niche === nicheFilter;
    return matchQ && matchN;
  });

  const openProfile = (mentor) => setProfileMentor(mentor);
  const closeProfile = () => setProfileMentor(null);

  const openBooking = (mentor) => {
    setProfileMentor(null);
    setBookingMentor(mentor);
    setSelectedSlot(null);
    setConfirmedSlot(null);
    setBooked(false);
  };
  const closeBooking = () => setBookingMentor(null);

  // Step 1: tap a slot -> it becomes "selected" (highlighted, not yet locked)
  const pickSlot = (s) => setSelectedSlot(s);

  // Step 2: explicit confirm of the chosen slot -> shows a clear "locked in" state
  const lockSlot = () => {
    if (!selectedSlot) return;
    setConfirmedSlot(selectedSlot);
  };

  // Step 3: final booking confirmation
  const finalizeBooking = () => {
    if (!confirmedSlot) return;
    setBooked(true);
  };

  return (
    <>
      <style>{`
        .mp-filter-row{display:flex;align-items:center;gap:10px;margin-bottom:28px;flex-wrap:wrap}
        .mp-search-box{flex:1;min-width:200px;position:relative}
        .mp-search-box input{width:100%;background:#1e1e2d;border:1px solid #2a2a3d;border-radius:10px;padding:9px 12px 9px 36px;color:#e8e8f0;font-size:13px;outline:none;font-family:inherit}
        .mp-search-box input:focus{border-color:#7c5cfc}
        .mp-search-box input::placeholder{color:#8585a0}
        .mp-search-icon{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:#8585a0;width:15px;height:15px;pointer-events:none}
        .mp-select{background:#1e1e2d;border:1px solid #2a2a3d;border-radius:10px;padding:9px 12px;color:#e8e8f0;font-size:13px;cursor:pointer;outline:none;font-family:inherit}
        .mp-filter-btn{background:#1e1e2d;border:1px solid #2a2a3d;border-radius:10px;padding:9px 14px;color:#8585a0;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:6px;font-family:inherit}
        .mp-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
        .mp-section-title{font-size:15px;font-weight:700;color:#e8e8f0}
        .mp-view-all{color:#9d7ffe;font-size:12.5px;cursor:pointer;text-decoration:none}
        .mp-cards{display:flex;gap:14px;overflow-x:auto;padding-bottom:8px;scrollbar-width:thin;scrollbar-color:#2a2a3d transparent}
        .mp-cards::-webkit-scrollbar{height:4px}
        .mp-cards::-webkit-scrollbar-thumb{background:#2a2a3d;border-radius:10px}
        .mp-card{background:#1e1e2d;border:1px solid #2a2a3d;border-radius:14px;padding:18px 16px;min-width:196px;max-width:196px;flex-shrink:0;cursor:pointer;transition:border-color .2s,transform .2s;position:relative}
        .mp-card:hover{border-color:#7c5cfc;transform:translateY(-2px)}
        .mp-badge{position:absolute;top:12px;left:12px;font-size:10px;font-weight:600;padding:3px 8px;border-radius:20px}
        .badge-top-rated{background:rgba(245,166,35,.15);color:#f5a623;border:1px solid rgba(245,166,35,.3)}
        .badge-growth{background:rgba(34,197,94,.15);color:#22c55e;border:1px solid rgba(34,197,94,.3)}
        .badge-rising{background:rgba(124,92,252,.15);color:#9d7ffe;border:1px solid rgba(124,92,252,.3)}
        .badge-top-mentor{background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.3)}
        .mp-card-avatar-wrap{display:flex;justify-content:center;margin:28px 0 12px}
        .mp-card-name{font-size:13.5px;font-weight:600;text-align:center;color:#e8e8f0;display:flex;align-items:center;justify-content:center;gap:5px}
        .mp-verified{color:#9d7ffe}
        .mp-channel-name{font-size:11px;color:#7c5cfc;text-align:center;margin-bottom:2px;font-weight:500}
        .mp-card-niche{font-size:11.5px;color:#8585a0;text-align:center;margin:2px 0 10px}
        .mp-card-stats{display:flex;justify-content:center;gap:10px;font-size:11px;color:#8585a0;margin-bottom:10px;flex-wrap:wrap}
        .mp-stars{color:#f5a623;margin-right:2px}
        .mp-tag{display:inline-block;background:rgba(124,92,252,.12);border:1px solid rgba(124,92,252,.25);color:#9d7ffe;font-size:10.5px;padding:3px 8px;border-radius:20px;margin-bottom:12px}
        .mp-btn-view{width:100%;background:#7c5cfc;color:#fff;border:none;border-radius:8px;padding:8px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .15s}
        .mp-btn-view:hover{background:#9d7ffe}
        .mp-sessions-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:28px}
        @media(max-width:700px){.mp-sessions-grid{grid-template-columns:1fr}.mp-right{display:none}}
        .mp-session-card{background:#1e1e2d;border:1px solid #2a2a3d;border-radius:12px;padding:16px}
        .mp-stag{font-size:10.5px;font-weight:600;padding:3px 8px;border-radius:20px;display:inline-block;margin-bottom:10px}
        .tag-upcoming{background:rgba(124,92,252,.15);color:#9d7ffe}
        .tag-completed{background:rgba(34,197,94,.15);color:#22c55e}
        .mp-ment-row{display:flex;align-items:center;gap:10px;margin-bottom:10px}
        .mp-ment-name{font-size:13px;font-weight:600;color:#e8e8f0}
        .mp-ment-niche{font-size:11px;color:#8585a0}
        .mp-srow{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px}
        .mp-confirmed{color:#22c55e;font-size:12px;font-weight:600;white-space:nowrap}
        .mp-stitle{font-size:13.5px;font-weight:600;color:#e8e8f0}
        .mp-sdate{font-size:11.5px;color:#8585a0;margin-bottom:14px}
        .mp-btn-join{width:100%;background:#7c5cfc;color:#fff;border:none;border-radius:8px;padding:8px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .15s}
        .mp-btn-join:hover{background:#9d7ffe}
        .mp-btn-notes{width:100%;background:#16161f;border:1px solid #2a2a3d;color:#e8e8f0;border-radius:8px;padding:8px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit}
        .mp-how{background:#1e1e2d;border:1px solid #2a2a3d;border-radius:14px;padding:20px;margin-bottom:8px}
        .mp-how h3{font-size:14px;font-weight:700;color:#e8e8f0;margin-bottom:18px}
        .mp-steps{display:flex;gap:0}
        .mp-step{flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative}
        .mp-step:not(:last-child)::after{content:'›';position:absolute;right:-4px;top:10px;color:#8585a0;font-size:18px}
        .mp-step-icon{width:40px;height:40px;background:rgba(124,92,252,.18);border-radius:12px;display:grid;place-items:center;font-size:18px;margin-bottom:8px}
        .mp-step-title{font-size:12px;font-weight:600;color:#e8e8f0;margin-bottom:4px}
        .mp-step-desc{font-size:11px;color:#8585a0;line-height:1.5;padding:0 4px}
        .mp-right-label{font-size:11px;font-weight:700;color:#8585a0;text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px}
        .mp-journey-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px}
        .mp-jstat{background:#1e1e2d;border:1px solid #2a2a3d;border-radius:10px;padding:12px}
        .mp-jstat .val{font-size:22px;font-weight:700;color:#e8e8f0}
        .mp-jstat .lbl{font-size:11px;color:#8585a0;margin-top:2px}
        .mp-streak{background:linear-gradient(135deg,#2a1d10,#1e1e2d);border:1px solid rgba(245,166,35,.3);border-radius:12px;padding:14px;margin-bottom:20px}
        .mp-streak-h{font-weight:700;font-size:13px;color:#e8e8f0;margin-bottom:4px}
        .mp-streak-sub{font-size:11px;color:#8585a0;margin-bottom:12px}
        .mp-days{display:flex;gap:6px}
        .mp-day{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:600}
        .mp-day.done{background:#7c5cfc;color:#fff}
        .mp-day.today{background:#2a2a3d;color:#8585a0}
        .mp-rec-item{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #2a2a3d}
        .mp-rec-item:last-child{border-bottom:none}
        .mp-rec-name{font-size:12.5px;font-weight:600;color:#e8e8f0}
        .mp-rec-niche{font-size:11px;color:#8585a0}
        .mp-rec-rating{font-size:11px;color:#8585a0;margin-top:2px}
        .mp-btn-sm{background:rgba(124,92,252,.15);border:1px solid #7c5cfc;color:#9d7ffe;font-size:11px;font-weight:600;padding:5px 10px;border-radius:7px;cursor:pointer;white-space:nowrap;font-family:inherit}
        .mp-view-all-link{display:block;text-align:center;color:#9d7ffe;font-size:12px;margin-top:12px;cursor:pointer;text-decoration:none}
        .mp-layout{display:flex;gap:0;flex:1;min-height:0}
        .mp-center{flex:1;padding:24px;min-width:0;overflow-y:auto}
        .mp-right{width:260px;flex-shrink:0;border-left:1px solid #2a2a3d;padding:24px 18px;background:#16161f;overflow-y:auto}
        .mp-section-block{margin-bottom:28px}
        .mp-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:100;align-items:center;justify-content:center;padding:16px}
        .mp-overlay.open{display:flex}
        .mp-modal{background:#16161f;border:1px solid #2a2a3d;border-radius:16px;padding:28px;max-width:420px;width:100%;position:relative;max-height:88vh;overflow-y:auto}
        .mp-modal h2{font-size:18px;font-weight:700;color:#e8e8f0;margin-bottom:6px}
        .mp-modal p{font-size:13px;color:#8585a0;margin-bottom:20px}
        .mp-modal-close{position:absolute;top:16px;right:16px;background:#1e1e2d;border:1px solid #2a2a3d;color:#e8e8f0;width:30px;height:30px;border-radius:50%;cursor:pointer;display:grid;place-items:center;font-size:16px;font-family:inherit;flex-shrink:0}
        .mp-slots{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px}
        .mp-slot{position:relative;background:#1e1e2d;border:1px solid #2a2a3d;border-radius:8px;padding:8px;text-align:center;font-size:12px;color:#e8e8f0;cursor:pointer;transition:all .15s;font-family:inherit}
        .mp-slot:hover{border-color:#7c5cfc;color:#9d7ffe}
        .mp-slot.selected{border-color:#7c5cfc;background:rgba(124,92,252,.18);color:#9d7ffe}
        .mp-slot.locked{border-color:#22c55e;background:rgba(34,197,94,.16);color:#22c55e;font-weight:600}
        .mp-slot .lock-check{position:absolute;top:-7px;right:-7px;width:18px;height:18px;border-radius:50%;background:#22c55e;color:#fff;font-size:11px;display:grid;place-items:center;font-weight:700}
        .mp-modal-label{font-size:12px;color:#8585a0;margin-bottom:8px;font-weight:500}
        .mp-lock-status{font-size:12px;color:#22c55e;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);border-radius:8px;padding:8px 10px;margin-bottom:14px;display:flex;align-items:center;gap:6px}
        .mp-btn-confirm{width:100%;background:#7c5cfc;color:#fff;border:none;border-radius:10px;padding:12px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .15s}
        .mp-btn-confirm:hover{background:#9d7ffe}
        .mp-btn-confirm:disabled{background:#2a2a3d;color:#8585a0;cursor:not-allowed}
        .mp-btn-confirm-final{width:100%;background:#22c55e;color:#fff;border:none;border-radius:10px;padding:12px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .15s;margin-top:8px}
        .mp-btn-confirm-final:hover{background:#16a34a}
        .mp-btn-confirm-final:disabled{background:#2a2a3d;color:#8585a0;cursor:not-allowed}
        .mp-empty{text-align:center;color:#8585a0;padding:32px 0;font-size:13px}
        .mp-success{text-align:center;padding:20px 0}
        .mp-success .tick{font-size:48px;margin-bottom:12px}
        .mp-success h3{color:#22c55e;font-size:16px;font-weight:700;margin-bottom:6px}
        .mp-success p{color:#8585a0;font-size:13px}

        /* Profile modal */
        .mp-profile-head{display:flex;flex-direction:column;align-items:center;text-align:center;margin-bottom:18px}
        .mp-profile-name{font-size:18px;font-weight:700;color:#e8e8f0;margin-top:14px;display:flex;align-items:center;gap:6px}
        .mp-profile-channel{font-size:12.5px;color:#9d7ffe;font-weight:500;margin-top:2px}
        .mp-profile-niche{font-size:12px;color:#8585a0;margin-top:2px}
        .mp-profile-stats{display:flex;justify-content:center;gap:18px;margin:16px 0;flex-wrap:wrap}
        .mp-profile-stat{text-align:center}
        .mp-profile-stat .val{font-size:16px;font-weight:700;color:#e8e8f0}
        .mp-profile-stat .lbl{font-size:10.5px;color:#8585a0;margin-top:2px}
        .mp-profile-bio{font-size:12.5px;color:#b4b4c4;line-height:1.6;margin-bottom:20px;text-align:center}
        .mp-profile-tagwrap{text-align:center;margin-bottom:20px}

        /* Clickable journey stats */
        .mp-jstat-clickable{cursor:pointer;transition:border-color .15s,transform .15s}
        .mp-jstat-clickable:hover{border-color:#7c5cfc;transform:translateY(-1px)}
        .mp-jstat-clickable:focus-visible{outline:2px solid #7c5cfc;outline-offset:2px}

        /* Info / list modal */
        .mp-list-item{display:flex;align-items:center;gap:10px;padding:10px;border:1px solid #2a2a3d;border-radius:10px;margin-bottom:8px}
        .mp-list-item:last-child{margin-bottom:0}
        .mp-list-main{flex:1;min-width:0}
        .mp-list-title{font-size:13px;font-weight:600;color:#e8e8f0}
        .mp-list-sub{font-size:11.5px;color:#8585a0;margin-top:2px}
        .mp-list-status{font-size:10.5px;font-weight:600;padding:3px 8px;border-radius:20px;white-space:nowrap}
        .mp-single-detail{text-align:center;padding:8px 0 4px}
        .mp-single-detail .mp-stitle{font-size:15px;margin:14px 0 4px}
        .mp-single-detail .mp-sdate{margin-bottom:18px}
        .mp-notes-box{background:#1e1e2d;border:1px solid #2a2a3d;border-radius:10px;padding:14px;text-align:left;font-size:12.5px;color:#b4b4c4;line-height:1.6;margin-bottom:4px}
      `}</style>

      <div className="mp-layout">

        {/* ── CENTER COLUMN ── */}
        <div className="mp-center">

          {/* SEARCH + FILTERS */}
          <div className="mp-filter-row">
            <div className="mp-search-box">
              <svg className="mp-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, channel or niche..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select className="mp-select" value={nicheFilter} onChange={(e) => setNicheFilter(e.target.value)}>
              <option value="">All Niches</option>
              <option>Tech & Productivity</option>
              <option>Finance & Business</option>
              <option>Lifestyle & Vlogs</option>
              <option>Education</option>
              <option>Gaming</option>
              <option>Shorts & Reels</option>
            </select>
            <select className="mp-select">
              <option>Growth Stage</option>
              <option>Beginner (0–1M)</option>
              <option>Growing (1M–10M)</option>
              <option>Established (10M+)</option>
            </select>
            <select className="mp-select">
              <option>Availability</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
            <button className="mp-filter-btn">⚙ Filters</button>
          </div>

          {/* TOP MENTORS */}
          <div className="mp-section-block">
            <div className="mp-section-header">
              <span className="mp-section-title">Top Mentors</span>
              <a className="mp-view-all" href="#" onClick={(e) => { e.preventDefault(); setInfoModal({ kind: "all-mentors", title: "All Mentors" }); }}>View all mentors →</a>
            </div>

            {filtered.length === 0 ? (
              <div className="mp-empty">No mentors found. Try a different search.</div>
            ) : (
              <div className="mp-cards">
                {filtered.map((m, i) => (
                  <div className="mp-card" key={i} onClick={() => openProfile(m)}>
                    <span className={`mp-badge ${m.badgeClass}`}>{m.badge}</span>
                    <div className="mp-card-avatar-wrap">
                      <AvatarImg seed={m.seed} initials={m.initials} grad={m.grad} size={64} />
                    </div>
                    <div className="mp-card-name">
                      {m.name} <span className="mp-verified">✔</span>
                    </div>
                    <div className="mp-channel-name">{m.channelName}</div>
                    <div className="mp-card-niche">{m.niche}</div>
                    <div className="mp-card-stats">
                      <span><span className="mp-stars">★</span>{m.rating} ({m.reviews})</span>
                      <span>{m.subscribers}</span>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <span className="mp-tag">{m.tag}</span>
                    </div>
                    <button
                      className="mp-btn-view"
                      onClick={(e) => { e.stopPropagation(); openProfile(m); }}
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MENTOR SESSIONS */}
          <div className="mp-section-block">
            <div className="mp-section-header">
              <span className="mp-section-title">Mentor Sessions</span>
              <a className="mp-view-all" href="#" onClick={(e) => { e.preventDefault(); setInfoModal({ kind: "sessions", title: "All Sessions" }); }}>View all →</a>
            </div>
            <div className="mp-sessions-grid">
              {/* UPCOMING */}
              <div className="mp-session-card">
                <span className="mp-stag tag-upcoming">Upcoming Session</span>
                <div className="mp-ment-row">
                  <AvatarImg seed="Gaurav-Chaudhary" grad="linear-gradient(135deg,#7c5cfc,#c084fc)" size={36} />
                  <div>
                    <div className="mp-ment-name">Gaurav Chaudhary</div>
                    <div className="mp-ment-niche">Technical Guruji · Tech & Productivity</div>
                  </div>
                </div>
                <div className="mp-srow">
                  <div className="mp-stitle">YouTube Growth Strategy</div>
                  <span className="mp-confirmed">✔ Confirmed</span>
                </div>
                <div className="mp-sdate">📅 24 June 2026, 07:00 PM</div>
                <button className="mp-btn-join" onClick={() => setInfoModal({ kind: "join-session", title: "Join Session", session: mySessions[0] })}>Join Session</button>
              </div>

              {/* COMPLETED */}
              <div className="mp-session-card">
                <span className="mp-stag tag-completed">Completed</span>
                <div className="mp-ment-row">
                  <AvatarImg seed="Pranjal-Kamra" grad="linear-gradient(135deg,#22c55e,#16a34a)" size={36} />
                  <div>
                    <div className="mp-ment-name">Pranjal Kamra</div>
                    <div className="mp-ment-niche">Pranjal Kamra · Finance & Business</div>
                  </div>
                </div>
                <div className="mp-stitle" style={{ marginTop: 10 }}>Monetization Roadmap Review</div>
                <div className="mp-sdate">📅 18 June 2026, 06:00 PM</div>
                <button className="mp-btn-notes" onClick={() => setInfoModal({ kind: "notes", title: "Session Notes", session: mySessions[1] })}>View Notes</button>
              </div>
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div className="mp-how">
            <h3>How Mentorship Works</h3>
            <div className="mp-steps">
              {[
                { icon: "👥", title: "Choose a Mentor",       desc: "Browse real creators and find the right fit." },
                { icon: "📅", title: "Book a Session",        desc: "Pick a time and book your 1-on-1 session." },
                { icon: "💬", title: "Get Personalized Help", desc: "Discuss, get feedback & actionable insights." },
                { icon: "📈", title: "Implement & Grow",      desc: "Apply learnings and track your progress." },
              ].map((s, i) => (
                <div className="mp-step" key={i}>
                  <div className="mp-step-icon">{s.icon}</div>
                  <div className="mp-step-title">{s.title}</div>
                  <div className="mp-step-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="mp-right">

          {/* JOURNEY STATS */}
          <div className="mp-section-block">
            <div className="mp-right-label">Your Mentor Journey</div>
            <div className="mp-journey-grid">
              {[
                { v: "3", l: "Sessions", kind: "sessions" },
                { v: "12", l: "Hours Spent", kind: "sessions" },
                { v: "4.9 ★", l: "Avg. Rating", kind: "sessions" },
                { v: "2", l: "Active Mentors", kind: "active-mentors" },
              ].map((stat, i) => (
                <div
                  className="mp-jstat mp-jstat-clickable"
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => setInfoModal({ kind: stat.kind, title: stat.l })}
                  onKeyDown={(e) => e.key === "Enter" && setInfoModal({ kind: stat.kind, title: stat.l })}
                >
                  <div className="val" style={{ color: stat.v.includes("★") ? "#f5a623" : "#e8e8f0" }}>{stat.v}</div>
                  <div className="lbl">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* STREAK */}
          <div className="mp-streak">
            <div className="mp-streak-h">🔥 7 Day Streak</div>
            <div className="mp-streak-sub">Keep it up! Consistency builds growth.</div>
            <div className="mp-days">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div className={`mp-day ${i < 6 ? "done" : "today"}`} key={i}>{d}</div>
              ))}
            </div>
          </div>

          {/* RECOMMENDED */}
          <div className="mp-right-label">Recommended For You</div>
          {recommended.map((r, i) => (
            <div className="mp-rec-item" key={i}>
              <AvatarImg seed={r.seed} grad={r.grad} size={36} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="mp-rec-name">{r.name}</div>
                <div className="mp-rec-niche">{r.niche}</div>
                <div className="mp-rec-rating">
                  <span style={{ color: "#f5a623" }}>★</span> {r.rating} ({r.reviews})
                </div>
              </div>
              <button
                className="mp-btn-sm"
                onClick={() => openProfile({ ...r, channelName: r.name, tag: r.niche, bio: `Creator in ${r.niche}, recommended based on your activity.` })}
              >
                View
              </button>
            </div>
          ))}
          <a className="mp-view-all-link" href="#" onClick={(e) => { e.preventDefault(); setInfoModal({ kind: "all-recommended", title: "All Recommendations" }); }}>View all recommendations →</a>
        </aside>
      </div>

      {/* ── PROFILE MODAL (view-only) ── */}
      <div
        className={`mp-overlay ${profileMentor ? "open" : ""}`}
        onClick={(e) => e.currentTarget === e.target && closeProfile()}
      >
        {profileMentor && (
          <div className="mp-modal">
            <button className="mp-modal-close" onClick={closeProfile}>✕</button>
            <div className="mp-profile-head">
              <AvatarImg seed={profileMentor.seed} grad={profileMentor.grad} size={76} />
              <div className="mp-profile-name">
                {profileMentor.name} <span className="mp-verified">✔</span>
              </div>
              {profileMentor.channelName && (
                <div className="mp-profile-channel">{profileMentor.channelName}</div>
              )}
              <div className="mp-profile-niche">{profileMentor.niche}</div>
            </div>

            <div className="mp-profile-stats">
              <div className="mp-profile-stat">
                <div className="val">★ {profileMentor.rating}</div>
                <div className="lbl">Rating</div>
              </div>
              <div className="mp-profile-stat">
                <div className="val">{profileMentor.reviews}</div>
                <div className="lbl">Reviews</div>
              </div>
              {profileMentor.sessions && (
                <div className="mp-profile-stat">
                  <div className="val">{profileMentor.sessions}</div>
                  <div className="lbl">Sessions</div>
                </div>
              )}
            </div>

            {profileMentor.bio && <p className="mp-profile-bio">{profileMentor.bio}</p>}

            {profileMentor.tag && (
              <div className="mp-profile-tagwrap">
                <span className="mp-tag">{profileMentor.tag}</span>
              </div>
            )}

            <button className="mp-btn-confirm" onClick={() => openBooking(profileMentor)}>
              Book a Session
            </button>
          </div>
        )}
      </div>

      {/* ── BOOKING MODAL (slot picker) ── */}
      <div
        className={`mp-overlay ${bookingMentor ? "open" : ""}`}
        onClick={(e) => e.currentTarget === e.target && closeBooking()}
      >
        {bookingMentor && (
          <div className="mp-modal">
            <button className="mp-modal-close" onClick={closeBooking}>✕</button>

            {booked ? (
              <div className="mp-success">
                <div className="tick">✅</div>
                <h3>Session Booked!</h3>
                <p>
                  Your slot <strong style={{ color: "#22c55e" }}>{confirmedSlot}</strong> with{" "}
                  <strong style={{ color: "#e8e8f0" }}>{bookingMentor.name}</strong> is confirmed.
                  <br />You'll receive a confirmation shortly.
                </p>
              </div>
            ) : (
              <>
                <h2>Book Session – {bookingMentor.name}</h2>
                <p>Choose a time slot, then confirm to lock it in.</p>

                <div className="mp-modal-label">Select a Time Slot</div>
                <div className="mp-slots">
                  {slots.map((s) => {
                    const isLocked = confirmedSlot === s;
                    const isSelected = selectedSlot === s && !confirmedSlot;
                    return (
                      <div
                        key={s}
                        className={`mp-slot ${isLocked ? "locked" : isSelected ? "selected" : ""}`}
                        onClick={() => {
                          // Changing the slot un-confirms any previous lock
                          setConfirmedSlot(null);
                          pickSlot(s);
                        }}
                      >
                        {s}
                        {isLocked && <span className="lock-check">✓</span>}
                      </div>
                    );
                  })}
                </div>

                {confirmedSlot ? (
                  <div className="mp-lock-status">✓ {confirmedSlot} is locked in — confirm below to finish booking.</div>
                ) : (
                  <button className="mp-btn-confirm" disabled={!selectedSlot} onClick={lockSlot}>
                    {selectedSlot ? `Lock In ${selectedSlot}` : "Select a slot first"}
                  </button>
                )}

                {confirmedSlot && (
                  <button className="mp-btn-confirm-final" onClick={finalizeBooking}>
                    Confirm Booking
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {/* ── INFO / LIST MODAL (journey stats, view-all links, join session, notes) ── */}
      <div
        className={`mp-overlay ${infoModal ? "open" : ""}`}
        onClick={(e) => e.currentTarget === e.target && closeInfo()}
      >
        {infoModal && (
          <div className="mp-modal">
            <button className="mp-modal-close" onClick={closeInfo}>✕</button>
            <h2>{infoModal.title}</h2>

            {infoModal.kind === "sessions" && (
              <>
                <p>Every mentorship session you've booked or completed.</p>
                {mySessions.map((s, i) => (
                  <div className="mp-list-item" key={i}>
                    <AvatarImg seed={s.seed} size={36} />
                    <div className="mp-list-main">
                      <div className="mp-list-title">{s.title}</div>
                      <div className="mp-list-sub">{s.mentorName} · {s.date}</div>
                    </div>
                    <span
                      className="mp-list-status"
                      style={
                        s.status === "Upcoming"
                          ? { background: "rgba(124,92,252,.15)", color: "#9d7ffe" }
                          : { background: "rgba(34,197,94,.15)", color: "#22c55e" }
                      }
                    >
                      {s.status}
                    </span>
                  </div>
                ))}
              </>
            )}

            {infoModal.kind === "active-mentors" && (
              <>
                <p>Mentors you currently have an active or ongoing relationship with.</p>
                {mentors
                  .filter((m) => activeMentorNames.includes(m.name))
                  .map((m, i) => (
                    <div className="mp-list-item" key={i}>
                      <AvatarImg seed={m.seed} grad={m.grad} size={36} />
                      <div className="mp-list-main">
                        <div className="mp-list-title">{m.name}</div>
                        <div className="mp-list-sub">{m.channelName} · {m.niche}</div>
                      </div>
                      <button
                        className="mp-btn-sm"
                        onClick={() => { closeInfo(); openProfile(m); }}
                      >
                        View
                      </button>
                    </div>
                  ))}
              </>
            )}

            {infoModal.kind === "all-mentors" && (
              <>
                <p>The full list of mentors available on the platform.</p>
                {mentors.map((m, i) => (
                  <div className="mp-list-item" key={i}>
                    <AvatarImg seed={m.seed} grad={m.grad} size={36} />
                    <div className="mp-list-main">
                      <div className="mp-list-title">{m.name}</div>
                      <div className="mp-list-sub">{m.channelName} · {m.niche}</div>
                    </div>
                    <button
                      className="mp-btn-sm"
                      onClick={() => { closeInfo(); openProfile(m); }}
                    >
                      View
                    </button>
                  </div>
                ))}
              </>
            )}

            {infoModal.kind === "all-recommended" && (
              <>
                <p>Creators recommended for you based on your activity.</p>
                {recommended.map((r, i) => (
                  <div className="mp-list-item" key={i}>
                    <AvatarImg seed={r.seed} grad={r.grad} size={36} />
                    <div className="mp-list-main">
                      <div className="mp-list-title">{r.name}</div>
                      <div className="mp-list-sub">{r.niche} · ★ {r.rating} ({r.reviews})</div>
                    </div>
                    <button
                      className="mp-btn-sm"
                      onClick={() => {
                        closeInfo();
                        openProfile({ ...r, channelName: r.name, tag: r.niche, bio: `Creator in ${r.niche}, recommended based on your activity.` });
                      }}
                    >
                      View
                    </button>
                  </div>
                ))}
              </>
            )}

            {infoModal.kind === "join-session" && infoModal.session && (
              <div className="mp-single-detail">
                <AvatarImg seed={infoModal.session.seed} grad={infoModal.session.grad} size={56} />
                <div className="mp-stitle">{infoModal.session.title}</div>
                <div className="mp-sdate">with {infoModal.session.mentorName} · {infoModal.session.date}</div>
                <p style={{ fontSize: 12, color: "#8585a0" }}>
                  The live room opens 10 minutes before the scheduled time. Keep this tab open and you'll be able to join when it's ready.
                </p>
              </div>
            )}

            {infoModal.kind === "notes" && infoModal.session && (
              <div className="mp-single-detail">
                <AvatarImg seed={infoModal.session.seed} grad={infoModal.session.grad} size={56} />
                <div className="mp-stitle">{infoModal.session.title}</div>
                <div className="mp-sdate">with {infoModal.session.mentorName} · {infoModal.session.date}</div>
                <div className="mp-notes-box">
                  Key takeaways: focus the next month on consistent upload cadence over one-off viral attempts, set up a simple
                  revenue tracker across brand deals and ad revenue, and revisit pricing for sponsored slots next quarter.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}