import {
      Chart as ChartJS,
      BarElement,
      CategoryScale,
      LinearScale
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function ChartCard({ data }) {
      const chartData = {
            labels: data.map((item, i) => `Test ${i + 1}`),
            datasets: [
                  {
                        label: "Predictions",
                        data: data,
                  },
            ],
      };

      return (
            <div className="card p-3 shadow mt-4">
                  <h5>Prediction Analytics</h5>
                  <Bar data={chartData} />
            </div>
      );
}

export default ChartCard;