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
import "./InfoSchedule.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function InfoSchedule({ price, date, symbol }) {
  const [dates, setDates] = useState([]);
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);

  let flag = true;
  useEffect(() => {
    if (flag) {
      setDates([]);
      flag = false;
      let date1 = new Date(date);

      for (let i = 0; i < price.price.length; i++) {
        date1.setHours(date1.getHours() - 1);
        dates.unshift(date1.toString());
      }

      console.log(dates.length);
      setData({
        labels: dates,
        datasets: [
          {
            label: symbol,
            data: price.price,
            fill: false,
            backgroundColor: "rgb(25, 118, 212)",
            borderColor: "rgb(25, 118, 210)",
          },
        ],
      });
    
      setOptions({
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
    
        tooltips: {
          intersect: false,
          caretSize: 3,
          borderWidth: 1,
          displayColors: false,
    
          callbacks: {
            title() {
              return "";
            },
          },
        },
        elements: {
          point: {
            radius: 3,
            hoverRadius: 7,
            hitRadius: 7
          },
        },
        scales: {
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
    }
  }, [date]);

  if (data === null && options === null && dates.length === 0)
    return <>loading...</>;

  return (
    <div className="info-schedule">
        <Line className="schedule" data={data} options={options} />
    </div>
  );
}