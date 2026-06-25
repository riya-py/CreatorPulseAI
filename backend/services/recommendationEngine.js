/**
 * Rule-based recommendation engine.
 * Takes a metrics object and returns an array of triggered rules.
 * Each rule has: rule (id), message, category, severity
 *
 * Expected metrics shape:
 * {
 *   views, ctr, retention, engagementRate, subscribersGained,
 *   likes, comments, averageViewDuration, impressions, watchTimeMinutes
 * }
 */

const runRecommendationEngine = (metrics) => {
  const triggered = [];

  const {
    views = 0,
    ctr = 0,
    retention = 0,
    engagementRate = 0,
    subscribersGained = 0,
    likes = 0,
    comments = 0,
    averageViewDuration = 0,
    impressions = 0,
  } = metrics;

  // 1. Low CTR -> thumbnail/title issue
  if (ctr < 3) {
    triggered.push({
      rule: "LOW_CTR",
      category: "thumbnail",
      severity: ctr < 1.5 ? "high" : "medium",
      message: "Your click-through rate is below 3%. Improve your thumbnail with larger text and higher contrast, and write a more curiosity-driven title.",
    });
  }

  // 2. Low retention -> weak hook
  if (retention < 40) {
    triggered.push({
      rule: "LOW_RETENTION",
      category: "retention",
      severity: retention < 25 ? "high" : "medium",
      message: "Average view percentage is under 40%. Strengthen your opening hook — ask a question or tease the payoff in the first 5-10 seconds.",
    });
  }

  // 3. Low engagement rate -> weak CTA
  if (engagementRate < 2) {
    triggered.push({
      rule: "LOW_ENGAGEMENT",
      category: "engagement",
      severity: "medium",
      message: "Engagement rate (likes+comments / views) is low. Add a clear call-to-action asking viewers to like, comment, or share.",
    });
  }

  // 4. Very few impressions -> discoverability problem
  if (impressions > 0 && impressions < 1000) {
    triggered.push({
      rule: "LOW_IMPRESSIONS",
      category: "discoverability",
      severity: "medium",
      message: "Impressions are low, meaning YouTube isn't surfacing this video much. Improve your title/tags/SEO and consider a trending topic in your niche.",
    });
  }

  // 5. High CTR but low retention -> thumbnail overpromises
  if (ctr >= 5 && retention < 35) {
    triggered.push({
      rule: "CTR_RETENTION_MISMATCH",
      category: "content-mismatch",
      severity: "high",
      message: "Your CTR is strong but retention drops fast — viewers click but leave. Make sure your thumbnail/title accurately represents the content.",
    });
  }

  // 6. Low subscriber conversion despite decent views
  if (views > 1000 && subscribersGained < 5) {
    triggered.push({
      rule: "LOW_SUB_CONVERSION",
      category: "subscriber-growth",
      severity: "medium",
      message: "You're getting views but few new subscribers. Add a verbal subscribe prompt and an end-screen subscribe reminder.",
    });
  }

  // 7. Very short average view duration -> pacing issue
  if (averageViewDuration > 0 && averageViewDuration < 30) {
    triggered.push({
      rule: "SHORT_WATCH_DURATION",
      category: "pacing",
      severity: "high",
      message: "Average watch duration is under 30 seconds. Cut slow intros and get to the point faster — tighten your edit.",
    });
  }

  // 8. Low comment count relative to views -> lacking conversation hooks
  if (views > 500 && comments < 5) {
    triggered.push({
      rule: "LOW_COMMENTS",
      category: "engagement",
      severity: "low",
      message: "Very few comments relative to views. Ask a direct, easy-to-answer question to spark conversation in the comments.",
    });
  }

  // 9. Decent retention but low likes -> content resonates but no prompt
  if (retention >= 50 && likes < views * 0.02) {
    triggered.push({
      rule: "LOW_LIKE_RATIO",
      category: "engagement",
      severity: "low",
      message: "Viewers are watching well but not liking the video. Remind viewers mid-video to hit like if they're finding it useful.",
    });
  }

  // 10. Good CTR and retention -> double down / repurpose
  if (ctr >= 5 && retention >= 50) {
    triggered.push({
      rule: "STRONG_PERFORMANCE",
      category: "growth-opportunity",
      severity: "low",
      message: "This video is performing well on both CTR and retention. Consider making a follow-up or series on this exact topic.",
    });
  }

  // 11. Zero/very low views -> upload timing or topic saturation
  if (views < 100) {
    triggered.push({
      rule: "VERY_LOW_VIEWS",
      category: "upload-strategy",
      severity: "high",
      message: "Views are very low. Check your upload time against when your audience is most active, and verify the topic isn't oversaturated right now.",
    });
  }

  // 12. High impressions but low CTR -> thumbnail blends in
  if (impressions >= 5000 && ctr < 2) {
    triggered.push({
      rule: "HIGH_IMPRESSIONS_LOW_CTR",
      category: "thumbnail",
      severity: "high",
      message: "You're getting shown a lot but rarely clicked. Your thumbnail likely blends into the feed — try bolder colors or a clearer focal point.",
    });
  }

  return triggered;
};

module.exports = { runRecommendationEngine };