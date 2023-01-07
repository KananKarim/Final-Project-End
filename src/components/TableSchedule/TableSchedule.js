import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TableSchedule({ price, date }) {
  const [dates, setDates] = useState([]);
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
      setDates([]);
      let date1 = new Date(date);

      for (let i = 0; i < price.price.length; i++) {
        date1.setHours(date1.getHours() - 1);
        dates.unshift(date1.toString());
      }

      let borderColor = "";
      if (price.price[0] < price.price[price.price.length - 1])
        borderColor = "rgb(0,128,0)";
      else borderColor = "rgb(255,0,0)";

      setData({
        labels: dates,
        datasets: [
          {
            data: price.price,
            fill: false,
            pointBorderColor: "transparent",
            pointBackgroundColor: "transparent",
            backgroundColor: "rgb(255, 255, 255)",
            borderColor: borderColor,
          },
        ],
      });
      setOptions({
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0,
            hoverRadius: 0,
            hitRadius: 0,
          },
        },
        maintainAspectRatio: false,
        tooltips: {
          mode: false,
          callbacks: {
            title: function () {},
            label: function () {},
          },
        },
        scales: {
          y: {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            grid: {
              drawBorder: false,
              display: false,
            },
          },
          x: {
            ticks: {
              display: false,
            },
            grid: {
              drawBorder: false,
              display: false,
            },
          },
        },
      });
  }, []);

  if (data === null && options === null && dates.length === 0)
    return <>loading...</>;

  return <Line data={data} options={options} />;
} 