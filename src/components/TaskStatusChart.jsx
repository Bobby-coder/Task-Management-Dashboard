import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useSelector } from "react-redux";

const TaskStatusChart = () => {
  const { items } = useSelector((state) => state.task);
  // Group tasks by status
  const statusCounts = items.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  // Convert grouped data to chart-friendly format
  const chartData = Object.entries(statusCounts).map(
    ([status, count], index) => ({
      status,
      tasks: count,
      fill: `hsl(var(--chart-${index + 1}))`, // Dynamically set chart colors
    })
  );

  // Chart config for status
  const chartConfig = {
    tasks: {
      label: "Tasks",
    },
    Todo: {
      label: "Todo",
      color: "hsl(var(--chart-1))",
    },
    "In Progress": {
      label: "In Progress",
      color: "hsl(var(--chart-2))",
    },
    Done: {
      label: "Done",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 tracking-wide mb-4">
        Task Distribution by Status
      </h2>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[300px]"
      >
        <PieChart>
          <Pie data={chartData} dataKey="tasks" nameKey="status" />
          <ChartLegend
            content={<ChartLegendContent nameKey="status" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default TaskStatusChart;
