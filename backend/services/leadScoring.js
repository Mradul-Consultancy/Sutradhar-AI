// backend/services/leadScoring.js
// Simple lead scoring service – uses a LLM (Gemini/OpenAI) or rule‑based fallback.
// Expects a lead object with fields: name, company, industry, revenue, employeeCount, engagementScore (0‑100).
// Returns a score (0‑100) and a brief rationale string.

let getGeminiResponse = null;
try {
  const geminiUtil = require('../utils/gemini');
  getGeminiResponse = geminiUtil.getGeminiResponse;
} catch (err) {
  // Optional LLM module not installed or not present; fallback to deterministic rules
  getGeminiResponse = null;
}

/**
 * Compute a lead score.
 * @param {Object} lead - Lead data.
 * @returns {Promise<{score:number, rationale:string}>}
 */
async function computeLeadScore(lead) {
  // Basic validation
  if (!lead || typeof lead !== 'object') {
    throw new Error('Invalid lead payload');
  }

  // Simple rule‑based fallback if Gemini not configured
  const hasGemini = typeof getGeminiResponse === 'function';

  // Build a prompt describing the lead
  const prompt = `Score the following lead for a B2B SaaS CRM offering. Provide a numeric score from 0 to 100 and a one‑sentence rationale.

Lead:
Name: ${lead.name || 'N/A'}
Company: ${lead.company || 'N/A'}
Industry: ${lead.industry || 'N/A'}
Annual Revenue: ${lead.revenue || 'N/A'}
Employees: ${lead.employeeCount || 'N/A'}
Engagement Score (0‑100): ${lead.engagementScore || 'N/A'}
`;

  if (hasGemini) {
    try {
      const response = await getGeminiResponse(prompt);
      // Expected format: "Score: 78\nRationale: ..."
      const match = response.match(/Score\s*[:=]\s*(\d+).*Rationale\s*[:=]\s*(.+)/s);
      if (match) {
        return { score: parseInt(match[1], 10), rationale: match[2].trim() };
      }
      // Fallback to parsing numeric value only
      const num = parseInt(response.replace(/\D/g, ''), 10);
      return { score: isNaN(num) ? 0 : num, rationale: response.trim() };
    } catch (e) {
      console.error('Gemini scoring failed, falling back to rules', e);
    }
  }

  // Rule‑based heuristic scoring (0‑100)
  let score = 0;
  // Revenue weight (max 40)
  const rev = Number(lead.revenue) || 0;
  if (rev > 0) {
    score += Math.min(40, Math.log10(rev) * 10); // log scale
  }
  // Employee count weight (max 20)
  const emp = Number(lead.employeeCount) || 0;
  if (emp > 0) {
    score += Math.min(20, Math.log10(emp) * 5);
  }
  // Engagement weight (max 30)
  const eng = Number(lead.engagementScore) || 0;
  score += Math.min(30, (eng / 100) * 30);
  // Industry match weight (max 10)
  const targetIndustries = ['Technology', 'Fintech', 'Logistics', 'Healthcare'];
  if (targetIndustries.includes(lead.industry)) {
    score += 10;
  }

  const rationale = `Rule‑based score based on revenue, employee size, engagement, and industry fit.`;
  return { score: Math.round(score), rationale };
}

module.exports = { computeLeadScore };
