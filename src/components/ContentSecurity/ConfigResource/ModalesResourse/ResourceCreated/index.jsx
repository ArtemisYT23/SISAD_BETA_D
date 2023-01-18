import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenModalCreatedResource } from "../../../../../redux/states/ActionSecurity";
import {
  TitleModal,
  SaveButton,
  CancelButton,
  Selected,
} from "../../../../../Styles/ModalesStyles/modalStyle";
import {
  setFilterFoldersCore,
  clearFolderCabinet,
} from "../../../../../redux/states/Folder";
import { createdPermissionCabinet } from "../../../../../redux/states/ResourceCore";
import { Steps } from "primereact/steps";

const useStyless = makeStyles((theme) => ({
  ResourceCreated: {
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

const CreatedPermision = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalSecurity, cabinetCore, userCore, optionCore, folderCore } =
    useSelector((store) => store);
  const { ResourceCreated } = modalSecurity;
  const { cabinets, cabinetFolder } = cabinetCore;
  const { folderCabinet } = folderCore;
  const { UserList } = userCore;
  const { OptionCabinet, OptionFolder } = optionCore;
  const [passForm, setPassForm] = useState(0);
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);
  const [cabi, setCabi] = useState([]);
  const [folde, setFolder] = useState([]);

  const items = [
    {
      label: "Gabinetes",
    },
    {
      label: "Carpetas",
    },
  ];

  const ObtenerSelectionCabinet = () => {
    const checkboxes = document.querySelectorAll(
      '[name="ActionCabinet"]:checked'
    );

    const SelectedCabinet = [];

    checkboxes.forEach((check, i) => {
      cabinetFolder.forEach((folder, i) => {
        if (check.value == folder.id) {
          const cabinet = {
            id: folder.id,
            name: folder.name,
            folder: folder.folders,
          };
          SelectedCabinet.push(cabinet);
        }
      });
    });
    setCabi(SelectedCabinet);
    // console.log(SelectedCabinet);

    const SelectedResource = [];
    checkboxes.forEach((checkbox) => {
      const Permision = {
        resourceId: checkbox.value,
        userId: user,
        optionData: OptionCabinet,
      };
      SelectedResource.push(Permision);
    });
    // console.log(SelectedResource);
    setData(SelectedResource);
  };

  const ObtenerSelectionFolder = () => {
    const checkboxes = document.querySelectorAll(
      '[name="ActionFolder"]:checked'
    );
    const SelectedResource = [];
    checkboxes.forEach((checkbox) => {
      const Permision = {
        resourceId: checkbox.value,
        userId: user,
        optionData: OptionFolder,
      };
      SelectedResource.push(Permision);
    });
    // console.log(SelectedResource);
    setFolder(SelectedResource);
  };

  const changeFolderOption = () => {
    setPassForm(1);
    // ObtenerSelectionCabinet();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = data.concat(folde);
    // console.log(formData);
    dispatch(createdPermissionCabinet(formData));
    OpenModalResourseCreated();
  };

  const ResourceAsignation = (
    <div className={styless.ResourceCreated}>
      <div align="center">
        <TitleModal>Asignacion De Gabinetes</TitleModal>
      </div>
      <br />
      <Selected onChange={(e) => setUser(e.target.value)}>
        <option hidden>Seleccione un Usuario</option>
        {UserList ? (
          UserList.map((user, index) => (
            <option key={index} value={user.id}>
              {user.userName}
            </option>
          ))
        ) : (
          <></>
        )}
      </Selected>
      <br />
      <br />

      {user != "" && passForm == 0 ? (
        <ContainerResource>
          <CeldaText>
            <TextNameTitle>GABINETES</TextNameTitle>
            {cabinets ? (
              cabinets.map(({ id, name }, index) => (
                <TextNameCelda key={id}>
                  <span>{name}</span>
                </TextNameCelda>
              ))
            ) : (
              <></>
            )}
          </CeldaText>

          <ContainerCelda>
            <TextNameTitle></TextNameTitle>
            {cabinets ? (
              cabinets.map(({ id, name }, index) => (
                <CeldaContentCheck>
                  <input
                    type="checkbox"
                    name="ActionCabinet"
                    value={id}
                    id={id}
                    onChange={ObtenerSelectionCabinet}
                  />
                </CeldaContentCheck>
              ))
            ) : (
              <></>
            )}
          </ContainerCelda>
        </ContainerResource>
      ) : (
        <></>
      )}

      {passForm == 1 && cabi != "" ? (
        <>
          <ContainerResource>
            <CeldaText>
              <TextNameTitle>CARPETAS</TextNameTitle>
              {cabi ? (
                cabi.map((cab, i) =>
                  cab.folder.map((folder, i) => {
                    if (folder.folderId != null) {
                      return (
                        <TextNameCelda>
                          <span>{cab.name}</span>
                          <span>{folder.name}</span>
                        </TextNameCelda>
                      );
                    }
                  })
                )
              ) : (
                <></>
              )}
            </CeldaText>

            <ContainerCelda>
              <TextNameTitle></TextNameTitle>
              {cabi ? (
                cabi.map((cab, i) =>
                  cab.folder.map((folder, i) => {
                    if (folder.folderId != null) {
                      return (
                        <CeldaContentCheck>
                          <input
                            type="checkbox"
                            name="ActionFolder"
                            value={folder.id}
                            id={folder.id}
                            onChange={ObtenerSelectionFolder}
                          />
                        </CeldaContentCheck>
                      );
                    }
                  })
                )
              ) : (
                <></>
              )}
            </ContainerCelda>
          </ContainerResource>
          <br />
        </>
      ) : (
        <></>
      )}

      {passForm == 1 && (
        <div align="right">
          <SaveButton onClick={(e) => handleSubmit(e)}>Guardar</SaveButton>
          <CancelButton onClick={(e) => setPassForm(0)}>
            Retroceder
          </CancelButton>
          <CancelButton onClick={() => OpenModalResourseCreated()}>
            Cancelar
          </CancelButton>
        </div>
      )}
      <br />
      {passForm == 0 && user != "" ? (
        <div align="right">
          <SaveButton onClick={() => changeFolderOption()}>
            Siguiente
          </SaveButton>
          <CancelButton onClick={() => OpenModalResourseCreated()}>
            Cancelar
          </CancelButton>
        </div>
      ) : (
        <></>
      )}
      <div align="right">
        <Steps model={items} activeIndex={passForm} readOnly={true} />
      </div>
    </div>
  );

  const OpenModalResourseCreated = () => {
    dispatch(setOpenModalCreatedResource(false));
    dispatch(clearFolderCabinet());
    setUser("");
    setData([]);
    setFolder([]);
    setPassForm(0);
  };

  return (
    <div className={styless.container}>
      <Modal open={ResourceCreated} onClose={OpenModalResourseCreated}>
        {ResourceAsignation}
      </Modal>
    </div>
  );
};

export default CreatedPermision;

const ContainerResource = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  margin-top: 0.2rem;
  overflow-y: scroll;
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
`;
