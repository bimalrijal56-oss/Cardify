import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ClicksChart = ({ cards = [] }) => {
  const totalViews = cards.reduce((acc, card) => acc + (Number(card.views) || 0), 0);

  // If user has cards, distribute their real views across cards or recent days
  const chartData =
    cards.length > 0
      ? cards.slice(0, 7).map((card) => ({
          day: card.name ? (card.name.length > 8 ? card.name.slice(0, 8) + '…' : card.name) : 'Card',
          views: Number(card.views) || 0,
        }))
      : [
          { day: 'Mon', views: 0 },
          { day: 'Tue', views: 0 },
          { day: 'Wed', views: 0 },
          { day: 'Thu', views: 0 },
          { day: 'Fri', views: 0 },
          { day: 'Sat', views: 0 },
          { day: 'Sun', views: 0 },
        ];

  return (
    <div className="analytics-chart-container" style={{ width: '100%', height: 210 }}>
      {cards.length === 0 ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            fontSize: '0.85rem',
            textAlign: 'center',
            padding: '1rem',
          }}
        >
          <p className="mb-1 fw-medium text-secondary">No analytics recorded yet</p>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Create and share cards to see live view performance.
          </span>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.05)" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip
              contentStyle={{
                background: '#0f172a',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#ffffff',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
              }}
              itemStyle={{ color: '#60a5fa' }}
              labelStyle={{ color: '#cbd5e1', fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#2563eb"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorViews)"
              dot={{ r: 3, fill: '#2563eb', strokeWidth: 1, stroke: '#ffffff' }}
              activeDot={{ r: 6, fill: '#1d4ed8', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ClicksChart;