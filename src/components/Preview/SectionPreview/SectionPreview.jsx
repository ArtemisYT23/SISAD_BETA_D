import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpenDetalleModal } from "../../../redux/states/ActionDocumentary";
import "./Styles/Container.css";

const SectionPreview = () => {
  const dispatch = useDispatch();
  const [seguiment, setSeguiment] = useState(false);
  const [detail, setDetail] = useState(true);
  const { filesCore, metaCore, indexCore, modalDocumentary, historyCore } =
    useSelector((store) => store);
  const { historyResourceDocu } = historyCore;
  const { modalPreview } = modalDocumentary;
  const { SelectedFile, SelectedUrlFile } = filesCore;
  const { IndexPreview } = indexCore;
  const { SelectedMetadata } = metaCore;
  const Option = ["N", "Tipo", "Recurso", "Accion", "Usuario", "Fecha"];

  useEffect(() => {
    if (modalPreview == false) {
      setSeguiment(false);
      setDetail(true);
    }
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
          <h1>{SelectedFile?.name}</h1>
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
          {SelectedUrlFile != "" && (
            <div className="contenedor">
              <iframe
                frameBorder={10}
                className="ContentPdf"
                src={SelectedUrlFile}
              />
            </div>
          )}

          <hr />
          <div className="father">
            <div className="uno">
              {IndexPreview ? (
                IndexPreview.map(({ id, name }) => (
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
                    <div className="Container-Celda-Meta">
                      <span className="Celda-Meta">{meta}</span>
                    </div>
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
                  <div className="ContentNameSeguiment">{histo.resourceType}</div>
                  <div className="ContentNameSeguiment">{histo.resourceName}</div>
                  <div className="ContentNameSeguiment">{histo.optionName}</div>
                  <div className="ContentNameSeguiment">{histo.userName}</div>
                  <div className="ContentNameSeguiment">{histo.dateOcurred}</div>
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
