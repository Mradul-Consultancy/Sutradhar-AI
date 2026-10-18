// backend/services/forecasting.js
// Simple revenue forecasting service – returns dummy forecast data for the next 6 months.
// In a real implementation this could use historical deal data and a statistical model.

/**
 * Get a revenue forecast for the upcoming months.
 * @returns {Promise<Array<{ month: string, forecast: number }>>}
 */
async function getRevenueForecast() {
  // Dummy data – you can replace with real calculations later.
  const forecast = [
    { month: 'Jan', forecast: 800000 },
    { month: 'Feb', forecast: 850000 },
    { month: 'Mar', forecast: 900000 },
    { month: 'Apr', forecast: 950000 },
    { month: 'May', forecast: 1000000 },
    { month: 'Jun', forecast: 1050000 },
  ];
  return forecast;
}

module.exports = { getRevenueForecast };
