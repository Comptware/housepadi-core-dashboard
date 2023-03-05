import React from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

const ChartArea = () => {
  Chart.register(...registerables);

  const data = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        label: "# of Votes",
        data: ["300", "200", "500", "800", "750", "500", "1000"],
        backgroundColor: ["#EDB800"],
        pointBackgroundColor: "#fff",
        borderColor: "#5887D7",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#909090",
          stepSize: 250,
          font: {
            size: 11,
          },
        },
        grid: {
          borderDash: [5, 5],
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: "#909090",
          stepSize: 250,
          font: {
            size: 11,
          },
        },
        offset: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default ChartArea;
