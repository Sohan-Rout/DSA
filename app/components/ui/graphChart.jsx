"use client";
import React, { useEffect, useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const ComplexityGraph = ({
  bestCase = null,
  averageCase = null,
  worstCase = null,
  maxN = 100,
  title = "Time Complexity Analysis"
}) => {
  // Scale the chart down on phones instead of letting it overflow horizontally
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const fontSize = isMobile ? 9 : 11;
  const strokeWidth = isMobile ? 2 : 3;
  const activeDotRadius = isMobile ? 4 : 6;

  // Generate data points with smoother curve for better visualization
  const data = [];
  for (let n = 1; n <= maxN; n++) {
    data.push({
      n,
      best: bestCase ? bestCase(n) : null,
      average: averageCase ? averageCase(n) : null,
      worst: worstCase ? worstCase(n) : null
    });
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 sm:p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="font-bold text-xs sm:text-base text-gray-900 dark:text-gray-100">n = {label}</p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center">
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-[10px] sm:text-sm">
                <span className="font-medium">{entry.name}:</span> {entry.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 sm:gap-6">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[10px] sm:text-sm text-gray-600 dark:text-gray-300">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-64 sm:h-100 my-1 p-1 sm:p-2 bg-neutral-50 dark:bg-neutral-900 rounded-2xl overflow-hidden">
      <h2 className="text-center text-base sm:text-2xl font-bold mb-1 text-gray-800 dark:text-gray-100">
        {title}
      </h2>

      <ResponsiveContainer width="100%" height="75%">
        <LineChart
          data={data}
          margin={
            isMobile
              ? { top: 5, right: 6, left: 0, bottom: 14 }
              : { top: 5, right: 10, left: 0, bottom: 20 }
          }
        >
          <CartesianGrid
            strokeDasharray="3 3"
            strokeOpacity={0.2}
            vertical={false}
          />

          <XAxis
            dataKey="n"
            axisLine={{ stroke: '#6b7280', strokeWidth: 0.5 }}
            tick={{ fill: '#6b7280', fontSize }}
            tickLine={{ stroke: '#6b7280' }}
            minTickGap={isMobile ? 20 : 5}
            label={{
              value: "Input Size (n)",
              position: "insideBottomRight",
              offset: isMobile ? -8 : -10,
              fill: '#6b7280',
              fontSize
            }}
          />

          <YAxis
            axisLine={{ stroke: '#6b7280', strokeWidth: 0.5 }}
            tick={{ fill: '#6b7280', fontSize }}
            tickLine={{ stroke: '#6b7280' }}
            width={isMobile ? 28 : 36}
            label={{
              value: "Operations",
              angle: -90,
              position: "insideLeft",
              fill: '#6b7280',
              fontSize,
              dy: 30
            }}
          />
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ 
              stroke: '#9ca3af',
              strokeWidth: 1,
              strokeDasharray: "3 3"
            }}
          />
          
          <ReferenceLine 
            y={0} 
            stroke="#9ca3af" 
            strokeWidth={0.5} 
            strokeOpacity={0.5} 
          />
          
          {bestCase && (
            <Line
              type="monotoneX"
              dataKey="best"
              stroke="#10b981"
              strokeWidth={strokeWidth}
              dot={false}
              activeDot={{
                r: activeDotRadius,
                strokeWidth: 2,
                stroke: "#fff",
                fill: "#10b981"
              }}
              name="Best Case"
              animationDuration={1800}
              animationEasing="ease-out"
            />
          )}
          
          {averageCase && (
            <Line
              type="monotoneX"
              dataKey="average"
              stroke="#3b82f6"
              strokeWidth={strokeWidth}
              dot={false}
              activeDot={{
                r: activeDotRadius,
                strokeWidth: 2,
                stroke: "#fff",
                fill: "#3b82f6"
              }}
              name="Average Case"
              animationDuration={1800}
              animationEasing="ease-out"
              animationBegin={300}
            />
          )}
          
          {worstCase && (
            <Line
              type="monotoneX"
              dataKey="worst"
              stroke="#ef4444"
              strokeWidth={strokeWidth}
              dot={false}
              activeDot={{
                r: activeDotRadius,
                strokeWidth: 2,
                stroke: "#fff",
                fill: "#ef4444"
              }}
              name="Worst Case"
              animationDuration={1800}
              animationEasing="ease-out"
              animationBegin={600}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      
      <Legend content={renderLegend} />
    </div>
  );
};

export default ComplexityGraph;