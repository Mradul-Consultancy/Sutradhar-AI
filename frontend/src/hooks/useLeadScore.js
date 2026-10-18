// src/hooks/useLeadScore.js
import { useState } from "react";

export function useLeadScore() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const scoreLead = async (lead) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/lead/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Lead scoring failed");
      setResult(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { scoreLead, loading, error, result };
}
