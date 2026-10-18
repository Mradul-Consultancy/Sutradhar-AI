// src/components/LeadScoreCard.jsx
import React, { useState } from "react";
import { useLeadScore } from "../hooks/useLeadScore";

export default function LeadScoreCard() {
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState({
    name: "",
    company: "",
    industry: "",
    revenue: "",
    employeeCount: "",
    engagementScore: ""
  });
  const { scoreLead, loading, error, result } = useLeadScore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await scoreLead(lead);
  };

  return (
    <div className="my-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-lg hover:from-teal-400 hover:to-indigo-500 transition"
      >
        {open ? "Close Lead Scorer" : "Score a Lead"}
      </button>

      {open && (
        <div className="mt-4 p-6 bg-brand-surface/70 backdrop-blur-md border border-brand-border rounded-xl shadow-lg animate-fadeIn">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              name="name"
              value={lead.name}
              onChange={handleChange}
              placeholder="Lead Name"
              className="px-3 py-2 bg-brand-surfaceAlt border border-brand-border rounded text-sm text-brand-text placeholder:text-brand-textDim focus:outline-none"
            />
            <input
              name="company"
              value={lead.company}
              onChange={handleChange}
              placeholder="Company"
              className="px-3 py-2 bg-brand-surfaceAlt border border-brand-border rounded text-sm text-brand-text placeholder:text-brand-textDim focus:outline-none"
            />
            <input
              name="industry"
              value={lead.industry}
              onChange={handleChange}
              placeholder="Industry"
              className="px-3 py-2 bg-brand-surfaceAlt border border-brand-border rounded text-sm text-brand-text placeholder:text-brand-textDim focus:outline-none"
            />
            <input
              name="revenue"
              type="number"
              value={lead.revenue}
              onChange={handleChange}
              placeholder="Annual Revenue"
              className="px-3 py-2 bg-brand-surfaceAlt border border-brand-border rounded text-sm text-brand-text placeholder:text-brand-textDim focus:outline-none"
            />
            <input
              name="employeeCount"
              type="number"
              value={lead.employeeCount}
              onChange={handleChange}
              placeholder="Employee Count"
              className="px-3 py-2 bg-brand-surfaceAlt border border-brand-border rounded text-sm text-brand-text placeholder:text-brand-textDim focus:outline-none"
            />
            <input
              name="engagementScore"
              type="number"
              min="0"
              max="100"
              value={lead.engagementScore}
              onChange={handleChange}
              placeholder="Engagement Score (0‑100)"
              className="px-3 py-2 bg-brand-surfaceAlt border border-brand-border rounded text-sm text-brand-text placeholder:text-brand-textDim focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="col-span-2 mt-2 px-4 py-2 bg-brand-teal text-white rounded hover:bg-brand-teal/80 disabled:opacity-50"
            >
              {loading ? "Scoring…" : "Score Lead"}
            </button>
          </form>

          {error && (
            <p className="mt-2 text-sm text-brand-red">Error: {error}</p>
          )}

          {result && result.success && (
            <div className="mt-4 p-3 bg-brand-surfaceAlt/50 border border-brand-border rounded">
              <p className="font-medium text-brand-text">Score: <span className="text-brand-teal">{result.score}</span></p>
              <p className="text-sm text-brand-textDim mt-1">Rationale: {result.rationale}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
