import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { TextField, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  TitleModal,
  TitleArchive,
  SaveButton,
  CancelButton,
  Selected,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import { setOpenModalConfigCreated } from "../../../../../../redux/states/ActionConfig";
import { setIndexCabinetCreatedConfig } from "../../../../../../redux/states/Indexes";
import {
  getNameIndexNew,
  getDescriptionIndexNew,
  getNameCabinetIndexNew,
  getDataTypeNameIndexNew,
  getDataTypeNullCabinetNew,
  getlistNameIndexNew,
  getListNameNullCabinetNew,
  getMinValueIndexNew,
  getMaxValueIndexNew,
  setClearIndexDataNew,
} from "../../../../../../redux/formData/IndexData";

const useStyless = makeStyles((theme) => ({
  IndexCreated: {
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const IndexCreated = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalConfig, cabinetCore, listCore, typeDataCore, indexData } =
    useSelector((store) => store);
  const { IndexCreated } = modalConfig;
  const { TypeData } = typeDataCore;
  const { ListData } = listCore;
  const { cabinets, UpdateSelectedCabinet } = cabinetCore;
  const {
    id,
    name,
    description,
    cabinetName,
    dataTypeName,
    listName,
    required,
    unique,
    minValue,
    maxValue,
    xmlReference,
  } = indexData;

  useEffect(() => {
    dispatch(getNameCabinetIndexNew(UpdateSelectedCabinet?.name));
  }, [IndexCreated]);

  const handleChange = (value) => {
    value != 0
      ? dispatch(getDataTypeNameIndexNew(value))
      : dispatch(getDataTypeNullCabinetNew());
  };

  const handleListChange = (value) => {
    value != 0
      ? dispatch(getlistNameIndexNew(value))
      : dispatch(getListNameNullCabinetNew());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const IndexNew = {
      id: id,
      name: name,
      description: description,
      cabinetName: cabinetName,
      dataTypeName: dataTypeName,
      listName: listName,
      required: required,
      unique: unique,
      minValue: minValue,
      maxValue: maxValue,
      xmlReference: xmlReference,
    };
    console.log(IndexNew);
    dispatch(setIndexCabinetCreatedConfig(IndexNew, cabinetName));
    OpenModalIndexCreated();
  };

  const Dato = 0;
  const List = 0;

  const bodyIndex = (
    <div className={styless.IndexCreated}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>GABINETE {UpdateSelectedCabinet?.name}</TitleModal>
        </div>
        <br />

        <TextField
          value={name}
          onChange={(e) => dispatch(getNameIndexNew(e.target.value))}
          required={true}
          label="nombre del índice"
          className={styless.textfield}
        />
        <br />

        <TextField
          value={description}
          onChange={(e) => dispatch(getDescriptionIndexNew(e.target.value))}
          required={true}
          label="Descripción"
          className={styless.textfield}
        />
        <br />
        <br />
        <TitleArchive>Tipo de Dato: </TitleArchive>

        <Selected onChange={(e) => handleChange(e.target.value)}>
          <option hidden>Seleccione un Tipo</option>
          <option value={Dato}>Ninguno</option>
          {TypeData ? (
            TypeData.map(({ id, name }, index) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))
          ) : (
            <></>
          )}
        </Selected>
        <br />
        <br />
        {dataTypeName == "LIST" && (
          <Selected onChange={(e) => handleListChange(e.target.value)}>
            <option hidden>Seleccione Una Lista</option>
            <option value={List}>Ninguna</option>
            {ListData ? (
              ListData.map(({ id, name }, index) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))
            ) : (
              <></>
            )}
          </Selected>
        )}

        {dataTypeName != "LIST" &&
        dataTypeName != "DATE" &&
        dataTypeName != "TIME" &&
        dataTypeName != "DATETIME" &&
        dataTypeName != "IDENTITY" &&
        dataTypeName != "BOOLEAN" &&
        dataTypeName != "IMAGE" ? (
          <TextField
            value={minValue}
            onChange={(e) => dispatch(getMinValueIndexNew(e.target.value))}
            required={true}
            type="Number"
            // InputProps={{ inputProps: { min: 1, max: 140 } }}
            label="Minimo"
            className={styless.textfield}
          />
        ) : (
          <></>
        )}

        {dataTypeName != "LIST" &&
        dataTypeName != "DATE" &&
        dataTypeName != "TIME" &&
        dataTypeName != "DATETIME" &&
        dataTypeName != "IDENTITY" &&
        dataTypeName != "BOOLEAN" &&
        dataTypeName != "IMAGE" ? (
          <TextField
            value={maxValue}
            onChange={(e) => dispatch(getMaxValueIndexNew(e.target.value))}
            required={true}
            type="Number"
            // InputProps={{ inputProps: { min: 1, max: 140 } }}
            label="Maximo"
            className={styless.textfield}
          />
        ) : (
          <></>
        )}
        <br />
        <br />
        {/* <TitleArchive>Referencia Indice: </TitleArchive>
        <Selected
          onChange={(e) => handleChangeIndex(e.target.value)}
        >
          <option value={0}>No Aplica</option>
          {cabinets ? (
            cabinets.map(({ id, name }, index) => (
              <option value={id}>
                {name}
              </option>
            ))
          ) : (
            <></>
          )}
        </Selected>

        {IndexByCabinet != "" && <label className="Name">Indice: </label>}

        {IndexByCabinet != "" && (
          <select
            className="Selected"
            name="xmlReference"
            onChange={(e) => handleChange(e)}
          >
            <option hidden>Seleccione uno</option>
            {IndexByCabinet ? (
              IndexByCabinet.map(({ id, name }, index) => (
                <option key={index} className="Options" value={name}>
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
          {name != "" &&
          description != "" &&
          dataTypeName != null &&
          minValue >= 0 &&
          maxValue >= 0 ? (
            <SaveButton>Crear</SaveButton>
          ) : (
            <></>
          )}
          <CancelButton onClick={() => OpenModalIndexCreated()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalIndexCreated = () => {
    dispatch(setOpenModalConfigCreated(false));
    dispatch(setClearIndexDataNew());
  };

  return (
    <div className={styless.container}>
      <Modal open={IndexCreated} onClose={OpenModalIndexCreated}>
        {bodyIndex}
      </Modal>
    </div>
  );
};

export default IndexCreated;
