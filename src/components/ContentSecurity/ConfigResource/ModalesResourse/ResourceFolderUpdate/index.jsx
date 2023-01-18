import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenModalUpdateResourceFolder } from "../../../../../redux/states/ActionSecurity";
import {
  clearFolderCabinet,
} from "../../../../../redux/states/Folder";
import { updatePermissionCabinet } from "../../../../../redux/states/ResourceCore";
import {
  TitleModal,
  SaveButton,
  CancelButton,
} from "../../../../../Styles/ModalesStyles/modalStyle";

const useStyless = makeStyles((theme) => ({
  ResourceUpdateFolder: {
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "13px",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const ResourceFolderUpdate = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalSecurity, optionCore, cabinetCore, resourceCore, userCore } =
    useSelector((store) => store);
  const { SelectionUser } = userCore;
  const { ResourceUpdateFolder } = modalSecurity;
  const { ResourcePermision } = resourceCore;
  const { cabinetFolder } = cabinetCore;
  const { OptionFolder } = optionCore;
  const [input, setInput] = useState({ ids_diets: [] });
  const [data, setData] = useState([]);

  useEffect(() => {
    const Permission = [];
    const idPermiss = ResourcePermision.map((ind, i) => {
      if (ind.userId == SelectionUser?.id) {
        Permission.push(ind.resourceId);
      }
    });
    let result = Permission.filter((item, index) => {
      return Permission.indexOf(item) === index;
    });
    // console.log(result);
    setInput({ ...input, ids_diets: result });

    const SelectCabinets = [];
    cabinetFolder.forEach((cab, i) => {
      result.forEach((item, index) => {
        if (cab.id == item) {
          SelectCabinets.push(cab);
        }
      });
    });
    setData(SelectCabinets);
    // console.log(SelectCabinets);
  }, [ResourceUpdateFolder]);


  const handleChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const newChecked = checked
      ? [...input.ids_diets, value]
      : [...input.ids_diets.filter((id) => id !== value)];
    setInput({ ...input, ids_diets: newChecked });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkboxes = document.querySelectorAll('[name="ActionFolder"]');
    const UpdateResource = [];
    checkboxes.forEach((checkbox) => {
      const permision = {
        resourceId: checkbox.value,
        userId: SelectionUser?.id,
        optionData: OptionFolder,
        isActive: checkbox.checked
      }
      UpdateResource.push(permision);
    })
    dispatch(updatePermissionCabinet(UpdateResource));
    OpenModalResourseCreatedFolder();

  };

  const ResourceAsignationFolder = (
    <div className={styless.ResourceUpdateFolder}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Actualizacion De Carpetas</TitleModal>
        </div>
        <br />

        <ContainerFolder>
          <ContainerResource>
            <CeldaText>
              <TextNameTitle>CARPETAS</TextNameTitle>
              {data ? (
                data.map((dat, i) =>
                  dat.folders.map((fol, i) => (
                    <TextNameCelda key={fol.id}>
                      <span>Gabinete: {dat.name}</span>
                      <span>{fol.name}</span>
                    </TextNameCelda>
                  ))
                )
              ) : (
                <></>
              )}
            </CeldaText>

            <ContainerCelda>
              <TextNameTitle></TextNameTitle>
              {data ? (
                data.map((dat, i) =>
                  dat.folders.map((fol, i) => (
                    <CeldaContentCheck>
                      <input
                        type="checkbox"
                        name="ActionFolder"
                        value={fol.id}
                        id={fol.id}
                        onChange={(e) => handleChange(e)}
                        checked={input.ids_diets.includes(fol.id)}
                      />
                    </CeldaContentCheck>
                  ))
                )
              ) : (
                <></>
              )}
            </ContainerCelda>
          </ContainerResource>
        </ContainerFolder>

        <br />
        <div align="right">
          <SaveButton>Actualizar</SaveButton>
          <CancelButton onClick={() => OpenModalResourseCreatedFolder()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalResourseCreatedFolder = () => {
    dispatch(setOpenModalUpdateResourceFolder(false));
    dispatch(clearFolderCabinet());
  };

  return (
    <div className={styless.container}>
      <Modal
        open={ResourceUpdateFolder}
        onClose={OpenModalResourseCreatedFolder}
      >
        {ResourceAsignationFolder}
      </Modal>
    </div>
  );
};

export default ResourceFolderUpdate;

const ContainerResource = styled.div`
  width: 100%;
  display: flex;
  margin-top: 0.2rem;
`;

const CeldaText = styled.div`
  width: 80%;
`;

const TextNameTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: 40px;
  color: var(--white);
  background-color: var(--primaryColor);
  letter-spacing: 0.2rem;
  border-radius: 13px;
`;

const TextNameCelda = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: 50px;
  border: 1px solid var(--lineColor);
  color: #616161;
  border-radius: 13px;
  margin: 0.3rem 0 0 0;
`;

const ContainerCelda = styled.div`
  width: 20%;
`;

const CeldaContentCheck = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  overflow: hidden;
  border: 1px solid var(--lineColor);
  border-radius: 13px;
  margin: 0.3rem 0 0 0;
`;

const ContainerFolder = styled.div`
  width: 100%;
  height: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
