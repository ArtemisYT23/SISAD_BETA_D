import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBusinessChangeUser,
  setCedulaChangeUser,
  setEmailChangeUser,
  setNameChangeUser,
  setNameClearUserData,
  setPasswordChangeUser,
  setPhotoChangeUser,
  setProfileChangeUser,
  setSurNameChangeUser,
  setUserNameChangeUser,
} from "../../../../../redux/formData/UserData";
import { setOpenModalCreatedUser } from "../../../../../redux/states/ActionSecurity";
import {
  CancelButton,
  SaveButton,
  Selected,
  TitleArchive,
  TitleModal,
} from "../../../../../Styles/ModalesStyles/modalStyle";
import { setUserCreatedSecurity } from "../../../../../redux/states/UserCore";
 
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

const UserCreated = () => {
  const styless = useStyless();
  const dispatch = useDispatch();
  const { modalSecurity, changeUser, profileCore } = useSelector(
    (store) => store
  );
  const { UserCreated } = modalSecurity;
  const { profile, business } = profileCore;
  const {
    id,
    userName,
    password,
    email,
    profileId,
    businessId,
    citizenShipCard,
    name,
    surName,
    area,
    departament,
    photo,
    contentType,
  } = changeUser;

  const [userNew, setUserNew] = useState({
    users: [],
  });

  const handleChange = (value) => {
    dispatch(setProfileChangeUser(value));
  };

  const handleChangeBusinnes = (value) => {
    dispatch(setBusinessChangeUser(value));
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
        dispatch(setPhotoChangeUser(baseURL));
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const setFile = (e) => {
    const file = e.target.files[0];
    getBase64(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userNew.users = [];

    const dataUser = {
      citizenShipCard: citizenShipCard,
      name: name,
      surName: surName,
      area: area,
      departament: departament,
      photo: photo,
    };

    const formUser = {
      id: id,
      userName: userName,
      password: password,
      email: email,
      profileId: profileId,
      businessId: businessId,
      usersData: dataUser,
    };
    userNew.users.push(formUser);
    console.log(userNew);
    dispatch(setUserCreatedSecurity(userNew));
    AbrirModalCreatedUser();
  };

  const UserCreatedForm = (
    <div className={styless.UserCreated}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Agregar Nuevo Usuario</TitleModal>
        </div>
        <br />
        <TextField
          value={userName}
          required={true}
          label="Usuario"
          className={styless.textfield}
          onChange={(e) => dispatch(setUserNameChangeUser(e.target.value))}
        />
        <br />
        <br />
        <TextField
          value={password}
          required={true}
          label="Contraseña"
          className={styless.textfield}
          onChange={(e) => dispatch(setPasswordChangeUser(e.target.value))}
        />
        <br />
        <br />
        <TextField
          value={email}
          required={true}
          label="Email"
          className={styless.textfield}
          onChange={(e) => dispatch(setEmailChangeUser(e.target.value))}
        />
        <br />
        <br />
        <TitleArchive>Perfiles: </TitleArchive>
        <Selected onChange={(e) => handleChange(e.target.value)}>
          <option hidden>Seleccione un Perfil</option>
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
          <option hidden>Seleccione una Empresa</option>
          {business ? (
            business.map(({ id, name }, index) => (
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
        <TextField
          value={citizenShipCard}
          required={true}
          label="Cedula C.I."
          className={styless.textfield}
          onChange={(e) => dispatch(setCedulaChangeUser(e.target.value))}
        />
        <br />
        <br />
        <TextField
          value={name}
          required={true}
          label="Nombre"
          className={styless.textfield}
          onChange={(e) => dispatch(setNameChangeUser(e.target.value))}
        />
        <br />
        <br />
        <TextField
          value={surName}
          required={true}
          label="Apellidos"
          className={styless.textfield}
          onChange={(e) => dispatch(setSurNameChangeUser(e.target.value))}
        />
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
          <SaveButton>Crear</SaveButton>
          <CancelButton onClick={() => AbrirModalCreatedUser()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const AbrirModalCreatedUser = () => {
    dispatch(setOpenModalCreatedUser(false));
    dispatch(setNameClearUserData());
  };

  return (
    <div className={styless.container}>
      <Modal open={UserCreated} onClose={AbrirModalCreatedUser}>
        {UserCreatedForm}
      </Modal>
    </div>
  );
};

export default UserCreated;
