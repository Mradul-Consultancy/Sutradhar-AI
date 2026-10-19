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
    <div className="rounded-2xl p-6 border border-brand-border bg-brand-surface/75 backdrop-blur-xl hover:border-brand-teal/25 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-textDim font-space">
            Revenue Forecast (Next 6 Months)
          </h2>
          <p className="text-[10px] text-brand-textDim/70 font-mono mt-0.5">
            AI-modeled forward cash flow projection based on deal velocities
          </p>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-brand-indigo/15 text-brand-indigo border border-brand-indigo/30 font-bold">
          FORWARD PROJECTION
        </span>
      </div>
      <div style={{ height: 210 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818CF8" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#818CF8" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="month" stroke="#7C8AA8" tick={{ fontSize: 11, fontFamily: "Inter" }} axisLine={{ stroke: "#1F2A40" }} tickLine={false} />
            <YAxis tickFormatter={value => `₹${(value / 1000).toFixed(0)}k`} stroke="#7C8AA8" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} width={50} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0E1422", border: "1px solid #1F2A40", borderRadius: "10px", color: "#EAF0FB", fontSize: "12px", fontFamily: "Inter" }}
              formatter={val => [`₹${val.toLocaleString("en-IN")}`, "Projected"]}
            />
            <Area type="monotone" dataKey="forecast" stroke="#818CF8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorForecast)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
