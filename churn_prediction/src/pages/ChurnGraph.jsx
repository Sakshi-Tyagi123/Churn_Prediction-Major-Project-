import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const ChurnGraph = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  // Count churned and non-churned customers
  const churnCount = data.filter((item) => item.Churn_Prediction === "Yes").length;
  const noChurnCount = data.length - churnCount;

  // Data for bar chart
  const barData = [
    { name: "Churned", count: churnCount },
    { name: "Not Churned", count: noChurnCount }
  ];

  // Data for pie chart
  const pieData = [
    { name: "Churned", value: churnCount },
    { name: "Not Churned", value: noChurnCount }
  ];

  const COLORS = ["#FF4D4D", "#4CAF50"];

  return (
    <div className="churn-graphs">
      <h2>Customer Churn Analysis</h2>
      
      <div className="graph-container">
        {/* Bar Chart */}
        <div className="bar-chart">
          <h3>Churn vs Non-Churned Customers</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="count" fill="#8884d8" name="Customer Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="pie-chart">
          <h3>Churn Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Legend verticalAlign="bottom" align="center" />
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChurnGraph;
