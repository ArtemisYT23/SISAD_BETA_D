import { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalCabinetDelete } from "../../../../../../redux/states/ActionCore";
import { DeleteCabinetCore } from "../../../../../../redux/states/Cabinet";
import {
  saveIdCabinetSelected,
  saveGroupIdSelected,
  setClearCabinetDataUpdate,
} from "../../../../../../redux/formData/CabinetData";
import { Alert } from "./Icons";
import {
  TitleModal,
  IconAlert,
  AlertDelete,
  AcepDelete,
  ButtonDelete,
  ButtonCancel,
  ContaiderButton,
} from "../../../../../../Styles/ModalesStyles/modalStyle";

const useStyless = makeStyles((theme) => ({
  CabinetDelete: {
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

const CabinetDelete = ({ id }) => {
  const styless = useStyless();
  const dispatch = useDispatch();
  const { modalCore, cabinetCore, cabinetData } = useSelector((store) => store);
  const { CabinetDelete } = modalCore;
  const { UpdateSelectedCabinet } = cabinetCore;
  const { idCabinet, groupIdCabinet } = cabinetData;
  const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    dispatch(saveIdCabinetSelected(UpdateSelectedCabinet?.id));
    dispatch(saveGroupIdSelected(UpdateSelectedCabinet?.groupId));
  }, [CabinetDelete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonActive(false);
    const gabi = {
      id: idCabinet,
    };
    dispatch(DeleteCabinetCore(gabi, idCabinet, groupIdCabinet));
    OpenModalDeleteCabinet();
  };

  const deleteGab = (
    <div className={styless.CabinetDelete}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>
            ELIMINAR EL GABINETE {UpdateSelectedCabinet?.name}
          </TitleModal>
        </div>
        <IconAlert>
          <Alert x={40} y={40} />
        </IconAlert>
        <AlertDelete>
          <label>Para que el gabinete</label>
          <label>pueda ser eliminado</label>
          <label>no debe contener registros</label>
          <label>de datos</label>
          <AcepDelete onClick={() => setButtonActive(true)}>Aceptar</AcepDelete>
        </AlertDelete>
        <ContaiderButton align="right">
          <ButtonDelete type="submit" disabled={!buttonActive}>
            Eliminar
          </ButtonDelete>
          <ButtonCancel onClick={() => OpenModalDeleteCabinet()}>
            Cancelar
          </ButtonCancel>
        </ContaiderButton>
      </form>
    </div>
  );

  const OpenModalDeleteCabinet = () => {
    setButtonActive(false);
    dispatch(setOpenModalCabinetDelete(false));
    dispatch(setClearCabinetDataUpdate());
  };

  return (
    <div className={styless.container}>
      <Modal open={CabinetDelete} onClose={OpenModalDeleteCabinet}>
        {deleteGab}
      </Modal>
    </div>
  );
};

export default CabinetDelete;
