// src/hooks/useRevenueForecast.js
import { useState, useEffect } from "react";

export function useRevenueForecast() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchForecast() {
      try {
        const res = await fetch("/api/revenue/forecast");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to fetch forecast");
        setForecast(json.forecast || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchForecast();
  }, []);

  return { forecast, loading, error };
}
