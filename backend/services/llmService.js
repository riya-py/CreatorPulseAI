const axios = require("axios");

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Sends analytics + rule-engine signals to the LLM and asks for
 * structured JSON: diagnosis, possibleReasons, recommendations, nextBestActions
 */
const generateAIAnalysis = async ({ videoTitle, metrics, triggeredRules }) => {
  const systemPrompt = `You are an expert YouTube growth strategist. You will be given a video's performance metrics and a list of rule-based signals already detected. Respond with ONLY valid JSON, no markdown, no preamble, in exactly this shape:
{
  "diagnosis": "one paragraph summary of how the video performed and why",
  "possibleReasons": ["reason 1", "reason 2", "reason 3"],
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
  "nextBestActions": ["action 1", "action 2", "action 3"],
  "confidenceScore": 87
}
confidenceScore is an integer 0-100 representing how confident you are in this diagnosis given the data provided.`;

  const userPrompt = `Video: "${videoTitle || "Untitled"}"

Metrics:
- Views: ${metrics.views}
- CTR: ${metrics.ctr}%
- Retention: ${metrics.retention}%
- Engagement Rate: ${metrics.engagementRate}%
- Subscribers Gained: ${metrics.subscribersGained}
- Likes: ${metrics.likes}
- Comments: ${metrics.comments}

Rule-based signals already detected:
${triggeredRules.map((r) => `- [${r.category}] ${r.message}`).join("\n") || "- None triggered"}

Generate the performance diagnosis, possible reasons, growth recommendations, and next best actions as structured JSON.`;

  const response = await axios.post(
    OPENROUTER_URL,
    {
      model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3-70b-instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.4,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const rawText = response.data.choices[0].message.content.trim();

  // Strip markdown fences if the model wraps JSON in ```json blocks
  const cleaned = rawText.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    // Fallback so the API never breaks if LLM returns malformed JSON
    parsed = {
      diagnosis: rawText,
      possibleReasons: [],
      recommendations: [],
      nextBestActions: [],
      confidenceScore: 50,
    };
  }

  return { parsed, raw: response.data };
};

module.exports = { generateAIAnalysis };