export default function CreatorScore() {
  const metrics = [
    { title: "Consistency", value: "92%" },
    { title: "Engagement", value: "81%" },
    { title: "Community", value: "75%" },
    { title: "Learning", value: "88%" },
  ];

  const badges = [
    "🔥 7 Day Streak",
    "🎯 CTR Expert",
    "🚀 Growth Starter",
    "🤝 Mentor Explorer",
  ];

  const levels = [
    "Level 1 ✓",
    "Level 2 ✓",
    "Level 3 ✓",
    "Level 4 ✓",
    "Level 5 (Current)",
    "Level 6 🔒",
  ];

  return (
    <div>
      <h1 style={{ fontSize: "34px", fontWeight: "700" }}>
        Creator Pulse Score
      </h1>

      <p
        style={{
          color: "var(--text-dim)",
          marginBottom: "30px",
        }}
      >
        Measure your creator growth beyond views and subscribers.
      </p>

      {/* Hero Card */}
      <div
        className="panel-card"
        style={{
          padding: "35px",
          marginBottom: "25px",
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(255,93,58,0.15), rgba(255,93,58,0.03))",
        }}
      >
        <div
          style={{
            fontSize: "62px",
            fontWeight: "800",
            color: "var(--coral)",
          }}
        >
          87
        </div>

        <div
          style={{
            fontSize: "18px",
            marginBottom: "15px",
          }}
        >
          Creator Pulse Score
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <div className="badge">🔥 7 Day Streak</div>
          <div className="badge">🏅 Top 23%</div>
          <div className="badge">📈 +12 This Week</div>
        </div>
      </div>

      {/* Growth Breakdown */}
      <h2 style={{ marginBottom: "15px" }}>
        Growth Breakdown
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        {metrics.map((item) => (
          <div
            key={item.title}
            className="panel-card"
            style={{
              padding: "20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "var(--coral)",
              }}
            >
              {item.value}
            </div>

            <div
              style={{
                color: "var(--text-dim)",
                marginTop: "6px",
              }}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>

      {/* Achievement + Rank */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          className="panel-card"
          style={{
            padding: "25px",
          }}
        >
          <h3>🏆 Next Achievement</h3>

          <div
            style={{
              marginTop: "20px",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Consistency Master
          </div>

          <div
            style={{
              marginTop: "15px",
              height: "10px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "80%",
                height: "100%",
                background: "var(--coral)",
              }}
            />
          </div>

          <p
            style={{
              marginTop: "15px",
              color: "var(--text-dim)",
            }}
          >
            Upload 2 more videos to unlock.
          </p>
        </div>

        <div
          className="panel-card"
          style={{
            padding: "25px",
            textAlign: "center",
          }}
        >
          <h3>Your Community Rank</h3>

          <div
            style={{
              fontSize: "42px",
              fontWeight: "700",
              color: "var(--coral)",
              marginTop: "15px",
            }}
          >
            #142
          </div>

          <p
            style={{
              color: "var(--text-dim)",
            }}
          >
            Out of 618 creators
          </p>

          <div
            style={{
              marginTop: "15px",
              fontWeight: "600",
            }}
          >
            Top 23%
          </div>
        </div>
      </div>

      {/* Creator Journey */}
      <h2 style={{ marginBottom: "15px" }}>
        Creator Journey
      </h2>

      <div
        className="panel-card"
        style={{
          padding: "25px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {levels.map((level) => (
            <div
              key={level}
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              {level}
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <h2 style={{ marginBottom: "15px" }}>
        Earned Badges
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        {badges.map((badge) => (
          <div
            key={badge}
            className="panel-card"
            style={{
              padding: "22px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {badge}
          </div>
        ))}
      </div>

      {/* Mentor Impact */}
      <div
        className="panel-card"
        style={{
          padding: "25px",
        }}
      >
        <h2>Mentor Impact</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "32px",
                color: "var(--coral)",
                fontWeight: "700",
              }}
            >
              3
            </div>
            <div>Sessions Attended</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "32px",
                color: "var(--coral)",
                fontWeight: "700",
              }}
            >
              +18%
            </div>
            <div>Score Improvement</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "32px",
                color: "var(--coral)",
                fontWeight: "700",
              }}
            >
              +32%
            </div>
            <div>Average View Growth</div>
          </div>
        </div>
      </div>
    </div>
  );
}