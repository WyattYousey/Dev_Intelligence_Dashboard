import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../components/styles/LanguageChart.css';

const LanguageChart = ({ languageData }) => {
  if (!languageData) return null;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels: Object.keys(languageData),
    datasets: [
      {
        label: 'Language Usage',
        data: Object.values(languageData),
        backgroundColor: '#72a17e',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          color: '#ffffff',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="language_chart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default LanguageChart;
