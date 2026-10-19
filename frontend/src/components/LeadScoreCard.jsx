// src/components/LeadScoreCard.jsx
import React, { useState } from "react";
import { Target, X, Sparkles, Loader2 } from "lucide-react";
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
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-border bg-brand-surfaceAlt/70 hover:bg-brand-surfaceAlt hover:border-brand-teal/40 text-xs text-brand-text font-medium transition-all"
        title="Score a potential lead using AI heuristics"
      >
        <Target size={13} className="text-brand-teal" />
        <span>Score Lead</span>
      </button>

      {open && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-bg/80 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setOpen(false)}
        >
          <div 
            className="w-full max-w-lg p-6 bg-brand-surface border border-brand-border/80 rounded-2xl shadow-2xl space-y-4 animate-scaleIn relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-text font-space">AI Lead Qualification Engine</h3>
                  <p className="text-[10px] text-brand-textDim">Compute conversion probability score based on account parameters</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-brand-textDim hover:text-brand-text p-1.5 rounded-lg border border-brand-border hover:bg-brand-surfaceAlt"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 md:grid-cols-2 pt-1">
              <input
                name="name"
                value={lead.name}
                onChange={handleChange}
                placeholder="Lead / Contact Name"
                className="px-3.5 py-2 bg-brand-surfaceAlt border border-brand-border rounded-xl text-xs text-brand-text placeholder:text-brand-textDim/60 focus:outline-none focus:border-brand-teal"
              />
              <input
                name="company"
                value={lead.company}
                onChange={handleChange}
                placeholder="Company Name"
                className="px-3.5 py-2 bg-brand-surfaceAlt border border-brand-border rounded-xl text-xs text-brand-text placeholder:text-brand-textDim/60 focus:outline-none focus:border-brand-teal"
              />
              <input
                name="industry"
                value={lead.industry}
                onChange={handleChange}
                placeholder="Industry (e.g. SaaS, Fintech)"
                className="px-3.5 py-2 bg-brand-surfaceAlt border border-brand-border rounded-xl text-xs text-brand-text placeholder:text-brand-textDim/60 focus:outline-none focus:border-brand-teal"
              />
              <input
                name="revenue"
                type="number"
                value={lead.revenue}
                onChange={handleChange}
                placeholder="Annual Revenue (₹)"
                className="px-3.5 py-2 bg-brand-surfaceAlt border border-brand-border rounded-xl text-xs text-brand-text placeholder:text-brand-textDim/60 focus:outline-none focus:border-brand-teal"
              />
              <input
                name="employeeCount"
                type="number"
                value={lead.employeeCount}
                onChange={handleChange}
                placeholder="Employee Count"
                className="px-3.5 py-2 bg-brand-surfaceAlt border border-brand-border rounded-xl text-xs text-brand-text placeholder:text-brand-textDim/60 focus:outline-none focus:border-brand-teal"
              />
              <input
                name="engagementScore"
                type="number"
                min="0"
                max="100"
                value={lead.engagementScore}
                onChange={handleChange}
                placeholder="Engagement Level (0-100)"
                className="px-3.5 py-2 bg-brand-surfaceAlt border border-brand-border rounded-xl text-xs text-brand-text placeholder:text-brand-textDim/60 focus:outline-none focus:border-brand-teal"
              />
              <button
                type="submit"
                disabled={loading}
                className="col-span-1 md:col-span-2 mt-2 px-4 py-2.5 bg-brand-teal text-[#0A0E1A] font-bold text-xs rounded-xl hover:bg-brand-teal/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Target size={14} />}
                <span>{loading ? "Analyzing Parameters..." : "Calculate Lead Score"}</span>
              </button>
            </form>

            {error && (
              <p className="text-xs text-brand-red bg-brand-red/10 border border-brand-red/20 p-2.5 rounded-xl font-mono">
                Error: {error}
              </p>
            )}

            {result && result.success && (
              <div className="p-3.5 bg-brand-surfaceAlt border border-brand-teal/30 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-text">AI Evaluation Result</span>
                  <span className="text-sm font-bold font-mono text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded border border-brand-teal/30">
                    Score: {result.score}/100
                  </span>
                </div>
                <p className="text-xs text-brand-textDim mt-1 leading-relaxed">
                  {result.rationale}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
