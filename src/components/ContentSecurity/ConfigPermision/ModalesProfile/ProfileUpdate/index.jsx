import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenModalProfileUpdate } from "../../../../../redux/states/ActionSecurity";
import {
  changeIdProfileUpdate,
  changeNameProfileUpdate,
  clearDataProfileUpdate,
} from "../../../../../redux/formData/Profile";
import { UpdateProfileCore } from "../../../../../redux/states/Profile";
import {
  TitleModal,
  SaveButton,
  CancelButton,
} from "../../../../../Styles/ModalesStyles/modalStyle";
import { v4 as uuidv4 } from "uuid";

const useStyless = makeStyles((theme) => ({
  ProfileUpdate: {
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

const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalSecurity, profileCore, profileData, permisionCore } =
    useSelector((store) => store);
  const { ProfileUpdate } = modalSecurity;
  const { SelectedProfile } = profileCore;
  const { idUpdate, nameUpdate } = profileData;
  const {
    PermisionCabinet,
    PermisionProfile,
    ActionUserSelected,
    PermisionGroup,
    PermisionFolder,
    PermisionIndex,
    PermisionList,
    PermisionTypeFile,
    PermisionDataType,
    PermisionDocument,
    PermisionArchive,
    PermisionResource,
    PermisionByProfile,
  } = permisionCore;

  const [input, setInput] = useState({ ids_diets: [] });
  const [profil, setProfil] = useState({
    profiles: [],
  });
  const [acceso, setAcceso] = useState({
    access: [],
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(changeIdProfileUpdate(SelectedProfile?.id));
    dispatch(changeNameProfileUpdate(SelectedProfile?.name));

    const Permission = [];
    const idPermiss = PermisionProfile.map((ind, i) => {
      if (ind.isActive == true) {
        Permission.push(PermisionProfile[i].actionId);
        setInput({ ...input, ids_diets: Permission });
      }
    });
    //  console.log(PermisionProfile);
  }, [ProfileUpdate]);

  const handleChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const newChecked = checked
      ? [...input.ids_diets, value]
      : [...input.ids_diets.filter((id) => id !== value)];
    setInput({ ...input, ids_diets: newChecked });
  };

  const handleCreated = () => {
    const checkboxes = document.querySelectorAll('[name="Permision"]');
    const selectedProfile = [];
    const selectCheckPermission = [];

    checkboxes.forEach((check) => {
      const Permision = {
        actionId: check.value,
        isActive: check.checked,
      };
      selectedProfile.push(Permision);
    });

    PermisionProfile.map((ind, i) => {
      selectedProfile.map((index, i) => {
        if (ind.actionId == index.actionId) {
          ind.isActive = index.isActive;
        }
        return ind;
      });
    });

    PermisionProfile.forEach((ind, i) => {
      const infoPemission = {
        id: ind.id,
        profileId: idUpdate,
        actionId: ind.actionId,
        isActive: ind.isActive,
      };
      selectCheckPermission.push(infoPemission);
    });
    // console.log(selectedProfile);
    // console.log(PermisionProfile);
    setData(selectCheckPermission);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ProfileNew = {
      id: idUpdate,
      name: nameUpdate,
    };
    profil.profiles.push(ProfileNew);
    acceso.access = data;
    // console.log(profil);
    // console.log(acceso);
    dispatch(UpdateProfileCore(profil, acceso));
    OpenModalUpdateProfile();
    setProfil({
      profiles: [],
    });
    setAcceso({
      access: [],
    });
  };

  const HeaderUpdateProfile = (
    <div className={styless.ProfileUpdate}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>
            Actualizar Perfil {SelectedProfile?.nameUpdate}
          </TitleModal>
        </div>
        <br />
        <TextField
          value={nameUpdate}
          onChange={(e) => dispatch(changeNameProfileUpdate(e.target.value))}
          label="Nombre del Perfil"
          className={styless.textfield}
        />
        <br />
        <br />
        <ContainerTreeAction>
          <CeldaOption>
            <CeldaText>GRUPOS</CeldaText>
            {PermisionGroup ? (
              PermisionGroup.map((perm, i) => (
                <CeldaContent key={i}>
                  <Check>
                    <input
                      name="Permision"
                      value={perm.id}
                      type="checkbox"
                      checked={input.ids_diets.includes(perm.id)}
                      onChange={(e) => {
                        handleChange(e), handleCreated(e);
                      }}
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
                      checked={input.ids_diets.includes(perm.id)}
                      onChange={(e) => {
                        handleChange(e), handleCreated(e);
                      }}
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
                      checked={input.ids_diets.includes(perm.id)}
                      onChange={(e) => {
                        handleChange(e), handleCreated(e);
                      }}
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
                      checked={input.ids_diets.includes(perm.id)}
                      onChange={(e) => {
                        handleChange(e), handleCreated(e);
                      }}
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
                      checked={input.ids_diets.includes(perm.id)}
                      onChange={(e) => {
                        handleChange(e), handleCreated(e);
                      }}
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
                      checked={input.ids_diets.includes(perm.id)}
                      onChange={(e) => {
                        handleChange(e), handleCreated(e);
                      }}
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
                      checked={input.ids_diets.includes(perm.id)}
                      onChange={(e) => {
                        handleChange(e), handleCreated(e);
                      }}
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
                      checked={input.ids_diets.includes(perm.id)}
                      onChange={(e) => {
                        handleChange(e), handleCreated(e);
                      }}
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
                      checked={input.ids_diets.includes(perm.id)}
                      onChange={(e) => {
                        handleChange(e), handleCreated(e);
                      }}
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
            <CeldaText>RECURSOS</CeldaText>
            {PermisionResource ? (
              PermisionResource.map((perm, i) => (
                <CeldaContent key={i}>
                  <Check>
                    <input
                      name="Permision"
                      value={perm.id}
                      type="checkbox"
                      checked={input.ids_diets.includes(perm.id)}
                      onChange={(e) => {
                        handleChange(e), handleCreated(e);
                      }}
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
            <CeldaText>PERFIL</CeldaText>
            {PermisionByProfile ? (
              PermisionByProfile.map((perm, i) => (
                <CeldaContent key={i}>
                  <Check>
                    <input
                      name="Permision"
                      value={perm.id}
                      type="checkbox"
                      checked={input.ids_diets.includes(perm.id)}
                      onChange={(e) => {
                        handleChange(e), handleCreated(e);
                      }}
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
        <br />
        <div align="right">
          <SaveButton>Actualizar</SaveButton>
          <CancelButton onClick={() => OpenModalUpdateProfile()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalUpdateProfile = () => {
    dispatch(setOpenModalProfileUpdate(false));
    dispatch(clearDataProfileUpdate());
  };

  return (
    <div className={styless.container}>
      <Modal open={ProfileUpdate} onClose={OpenModalUpdateProfile}>
        {HeaderUpdateProfile}
      </Modal>
    </div>
  );
};

export default ProfileUpdate;

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
