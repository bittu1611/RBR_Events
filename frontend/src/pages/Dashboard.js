import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

const data = [
  { month: "Jan", events: 8 },
  { month: "Feb", events: 10 },
  { month: "Mar", events: 7 },
  { month: "Apr", events: 12 },
  { month: "May", events: 15 },
  { month: "Jun", events: 11 },
];

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 RBR Dashboard</h2>
      <p className="dashboard-sub">Your business overview at a glance</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Events</h3>
          <p>128</p>
        </div>
        <div className="stat-card">
          <h3>Bookings</h3>
          <p>57</p>
        </div>
        <div className="stat-card">
          <h3>Happy Clients</h3>
          <p>94%</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p>₹2.4L</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Monthly Event Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#CB0075" />
            <XAxis dataKey="month" stroke="#F8D210" />
            <YAxis stroke="#F8D210" />
            <Tooltip />
            <Line type="monotone" dataKey="events" stroke="#F51720" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
