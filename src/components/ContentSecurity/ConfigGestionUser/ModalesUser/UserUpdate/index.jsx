import { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalUpdateUser } from "../../../../../redux/states/ActionSecurity";
import {
  CancelButton,
  SaveButton,
  Selected,
  TitleArchive,
  TitleModal,
} from "../../../../../Styles/ModalesStyles/modalStyle";
import { setUserUpdateSecurity } from "../../../../../redux/states/UserCore";
import {
  setIdUpdateChangeUser,
  setUserNameUpdateChangeUser,
  setEmailUpdateChangeUser,
  setProfileIdUpdateChangeUser,
  setBusinessIdUpdateChangeUser,
  setOperationalUpdateChangeUser,
  setCedulaUpdateChangeUser,
  setNameUpdateChangeUser,
  setSurNameUpdateChangeUser,
  setPhotoUpdateChangeUser,
  clearDataUpdateChangeUser,
} from "../../../../../redux/formData/UserData";

const useStyless = makeStyles((theme) => ({
  UserCreated: {
    position: "absolute",
    width: "400px",
    height: "550px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflowY: "scroll",
    borderRadius: "13px",
    '&::-webkit-scrollbar': {
      width: '0.4em'
    }
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const UserUpdate = () => {
  const styless = useStyless();
  const dispatch = useDispatch();
  const [userNew, setUserNew] = useState({
    updateUserDTOs: [],
  });
  const { modalSecurity, changeUser, userCore, profileCore } = useSelector(
    (store) => store
  );
  const { UserUpdate } = modalSecurity;
  const { SelectionUser } = userCore;
  const { profile } = profileCore;
  const {
    idUpdate,
    userNameUpdate,
    emailUpdate,
    profileIdUpdate,
    businessIdUpdate,
    operationalState,
    citizenShipCardUpdate,
    nameUpdate,
    surNameUpdate,
    areaUpdate,
    departamentUpdate,
    photoUpdate,
  } = changeUser;

  useEffect(() => {
    dispatch(setIdUpdateChangeUser(SelectionUser?.id));
    dispatch(setUserNameUpdateChangeUser(SelectionUser?.userName));
    dispatch(setEmailUpdateChangeUser(SelectionUser?.email));
    dispatch(setProfileIdUpdateChangeUser(SelectionUser?.profileId));
    dispatch(setBusinessIdUpdateChangeUser(SelectionUser?.businessId));
    dispatch(setOperationalUpdateChangeUser(SelectionUser?.opeationalState));
    dispatch(
      setCedulaUpdateChangeUser(SelectionUser?.userData?.citizenShipCard)
    );
    dispatch(setNameUpdateChangeUser(SelectionUser?.userData?.name));
    dispatch(setSurNameUpdateChangeUser(SelectionUser?.userData?.surName));
  }, [UserUpdate]);

  const handleChange = (value) => {
    dispatch(setProfileIdUpdateChangeUser(value));
  };

  const handleChangeBusinnes = (value) => {
    dispatch(setBusinessIdUpdateChangeUser(value));
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        // console.log(baseURL);
        dispatch(setPhotoUpdateChangeUser(baseURL));
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const setFile = (e) => {
    const file = e.target.files[0];
    getBase64(file);
  };

  const handleState = (value) => {
    value != 0
      ? dispatch(setOperationalUpdateChangeUser(true))
      : dispatch(setOperationalUpdateChangeUser(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataUser = {
      citizenShipCard: citizenShipCardUpdate,
      name: nameUpdate,
      surName: surNameUpdate,
      area: areaUpdate,
      departament: departamentUpdate,
      photo: photoUpdate,
    };
    const formUser = {
      id: idUpdate,
      userName: userNameUpdate,
      email: emailUpdate,
      profileId: profileIdUpdate,
      businessId: businessIdUpdate,
      operationalState: operationalState,
      userDataDTO: dataUser,
    };
    userNew.updateUserDTOs.push(formUser);
    console.log(userNew);
    dispatch(setUserUpdateSecurity(idUpdate, userNew));
    AbrirModalUpdateUser();
  };

  const Success = 1;
  const Error = 0;

  const UserUpdateForm = (
    <div className={styless.UserCreated}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Actualizar Usuario {SelectionUser?.userName}</TitleModal>
        </div>
        <br />
        <TextField
          value={userNameUpdate}
          required={true}
          label="Usuario"
          className={styless.textfield}
          onChange={(e) =>
            dispatch(setUserNameUpdateChangeUser(e.target.value))
          }
        />
        <br />
        <br />
        <TextField
          value={emailUpdate}
          required={true}
          label="Email"
          className={styless.textfield}
          onChange={(e) => dispatch(setEmailUpdateChangeUser(e.target.value))}
        />
        <br />
        <br />
        <TitleArchive>Perfiles: </TitleArchive>
        <Selected onChange={(e) => handleChange(e.target.value)}>
          <option hidden>{SelectionUser?.profileName}</option>
          {profile ? (
            profile.map(({ id, name }, index) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))
          ) : (
            <></>
          )}
        </Selected>
        <br />
        <br />
        <TitleArchive>Empresas: </TitleArchive>
        <Selected onChange={(e) => handleChangeBusinnes(e.target.value)}>
          <option hidden>{SelectionUser?.businessName}</option>
          <option value="9aa75e2c-7258-4315-8e62-92bfc0c4c01b">
            Comexport
          </option>
          <option value="33a72cf9-e989-4e3b-9f7e-388e2dcae266">
            Centralfile
          </option>
        </Selected>
        <br />
        <br />
        <TitleArchive>Estado Operacional</TitleArchive>
        <Selected onChange={(e) => handleState(e.target.value)}>
          {operationalState ? (
            <option hidden>True</option>
          ) : (
            <option hidden>False</option>
          )}
          <option value={Success}>True</option>
          <option value={Error}>False</option>
        </Selected>
        <br />
        <br />
        <TextField
          value={citizenShipCardUpdate}
          required={true}
          label="Cedula C.I."
          className={styless.textfield}
          onChange={(e) => dispatch(setCedulaUpdateChangeUser(e.target.value))}
        />
        <br />
        <br />
        <TextField
          value={nameUpdate}
          required={true}
          label="Nombre"
          className={styless.textfield}
          onChange={(e) => dispatch(setNameUpdateChangeUser(e.target.value))}
        />
        <br />
        <br />
        <TextField
          value={surNameUpdate}
          required={true}
          label="Apellidos"
          className={styless.textfield}
          onChange={(e) => dispatch(setSurNameUpdateChangeUser(e.target.value))}
        />
        <br />
        <br />
        <TitleArchive>Imagen Actual: </TitleArchive>
        <br />
        <br />
        <Content>
          <ContainerImage>
            {SelectionUser && (
              <Avatar src={SelectionUser?.userData?.photoUrl} />
            )}
          </ContainerImage>
        </Content>
        <br />
        <br />
        <TitleArchive>Seleccione Una Imagen: </TitleArchive>
        <br />
        <br />
        <input
          type="file"
          accept=".img, .jpg, .png"
          onInput={(e) => {
            setFile(e);
          }}
        />
        <br />
        <br />
        <div align="right">
          <SaveButton>Actualizar</SaveButton>
          <CancelButton onClick={() => AbrirModalUpdateUser()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const AbrirModalUpdateUser = () => {
    dispatch(setOpenModalUpdateUser(false));
    dispatch(clearDataUpdateChangeUser());
    setUserNew({
      updateUserDTOs: [],
    });
  };

  return (
    <div className={styless.container}>
      <Modal open={UserUpdate} onClose={AbrirModalUpdateUser}>
        {UserUpdateForm}
      </Modal>
    </div>
  );
};

export default UserUpdate;

const ContainerImage = styled.div`
  width: 140px;
  height: 140px;
  border: 1px solid var(--primaryColor);
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
