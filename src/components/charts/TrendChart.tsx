"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface TrendDataPoint {
  date: string;
  pollution: number;
  biodiversity: number;
  bleaching: number;
}

interface TrendChartProps {
  data: TrendDataPoint[];
  title?: string;
}

export default function TrendChart({
  data,
  title = "30-Day Trend",
}: TrendChartProps) {
  return (
    <div className="glass-card p-4">
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, bottom: 5, left: -10 }}
          >
            <defs>
              <linearGradient id="gradPollution" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id="gradBiodiversity"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradBleaching" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "rgba(232,236,241,0.4)" }}
              tickFormatter={(v: string) => {
                const d = new Date(v);
                return `${d.getMonth() + 1}/${d.getDate()}`;
              }}
              stroke="rgba(255,255,255,0.1)"
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "rgba(232,236,241,0.4)" }}
              stroke="rgba(255,255,255,0.1)"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(56,189,248,0.15)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#E8ECF1",
              }}
              labelFormatter={(label) => {
                return new Date(String(label)).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
            />
            <Area
              type="monotone"
              dataKey="pollution"
              name="Pollution"
              stroke="#f87171"
              fill="url(#gradPollution)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="biodiversity"
              name="Biodiversity"
              stroke="#34d399"
              fill="url(#gradBiodiversity)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="bleaching"
              name="Bleaching"
              stroke="#fb923c"
              fill="url(#gradBleaching)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
