import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { getRevenue } from "./stores/action";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenuePage = () => {
  const dispatch = useDispatch();

  const revenue = useSelector((state) => state.revenueReducer.data);

  const [year, setYear] = useState(new Date().getFullYear());

  const d = new Date();
  const month = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const labels =
    year === new Date().getFullYear()
      ? month.slice(0, d.getMonth() + 1)
      : month;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: revenue,
        borderColor: "rgb(28, 103, 123)",
        backgroundColor: "rgba(28, 103, 123, 1)",
      },
    ],
  };

  useEffect(() => {
    dispatch(getRevenue({ year }));
  }, [year]);

  return (
    <section className="revenue">
      <div className="container">
        <p className="title">Thống kê doanh thu</p>
        <select
          name="year"
          id="year"
          onChange={(e) => setYear(parseInt(e.target.value))}
        >
          {[...Array(5)].map((item, index) => {
            return (
              <option value={d.getFullYear() - index} key={index}>
                {d.getFullYear() - index}
              </option>
            );
          })}
        </select>
        <Bar options={options} data={data} />
      </div>
    </section>
  );
};

export default RevenuePage;
