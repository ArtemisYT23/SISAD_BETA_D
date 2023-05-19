import styled from "styled-components";
import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useDispatch, useSelector } from "react-redux";

export const TotalCountFile = () => {
  const dispatch = useDispatch();
  const { analitycInfo } = useSelector((store) => store);
  const { Files } = analitycInfo;
  const [dataLineChart, setDataLineChart] = useState([]);

  useEffect(() => {
    const TotalCount = Files?.length / 1024;

    console.log(TotalCount);

    const GbData = TotalCount.toFixed(1);

    const dataName = ["Archivos"];

    const dataTotal = [GbData];

    const data = {
      labels: dataName,
      datasets: [
        {
          label: "Peso Total en GIGABYTE/GB",
          data: dataTotal,
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-200"),
          backgroundColor: documentStyle.getPropertyValue("--blue-200"),
          tension: 0.4,
        },
      ],
    };
    setDataLineChart(data);
  }, [Files]);

  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  const options = {
    stacked: false,
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          drawOnChartArea: false,
          color: surfaceBorder,
        },
      },
    },
  };

  return (
    <div className="card">
      <Chart type="bar" data={dataLineChart} options={options} />;
    </div>
  );
};
