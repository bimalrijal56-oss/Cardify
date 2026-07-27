import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const INFO_COLOR = '#0dcaf0';

const ClicksChart = ({ cards = [] }) => {
  const data = cards.map((card) => ({
    name: card.name || `Card ${card.uuid}`,
    views: card.views || 0,
  }));

  if (data.length === 0) {
    return (
<div
  style={{
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    overflow: 'hidden',
    background: '#111417',
    border: '1px solid #1f2933',
    borderRadius: '16px',
    padding: 'clamp(12px, 3vw, 24px)',
    boxSizing: 'border-box',
  }}
>
        No card data yet
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        margin: '0 auto',
        overflow: 'hidden',
        background: '#111417',
        border: '1px solid #1f2933',
        borderRadius: '16px',
        padding: 'clamp(12px, 3vw, 24px)',
        boxSizing: 'border-box',
      }}
    >
      <div className="chart-container" style={{ width: '100%', minWidth: 0 }}>
        <ResponsiveContainer width="100%" height="100%" debounce={1}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2933" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
              axisLine={{ stroke: '#1f2933' }}
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={50}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
              axisLine={{ stroke: '#1f2933' }}
              tickLine={false}
              width={30}
            />
            <Tooltip
              cursor={{ fill: 'rgba(13, 202, 240, 0.08)' }}
              contentStyle={{
                background: '#181c20',
                border: '1px solid #1f2933',
                borderRadius: 8,
                fontSize: 12,
                color: '#fff',
              }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="views" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {data.map((_, index) => (
                <Cell key={index} fill={INFO_COLOR} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClicksChart;