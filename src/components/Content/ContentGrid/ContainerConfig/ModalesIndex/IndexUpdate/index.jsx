import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { TextField, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenModalConfigUpdate } from "../../../../../../redux/states/ActionConfig";
import {
  setIdUpdateIndex,
  setNameUpdateIndex,
  setDescriptionUpdateIndex,
  setPositionUpdateIndex,
  setDataTypeIdUpdateIndex,
  setListIdUpdateIndex,
  setRequiredUpdateIndex,
  setUniqueUpdateIndex,
  setMinValueUpdateIndex,
  setMaxValueUpdateIndex,
  setXmlReferenceUpdateIndex,
  setClearUpdateIndex,
} from "../../../../../../redux/formData/IndexData";
import {
  TitleModal,
  TitleArchive,
  SaveButton,
  CancelButton,
  Selected,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import { setIndexCabinetUpdateConfig } from "../../../../../../redux/states/Indexes";

const useStyless = makeStyles((theme) => ({
  IndexUpdate: {
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "13px",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const IndexUpdate = () => {
  const dispatch = useDispatch();
  const styless = useStyless();

  const {
    modalConfig,
    listCore,
    typeDataCore,
    indexData,
    indexCore,
    cabinetCore,
  } = useSelector((store) => store);
  const { IndexUpdate } = modalConfig;
  const { TypeData } = typeDataCore;
  const { ListData } = listCore;
  const { cabinets, UpdateSelectedCabinet } = cabinetCore;
  const { IndexSelected } = indexCore;
  const {
    idUpdate,
    nameUpdate,
    descriptionUpdate,
    position,
    dataTypeIdUpdate,
    listIdUpdate,
    requiredUpdate,
    uniqueUpdate,
    minValueUpdate,
    maxValueUpdate,
    xmlReferenceUpdate,
  } = indexData;

  useEffect(() => {
    dispatch(setIdUpdateIndex(IndexSelected?.id));
    dispatch(setNameUpdateIndex(IndexSelected?.name));
    dispatch(setDescriptionUpdateIndex(IndexSelected?.description));
    dispatch(setPositionUpdateIndex(IndexSelected?.position));
    dispatch(setDataTypeIdUpdateIndex(IndexSelected?.dataTypeId));
    dispatch(setListIdUpdateIndex(IndexSelected?.listId));
    dispatch(setRequiredUpdateIndex(IndexSelected?.required));
    dispatch(setUniqueUpdateIndex(IndexSelected?.unique));
    dispatch(setMinValueUpdateIndex(IndexSelected?.minValue));
    dispatch(setMaxValueUpdateIndex(IndexSelected?.maxValue));
    dispatch(setXmlReferenceUpdateIndex(IndexSelected?.xmlReference));
  }, [IndexUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formIndex = {
        id: idUpdate,
        name: nameUpdate,
        description: descriptionUpdate,
        position: position,
        dataTypeId: dataTypeIdUpdate,
        listId: listIdUpdate,
        required: requiredUpdate,
        unique: uniqueUpdate,
        minValue: minValueUpdate,
        maxValue: maxValueUpdate,
        xmlReference: xmlReferenceUpdate
    };
    console.log(formIndex);
    dispatch(setIndexCabinetUpdateConfig(formIndex, idUpdate, UpdateSelectedCabinet?.name)
    );
    OpenModalUpdateIndex();
  };

  const handleChange = (value) => {
    dispatch(setListIdUpdateIndex(value));
  };

  const bodyIndexUpdate = (
    <div className={styless.IndexUpdate}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>ACTUALIZAR ÍNDICE {IndexSelected?.name}</TitleModal>
        </div>
        <br />

        <TextField
          value={nameUpdate}
          onChange={(e) => dispatch(setNameUpdateIndex(e.target.value))}
          required={true}
          placeholder="nombre del índice"
          className={styless.textfield}
        />
        <br />

        <TextField
          value={descriptionUpdate}
          onChange={(e) => dispatch(setDescriptionUpdateIndex(e.target.value))}
          required={true}
          placeholder="Descripción"
          className={styless.textfield}
        />
        <br />
        <br />

        <TitleArchive>Tipo de Dato:</TitleArchive>
        <Selected
          onChange={(e) => dispatch(setDataTypeIdUpdateIndex(e.target.value))}
        >
          <option value="null" selected hidden>
            Seleccione un tipo de dato
          </option>
          {TypeData ? (
            TypeData.map(({ id, name }, index) => (
              <option value={id}>{name}</option>
            ))
          ) : (
            <></>
          )}
        </Selected>

        {dataTypeIdUpdate == "6009c757-6c0b-4f5d-96e5-44af7382de6d" && (
          <>
            <br />
            <br />
            <Selected onChange={(e) => handleChange(e.target.value)}>
              <option value={null} hidden>
                Seleccione
              </option>
              {ListData ? (
                ListData.map(({ id, name }, index) => (
                  <option value={id}>{name}</option>
                ))
              ) : (
                <></>
              )}
            </Selected>
          </>
        )}
        <br />
        <br />
        {dataTypeIdUpdate != "6009c757-6c0b-4f5d-96e5-44af7382de6d" &&
        dataTypeIdUpdate != "dc4378da-908b-4547-9001-a46b95c3d4b9" &&
        dataTypeIdUpdate != "c98d34bd-c017-4785-b151-b1f663c16541" &&
        dataTypeIdUpdate != "909a5f0f-603e-47c9-9216-b5bda78ba927" &&
        dataTypeIdUpdate != "c4640a1c-c2c0-48da-9ddd-107695cf4f36" &&
        dataTypeIdUpdate != "c9e97d02-2e80-4401-9b7c-fdfbacad9234" &&
        dataTypeIdUpdate != "211f35ac-bb4e-48b2-a22a-602f9982f6cf" ? (
          <>
            <TextField
              value={minValueUpdate}
              onChange={(e) => dispatch(setMinValueUpdateIndex(e.target.value))}
              required={true}
              type="Number"
              // InputProps={{ inputProps: { min: 1, max: 100 } }}
              placeholder="Minimo"
              className={styless.textfield}
            />
            <br />
            <br />
          </>
        ) : (
          <></>
        )}

        {dataTypeIdUpdate != "6009c757-6c0b-4f5d-96e5-44af7382de6d" &&
        dataTypeIdUpdate != "dc4378da-908b-4547-9001-a46b95c3d4b9" &&
        dataTypeIdUpdate != "c98d34bd-c017-4785-b151-b1f663c16541" &&
        dataTypeIdUpdate != "909a5f0f-603e-47c9-9216-b5bda78ba927" &&
        dataTypeIdUpdate != "c4640a1c-c2c0-48da-9ddd-107695cf4f36" &&
        dataTypeIdUpdate != "c9e97d02-2e80-4401-9b7c-fdfbacad9234" &&
        dataTypeIdUpdate != "211f35ac-bb4e-48b2-a22a-602f9982f6cf" ? (
          <>
            <TextField
              value={maxValueUpdate}
              onChange={(e) => dispatch(setMaxValueUpdateIndex(e.target.value))}
              required={true}
              type="Number"
              // InputProps={{ inputProps: { min: 1, max: 100 } }}
              placeholder="Maximo"
              className={styless.textfield}
            />
            <br />
            <br />
          </>
        ) : (
          <></>
        )}

        {/* <label className="Name">Referencia Indice: </label>
        <select
          className="Selected"
          onChange={(e) => handleChangeIndex(e.target.value)}
        >
          <option value={1}>No Aplica</option>
          {cabinets ? (
            cabinets.map(({ id, name }, index) => (
              <option className="Options" value={id}>
                {name}
              </option>
            ))
          ) : (
            <></>
          )}
        </select>

        {IndexByCabinet != "" && <label className="Name">Indice: </label>}

        {IndexByCabinet != "" && (
          <select className="Selected">
            <option hidden>Seleccione uno</option>
            {IndexByCabinet ? (
              IndexByCabinet.map(({ id, name }, index) => (
                <option key={index} className="Options" value={id}>
                  {name}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
        )} */}

        <br />
        <div align="right">
          <SaveButton>Actualizar</SaveButton>
          <CancelButton onClick={() => OpenModalUpdateIndex()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalUpdateIndex = () => {
    dispatch(setOpenModalConfigUpdate(false));
    dispatch(setClearUpdateIndex());
  };

  return (
    <div className={styless.container}>
      <Modal open={IndexUpdate} onClose={OpenModalUpdateIndex}>
        {bodyIndexUpdate}
      </Modal>
    </div>
  );
};

export default IndexUpdate;
