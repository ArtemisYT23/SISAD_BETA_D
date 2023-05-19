import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Chart } from "primereact/chart";
import { useState, useEffect } from "react";

export const FilterFileTypePerson = () => {
  const dispatch = useDispatch();
  const { analitycData } = useSelector((store) => store);
  const { ColaboratorFiles, UserSelected } = analitycData;
  const [dataLineChart, setDataLineChart] = useState([]);

  const colors = [
    {
      id: 0,
      name: "blue",
    },
    {
      id: 1,
      name: "red",
    },
    {
      id: 2,
      name: "purple",
    },
    {
      id: 3,
      name: "orange",
    },
    {
      id: 4,
      name: "yellow",
    },
    {
      id: 5,
      name: "green",
    },
    {
      id: 6,
      name: "gray",
    },
    {
      id: 7,
      name: "pink",
    },
    {
      id: 8,
      name: "lime",
    },
    {
      id: 9,
      name: "silver",
    },
  ];

  useEffect(() => {
    const newFileColaborator = [];
    const FileName = [];
    const NameColaborator = [];
    ColaboratorFiles.map((file) => {
      UserSelected.map((user) => {
        if (user.id == file.docMetadataCountFiles.Id) {
          if (file.docMetadataCountFiles.CountFiles > 0) {
            const obj = {
              CountFiles: file.docMetadataCountFiles.CountFiles,
              FileTypeName: file.docMetadataCountFiles.FileTypeName,
              Nombre: file.docMetadataCountFiles.NOMBRE,
            };
            newFileColaborator.push(obj);
            FileName.push(file.docMetadataCountFiles.FileTypeName);
            NameColaborator.push(file.docMetadataCountFiles.NOMBRE);
          }
        }
      });
    });

    // console.log(newFileColaborator);

    const fileArray = FileName.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    const ColaboratorNames = NameColaborator.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    const handleNewFile = [];
    newFileColaborator.map((col) => {
      if (handleNewFile == "") {
        fileArray.map((arr) => {
          const obj = {
            fileName: arr,
            CountFile: [],
            Nombre: [],
          };
          handleNewFile.push(obj);
        });
      }
      if (handleNewFile != "") {
        handleNewFile.map((handle) => {
          if (handle.fileName == col.FileTypeName) {
            handle.CountFile.push(col.CountFiles);
            handle.Nombre.push(col.Nombre);
          }
        });
      }
    });

    // console.log(handleNewFile);

    const newDataSets = [];
    handleNewFile.map((handle, i) => {
      colors.map((col) => {
        if (col.id == i) {
          const obj = {
            label: handle.fileName,
            data: handle.CountFile,
            fill: false,
            backgroundColor: documentStyle.getPropertyValue(
              `--${col.name}-500`
            ),
            borderColor: documentStyle.getPropertyValue("--purple-500"),
            tension: 0.4,
          };
          newDataSets.push(obj);
        }
      });
    });

    const data = {
      labels: ColaboratorNames,
      datasets: newDataSets,
    };

    setDataLineChart(data);
  }, [ColaboratorFiles]);

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
      <Chart type="bar" data={dataLineChart} options={options} />
    </div>
  );
};
