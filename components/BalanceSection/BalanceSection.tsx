import React from "react";
import { Box, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { faker } from "@faker-js/faker";
import styles from "./styles/balanceSection.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

ChartJS.defaults.backgroundColor = "#FFFFFF";
ChartJS.defaults.borderColor = "#121212";
ChartJS.defaults.color = "#b1b1b1";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const data = {
  labels,
  datasets: [
    {
      label: "Balance amount",
      data: labels.map(() => faker.random.numeric()),
      borderColor: "#3c5abe",
      backgroundColor: "#3c5abe",
      tension: 0.4,
    },
  ],
};

const BalanceSection = () => {
  return (
    <Box className={styles.container}>
      <Typography className={styles.title} variant="inherit">
        Balance
      </Typography>
      <Box className={styles.lineGraphBox}>
        <Line options={options} data={data} />
      </Box>
    </Box>
  );
};

export default BalanceSection;
