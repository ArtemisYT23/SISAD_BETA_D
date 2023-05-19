import styled from "styled-components";
import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useDispatch, useSelector } from "react-redux";

export const InfoTopPersonNoDoc = () => {
  const dispatch = useDispatch();
  const { analitycInfo } = useSelector((store) => store);
  const { Documents, DocumentDetail } = analitycInfo;
  const [dataLineChart, setDataLineChart] = useState([]);

  useEffect(() => {
    const dataOption = [];
    Documents.map((docum) => {
      DocumentDetail.map((detail) => {
        if (docum.documentId == detail.documentId) {
          const obj = {
            documentId: docum.documentId,
            countFiles: detail.countFiles,
            values: docum.values[1],
          };
          dataOption.push(obj);
        }
      });
    });

    const sortedArr = dataOption.sort((a, b) => a.countFiles - b.countFiles); // Ordena los objetos por su propiedad "valor"
    const PersonTop = sortedArr.slice(0, 10);

    const Person = [];
    const Files = [];
    PersonTop.map((per) => {
      Person.push(per.values);
      Files.push(per.countFiles);
    });

    const data = {
      labels: Person,
      datasets: [
        {
          type: "bar",
          label: "Top Colaboradores Con Pocos Documentos",
          backgroundColor: documentStyle.getPropertyValue("--purple-900"),
          data: Files,
          borderColor: "white",
          borderWidth: 2,
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
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };

  return (
    <div className="card">
      <Chart type="line" data={dataLineChart} options={options} />
    </div>
  );
};
