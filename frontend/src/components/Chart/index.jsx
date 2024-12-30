import { useContext } from "react";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../context/ThemeContext";

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-gray-800 text-white rounded-lg shadow-lg">
        {/* <p className="label">{label}</p> */}
        {payload.map((entry, index) => (
          <div className="flex items-center gap-2" key={`item-${index}`}>
            <span
              style={{
                backgroundColor:
                  entry.dataKey === "income"
                    ? "#10b981"
                    : entry.dataKey === "expense"
                    ? "#ef4444"
                    : "white",
                height: "7px",
                width: "7px",
                borderRadius: "50%",
              }}
            ></span>
            <p
              style={{
                color:
                  entry.dataKey === "income"
                    ? "#10b981"
                    : entry.dataKey === "expense"
                    ? "#ef4444"
                    : "white",
              }}
            >
              {`${entry.name}: ${entry.value}`}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

// AmountsBarChart component
const AmountsBarChart = ({ data }) => {
  const { theme } = useContext(ThemeContext);

  const axisColor = theme === "dark" ? "#ffffff" : "#000000";
  const gridColor = theme === "dark" ? "#333333" : "#444444";
  const tooltipBgColor = theme === "dark" ? "#333333" : "#ffffff";
  const tooltipTextColor = theme === "dark" ? "#ffffff" : "#000000";
  const cursorFill =
    theme === "dark" ? "rgba(205, 205, 205, 0.1)" : "rgba(205, 205, 205, 0.3)";

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 40,
          left: 20,
          bottom: 20,
        }}
      >
        <defs>
          <linearGradient id="incomeBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#10b981" stopOpacity={1} />
            {/* <stop offset="1" stopColor="#10b981" stopOpacity={0} /> */}
          </linearGradient>
          <linearGradient id="expenseBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={1} />
            {/* <stop offset="95%" stopColor="#ef4444" stopOpacity={0} /> */}
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="5 5" stroke={gridColor} />
        <XAxis
          dataKey="name"
          stroke={axisColor}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          padding={{ left: 5, right: 5 }}
        />
        <YAxis
          stroke={axisColor}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          contentStyle={{
            backgroundColor: tooltipBgColor,
            color: tooltipTextColor,
            borderRadius: "10px",
          }}
          cursor={{ fill: cursorFill }}
        />
        <Legend />
        <Bar
          dataKey="income"
          label="income"
          fill="url(#incomeBar)"
          barSize={25}
          radius={4}
          className="cursor-pointer"
        />
        <Bar
          dataKey="expense"
          label="expense"
          fill="url(#expenseBar)"
          barSize={25}
          radius={4}
          className="cursor-pointer"
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AmountsBarChart;
