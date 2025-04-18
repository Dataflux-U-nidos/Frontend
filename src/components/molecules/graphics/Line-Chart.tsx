import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
type LineChartComponentProps = {
    data: {
      name: string;
      [key: string]: string | number;
    }[];
  };
  
  export const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
    const keys = Object.keys(data[0] || {}).filter((key) => key !== "name");
  
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#f87171", "#38bdf8", "#34d399"];
  
    return (
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {keys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };
  