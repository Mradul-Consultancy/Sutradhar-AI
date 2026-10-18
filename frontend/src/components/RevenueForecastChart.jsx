// src/components/RevenueForecastChart.jsx
import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useRevenueForecast } from "../hooks/useRevenueForecast";

export default function RevenueForecastChart() {
  const { forecast, loading, error } = useRevenueForecast();

  if (loading) {
    return <div className="text-brand-textDim text-sm">Loading revenue forecast...</div>;
  }
  if (error) {
    return <div className="text-brand-red text-sm">Error: {error}</div>;
  }
  if (!forecast || forecast.length === 0) {
    return <div className="text-brand-textDim text-sm">No forecast data available.</div>;
  }

  const data = forecast.map(item => ({ month: item.month, forecast: item.forecast }));

  return (
    <div className="my-4 p-4 bg-brand-surface/70 backdrop-blur-md rounded-xl border border-brand-border">
      <h2 className="text-sm font-medium text-brand-text mb-2">Revenue Forecast (Next 6 months)</h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818CF8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#818CF8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="month" stroke="#EAF0FB" />
          <YAxis tickFormatter={value => `$${(value / 1000).toFixed(0)}k`} stroke="#EAF0FB" />
          <Tooltip
            contentStyle={{ backgroundColor: "#0E1422", border: "1px solid #1F2A40", color: "#EAF0FB" }}
            formatter={val => `$${val.toLocaleString()}`}
          />
          <Area type="monotone" dataKey="forecast" stroke="#818CF8" fillOpacity={1} fill="url(#colorForecast)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
