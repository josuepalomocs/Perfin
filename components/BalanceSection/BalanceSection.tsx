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

const labels = [
  "Dec 2",
  "Dec 4",
  "Dec 6",
  "Dec 8",
  "Dec 2",
  "Dec 4",
  "Dec 6",
  "Dec 8",
  "Dec 2",
  "Dec 4",
  "Dec 6",
  "Dec 8",
  "Dec 2",
  "Dec 4",
  "Dec 6",
  "Dec 8",
  "Dec 2",
  "Dec 4",
  "Dec 6",
  "Dec 8",
  "Dec 2",
  "Dec 4",
  "Dec 6",
  "Dec 8",
  "Dec 2",
  "Dec 4",
  "Dec 6",
  "Dec 8",
  "Dec 2",
  "Dec 4",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Balance",
      data: labels.map(() => {
        return faker.finance.amount(-5555, 5555);
      }),
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
