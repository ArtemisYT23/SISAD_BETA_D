import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpenDetalleModal } from "../../../redux/states/ActionDocumentary";
import "./Styles/Container.css";
import { Tooltip } from "@material-ui/core";
import styled from "styled-components";

const SectionPreview = () => {
  const dispatch = useDispatch();
  const [seguiment, setSeguiment] = useState(false);
  const [detail, setDetail] = useState(true);
  const { filesCore, metaCore, indexCore, modalDocumentary, historyCore } =
    useSelector((store) => store);
  const { historyResourceDocu } = historyCore;
  const { modalPreview } = modalDocumentary;
  const { SelectedFile, SelectedUrlFile } = filesCore;
  const { IndexConfig } = indexCore;
  const { SelectedMetadata } = metaCore;
  const Option = ["N", "Tipo", "Recurso", "Accion", "Usuario", "Fecha"];
  const [IndexVisual, setIndexVisual] = useState([]);

  useEffect(() => {
    if (modalPreview == false) {
      setSeguiment(false);
      setDetail(true);
    }
    const IndexSort = IndexConfig.sort((a, b) => {
      if (a.position < b.position) {
        return -1;
      }
    });
    setIndexVisual(IndexSort);
  }, [modalPreview]);

  const HistorySeguimentArchive = () => {
    detail ? setDetail(false) : setDetail(false);
    seguiment ? setSeguiment(true) : setSeguiment(true);
  };

  const DetailArchive = () => {
    detail ? setDetail(true) : setDetail(true);
    seguiment ? setSeguiment(false) : setSeguiment(false);
  };

  return (
    <div className="Detallado">
      <div className="header">
        <div
          className="Icon-Header"
          onClick={() => dispatch(setOpenDetalleModal(false))}
        >
          X
        </div>
        <div className="Title-Header">
          <Tooltip title={SelectedFile?.name || "cargando"}>
            <h1>{SelectedFile?.name}</h1>
          </Tooltip>
        </div>
      </div>
      <div className="Main">
        <div
          className={detail ? `Detalle` : `Detalle-false`}
          onClick={() => DetailArchive()}
        >
          <h1>Detalle</h1>
        </div>
        <div
          className={seguiment ? `Seguimiento-True` : `Seguimiento`}
          onClick={() => HistorySeguimentArchive()}
        >
          <h2>Seguimiento</h2>
        </div>
      </div>

      {detail && (
        <>
          <br />
          {(() => {
            switch (SelectedFile?.extension) {
              case ".docx":
                return (
                  <div className="contenedor">
                    <iframe
                      className="ContentPdf"
                      src={`https://view.officeapps.live.com/op/embed.aspx?src=${SelectedUrlFile}`}
                      frameborder="0"
                    >
                      {" "}
                    </iframe>
                  </div>
                );
              case ".xlsx":
                return (
                  <div className="contenedor">
                    <iframe
                      frameborder="0"
                      className="ContentPdf"
                      src={`https://view.officeapps.live.com/op/embed.aspx?src=${SelectedUrlFile}`}
                    />
                  </div>
                );
              default:
                return (
                  <div className="contenedor">
                    <iframe
                      frameborder="0"
                      className="ContentPdf"
                      src={SelectedUrlFile}
                    />
                  </div>
                );
            }
          })()}

          <hr />
          <div className="father">
            <div className="uno">
              {IndexVisual ? (
                IndexVisual.map(({ id, name }) => (
                  <div className="Container-Celda-Meta">
                    <span key={id} className="title">
                      {name}
                    </span>
                  </div>
                ))
              ) : (
                <>NO DISPONIBLE</>
              )}
            </div>
            {SelectedMetadata != "" && (
              <div className="dos">
                {SelectedMetadata ? (
                  SelectedMetadata.values.map((meta, index) => (
                    <Tooltip title={meta}>
                      <div className="Container-Celda-Meta">
                        {meta.slice(0, 8) == "https://" && (
                          <ImgContent src={meta} alt="sin foto" />
                        )}
                        {meta.slice(0, 8) != "https://" && (
                          <span className="Celda-Meta">{meta}</span>
                        )}
                      </div>
                    </Tooltip>
                  ))
                ) : (
                  <>NO DISPONIBLE</>
                )}
              </div>
            )}
          </div>
        </>
      )}
      {seguiment && (
        <div className="ContainerSeguiment">
          {historyResourceDocu ? (
            historyResourceDocu.map((histo, index) => (
              <div className="ContainerDataName">
                <div className="TableNameSeguiment">
                  {Option.map((data, index) => (
                    <div className="ContentDataSeguiment">{data}</div>
                  ))}
                </div>
                <div className="TableDataSeguiment">
                  <div className="ContentNameSeguiment">{index + 1}</div>
                  <div className="ContentNameSeguiment">
                    {histo?.resourceType}
                  </div>
                  <div className="ContentNameSeguiment">
                    {histo?.resourceName}
                  </div>
                  <div className="ContentNameSeguiment">
                    {histo?.optionName}
                  </div>
                  <div className="ContentNameSeguiment">{histo?.userName}</div>
                  <div className="ContentNameSeguiment">
                    {histo?.dateOcurred}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionPreview;

const ImgContent = styled.img`
  width: 50px;
  height: 50px;
`;
