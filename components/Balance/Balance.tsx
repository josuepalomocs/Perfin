import { faker } from "@faker-js/faker";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./styles/balance.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

ChartJS.defaults.backgroundColor = "#b1b1b1";
ChartJS.defaults.borderColor = "#b1b1b1";
ChartJS.defaults.color = "#b1b1b1";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["Dec 2", "Dec 4", "Dec 6", "Dec 8", "Dec 10", "Dec 12"];

export const data = {
  labels,
  datasets: [
    {
      label: "Balance",
      data: labels.map(() => {
        return faker.finance.amount(-5555, 5555);
      }),
      borderColor: "#b1b1b1",
      backgroundColor: "#b1b1b1",
      tension: 0.4,
    },
  ],
};

const Balance = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.top}>
        <Typography className={styles.title} variant="inherit">
          Balance
        </Typography>
      </Box>
      <Box className={styles.bottom}>
        <Line options={options} data={data} />
      </Box>
    </Box>
  );
};

export default Balance;
