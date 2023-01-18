import styled from "styled-components";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { openModalProfileCreated } from "../../../../../redux/states/ActionSecurity";
import {
  changeNameProfileCreated,
  clearDataProfileCreated,
} from "../../../../../redux/formData/Profile";
import { CreateProfileCore } from "../../../../../redux/states/Profile";
import {
  TitleModal,
  SaveButton,
  CancelButton,
} from "../../../../../Styles/ModalesStyles/modalStyle";

const useStyless = makeStyles((theme) => ({
  ProfileCreated: {
    position: "absolute",
    width: "400px",
    height: "550px",
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

const ProfileCreatedPermision = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalSecurity, profileData, permisionCore } = useSelector(
    (store) => store
  );
  const {
    PermisionCabinet,
    PermisionFolder,
    PermisionGroup,
    PermisionIndex,
    PermisionList,
    PermisionDataType,
    PermisionDocument,
    PermisionArchive,
    PermisionTypeFile,
    permissions,
  } = permisionCore;
  const { ProfileCreated } = modalSecurity;
  const { id, name } = profileData;
  const [profil, setProfil] = useState({
    profiles: [],
  });
  const [acceso, setAcceso] = useState({
    access: [],
  });
  const [data, setData] = useState([]);

  const ChangeSelectionPermision = () => {
    const checkboxes = document.querySelectorAll('[name="Permision"]:checked');
    const ProfileByPermision = [];

    permissions.forEach((permision) => {
      const NewProfile = {
        id: uuidv4(),
        profileId: id,
        actionId: permision.id,
        isActive: false,
      };
      ProfileByPermision.push(NewProfile);
    });

    ProfileByPermision.forEach((profil) => {
      checkboxes.forEach((check) => {
        if (profil.actionId === check.value) {
          profil.isActive = true;
        }
        return check;
      });
    });
    setData(ProfileByPermision);
    console.log(ProfileByPermision);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ProfileNew = {
      id: id,
      name: name,
    };
    profil.profiles.push(ProfileNew);
    acceso.access = data;
    console.log(profil);
    console.log(acceso);
    dispatch(CreateProfileCore(profil, acceso));
    OpenModalCreatedProfile();
    setProfil({
      profiles: [],
    });
    setAcceso({
      access: [],
    });
  };

  const HeaderProfileCreated = (
    <div className={styless.ProfileCreated}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Nuevo Perfil</TitleModal>
        </div>
        <TextField
          value={name}
          onChange={(e) => dispatch(changeNameProfileCreated(e.target.value))}
          label="Nombre del Perfil"
          className={styless.textfield}
          required={true}
        />
        <br />
        <br />

        <ContainerTreeAction>
          <CeldaOption>
            <CeldaText>GRUPOS</CeldaText>
            {PermisionGroup ? (
              PermisionGroup.map((perm, i) => (
                <CeldaContent>
                  <Check>
                    <input
                      name="Permision"
                      value={perm.id}
                      type="checkbox"
                      onChange={ChangeSelectionPermision}
                    />
                  </Check>
                  <CelText>{perm.name}</CelText>
                </CeldaContent>
              ))
            ) : (
              <></>
            )}
          </CeldaOption>
          <br />
          <CeldaOption>
            <CeldaText>GABINETES</CeldaText>
            {PermisionCabinet ? (
              PermisionCabinet.map((perm, i) => (
                <CeldaContent key={i}>
                  <Check>
                    <input
                      name="Permision"
                      value={perm.id}
                      type="checkbox"
                      onChange={ChangeSelectionPermision}
                    />
                  </Check>
                  <CelText>{perm.name}</CelText>
                </CeldaContent>
              ))
            ) : (
              <></>
            )}
          </CeldaOption>
          <br />
          <CeldaOption>
            <CeldaText>CARPETAS</CeldaText>
            {PermisionFolder ? (
              PermisionFolder.map((perm, i) => (
                <CeldaContent key={i}>
                  <Check>
                    <input
                      name="Permision"
                      value={perm.id}
                      type="checkbox"
                      onChange={ChangeSelectionPermision}
                    />
                  </Check>
                  <CelText>{perm.name}</CelText>
                </CeldaContent>
              ))
            ) : (
              <></>
            )}
          </CeldaOption>
          <br />
          <CeldaOption>
            <CeldaText>INDICES</CeldaText>
            {PermisionIndex ? (
              PermisionIndex.map((perm, i) => (
                <CeldaContent key={i}>
                  <Check>
                    <input
                      name="Permision"
                      value={perm.id}
                      type="checkbox"
                      onChange={ChangeSelectionPermision}
                    />
                  </Check>
                  <CelText>{perm.name}</CelText>
                </CeldaContent>
              ))
            ) : (
              <></>
            )}
          </CeldaOption>
          <br />
          <CeldaOption>
            <CeldaText>LISTAS</CeldaText>
            {PermisionList ? (
              PermisionList.map((perm, i) => (
                <CeldaContent key={i}>
                  <Check>
                    <input
                      name="Permision"
                      value={perm.id}
                      type="checkbox"
                      onChange={ChangeSelectionPermision}
                    />
                  </Check>
                  <CelText>{perm.name}</CelText>
                </CeldaContent>
              ))
            ) : (
              <></>
            )}
          </CeldaOption>
          <br />
          <CeldaOption>
            <CeldaText>TIPOS DE ARCHIVOS</CeldaText>
            {PermisionTypeFile ? (
              PermisionTypeFile.map((perm, i) => (
                <CeldaContent key={i}>
                  <Check>
                    <input
                      name="Permision"
                      value={perm.id}
                      type="checkbox"
                      onChange={ChangeSelectionPermision}
                    />
                  </Check>
                  <CelText>{perm.name}</CelText>
                </CeldaContent>
              ))
            ) : (
              <></>
            )}
          </CeldaOption>
          <br />
          <CeldaOption>
            <CeldaText>TIPOS DE DATOS</CeldaText>
            {PermisionDataType ? (
              PermisionDataType.map((perm, i) => (
                <CeldaContent key={i}>
                  <Check>
                    <input
                      name="Permision"
                      value={perm.id}
                      type="checkbox"
                      onChange={ChangeSelectionPermision}
                    />
                  </Check>
                  <CelText>{perm.name}</CelText>
                </CeldaContent>
              ))
            ) : (
              <></>
            )}
          </CeldaOption>
          <br />
          <CeldaOption>
            <CeldaText>DOCUMENTOS</CeldaText>
            {PermisionDocument ? (
              PermisionDocument.map((perm, i) => (
                <CeldaContent key={i}>
                  <Check>
                    <input
                      name="Permision"
                      value={perm.id}
                      type="checkbox"
                      onChange={ChangeSelectionPermision}
                    />
                  </Check>
                  <CelText>{perm.name}</CelText>
                </CeldaContent>
              ))
            ) : (
              <></>
            )}
          </CeldaOption>
          <br />
          <CeldaOption>
            <CeldaText>ARCHIVOS</CeldaText>
            {PermisionArchive ? (
              PermisionArchive.map((perm, i) => (
                <CeldaContent key={i}>
                  <Check>
                    <input
                      name="Permision"
                      value={perm.id}
                      type="checkbox"
                      onChange={ChangeSelectionPermision}
                    />
                  </Check>
                  <CelText>{perm.name}</CelText>
                </CeldaContent>
              ))
            ) : (
              <></>
            )}
          </CeldaOption>
        </ContainerTreeAction>

        <br />
        <div align="right">
          {name != "" && data != "" ? <SaveButton>Crear</SaveButton> : <></>}
          <CancelButton onClick={() => OpenModalCreatedProfile()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalCreatedProfile = () => {
    dispatch(openModalProfileCreated(false));
    dispatch(clearDataProfileCreated());
  };

  return (
    <div className={styless.container}>
      <Modal open={ProfileCreated} onClose={OpenModalCreatedProfile}>
        {HeaderProfileCreated}
      </Modal>
    </div>
  );
};

export default ProfileCreatedPermision;

const HeaderProfile = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  color: #fff;
  background-color: var(--primaryColor);
  margin: 0 0 0.5rem 0;
`;

const ContainerNameProfile = styled.div`
  width: 100%;
  height: 2.6rem;
  display: flex;
  align-items: center;
  border: 1px solid #9e9e9e;
`;

const TextProfile = styled.label`
  margin: 0 0.3rem 0 0.4rem;
  color: var(--primaryColor);
`;

const TextName = styled.input`
  outline: none;
  width: 55%;
  height: 1.6rem;
  margin: 0 2rem 0 0;
  border-top: 1px solid white;
  border-bottom: 1px solid rgb(120, 120, 120);
  border-right: 1px solid white;
  border-left: 1px solid white;
`;

const ContainerTreeAction = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const CeldaOption = styled.div`
  width: 100%;
  padding: 0 0.5rem 0 0;
`;

const CeldaText = styled.div`
  width: 100%;
  height: 2rem;
  background-color: var(--primaryColor);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13px 13px 0 0;
`;

const CeldaContent = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #414141;
`;

const Check = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--primaryColor);
`;

const CelText = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--primaryColor);
`;
