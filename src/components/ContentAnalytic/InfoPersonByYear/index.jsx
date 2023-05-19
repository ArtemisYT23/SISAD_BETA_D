import styled from "styled-components";
import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useDispatch, useSelector } from "react-redux";

export const InfoPersonByYear = () => {
  const dispatch = useDispatch();
  const { analitycInfo } = useSelector((store) => store);
  const { DocumentDetail } = analitycInfo;
  const [dataLineChart, setDataLineChart] = useState([]);

  useEffect(() => {
    const DocModel = [];
    DocumentDetail.map((docum, i) => {
      const obj = {
        documentId: docum.documentId,
        documentCreatedAt: docum.documentCreatedAt.slice(6, 10),
        countFiles: docum.countFiles,
      };
      DocModel.push(obj);
    });

    //cantidad por año
    const dataAnterior = DocModel.filter((x) => x.documentCreatedAt == 2022);

    const dataActual = DocModel.filter((x) => x.documentCreatedAt == 2023);

    const dataFutura = DocModel.filter((x) => x.documentCreatedAt == 2024);

    const dataTimeYear = [
      {
        year: 2022,
        total: dataAnterior?.length,
      },
      {
        year: 2023,
        total: dataActual?.length,
      },
      {
        year: 2024,
        total: dataFutura?.length,
      },
    ];

    const Total = [];
    const Year = [];
    dataTimeYear.map((time) => {
      Total.push(time.total);
      Year.push(time.year);
    });

    const data = {
      labels: Year,
      datasets: [
        {
          label: "Colaboradores por Año",
          backgroundColor: documentStyle.getPropertyValue("--purple-800"),
          borderColor: documentStyle.getPropertyValue("--purple-800"),
          data: Total,
        },
      ],
    };
    setDataLineChart(data);
  }, [DocumentDetail]);

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
