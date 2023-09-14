import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { GraphData } from '../models/Currency';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
interface DataProps {
  data: GraphData[];
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export default function LineChart({ data }: DataProps) {
  const [graphData, setGraphData] = useState<GraphData[]>(data || []);

  useEffect(() => {
    setGraphData(data);
  }, [data]);

  const labels = graphData.map((item) => {
    const timestamp = new Date(item.timestamp);
    const monthName = timestamp.toLocaleString('en-US', { month: 'long' });
    return `${timestamp.getDate()} ${monthName}`;
  });
  const dataset = {
    label: 'INR Mid Value',
    data: graphData.map((item) => item.mid),
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  };

  const chartData = {
    labels,
    datasets: [dataset],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
