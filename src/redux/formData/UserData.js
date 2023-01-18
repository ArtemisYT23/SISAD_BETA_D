import { v4 as uuidv4 } from "uuid";

const initialState = {
    id: uuidv4(),
    userName: "",
    password: "",
    email: "",
    profileId: "",
    businessId: "",
    usersData: "",

    //datos del usuario
    citizenShipCard: "",
    name: "",
    surName: "",
    area: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    departament: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    photo: null,
    contentType: "image/png",

    //Actualizacion de usuario
    idUpdate: "",
    userNameUpdate: "",
    emailUpdate: "",
    profileIdUpdate: "",
    businessIdUpdate: "",
    operationalState: true,
    userDataDTO: {},
    //datos del usuario actualizacion
    citizenShipCardUpdate: "",
    nameUpdate: "",
    surNameUpdate: "",
    areaUpdate: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    departamentUpdate: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    photoUpdate: null
}

const CHANGE_USERNAME_CREATED_USER = "CHANGE_USERNAME_CREATED_USER";
const CHANGE_PASS_CREATED_PASS = "CHANGE_PASS_CREATED_PASS";
const CHANGE_EMAIL_CREATED_EMAIL = "CHANGE_EMAIL_CREATED_EMAIL";
const CHANGE_PROFILE_CREATED = "CHANGE_PROFILE_CREATED";
const CHANGE_BUSINESS_CREATED = "CHANGE_BUSINESS_CREATED";
const CHANGE_DATAUSER_CREATED = "CHANGE_DATAUSER_CREATED";
//datos personales 
const CHANGE_CEDULA_CREATED = "CHANGE_CEDULA_CREATED";
const CHANGE_NAME_CREATED = "CHANGE_NAME_CREATED";
const CHANGE_SURNAME_CREATED = "CHANGE_SURNAME_CREATED";
const CHANGE_PHOTO_CREATED = "CHANGE_PHOTO_CREATED";
const CHANGE_CLEAR_DATA_USER = "CHANGE_CLEAR_DATA_USER";
//actualizacion datos
const CHANGE_IDUSER_UPDATE = "CHANGE_IDUSER_UPDATE";
const CHANGE_USERNAME_UPDATE = "CHANGE_USERNAME_UPDATE";
const CHANGE_EMAIL_UPDATE = "CHANGE_EMAIL_UPDATE";
const CHANGE_PROFILEID_UPDATE = "CHANGE_PROFILEID_UPDATE";
const CHANGE_BUSINESSID_UPDATE = "CHANGE_BUSINESSID_UPDATE";
const CHANGE_OPERATIONAL_UPDATE = "CHANGE_OPERATIONAL_UPDATE";
const CHANGE_CEDULA_UPDATE = "CHANGE_CEDULA_UPDATE";
const CHANGE_NAME_UPDATE = "CHANGE_NAME_UPDATE";
const CHANGE_SURNAME_UPDATE = "CHANGE_SURNAME_UPDATE";
const CHANGE_PHOTO_UPDATE = "CHANGE_PHOTO_UPDATE";
const CHANGE_CLEAR_DATA_USER_UPDATE = "CHANGE_CLEAR_DATA_USER_UPDATE";

export default function UserDataReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_USERNAME_CREATED_USER:
        case CHANGE_PASS_CREATED_PASS:
        case CHANGE_EMAIL_CREATED_EMAIL:
        case CHANGE_PROFILE_CREATED:
        case CHANGE_BUSINESS_CREATED:
        case CHANGE_DATAUSER_CREATED:
        //datos personales
        case CHANGE_CEDULA_CREATED:
        case CHANGE_NAME_CREATED:
        case CHANGE_SURNAME_CREATED:
        case CHANGE_PHOTO_CREATED:
        case CHANGE_CLEAR_DATA_USER:
        //actualizacion datos
        case CHANGE_IDUSER_UPDATE:
        case CHANGE_USERNAME_UPDATE:
        case CHANGE_EMAIL_UPDATE:
        case CHANGE_PROFILEID_UPDATE:
        case CHANGE_BUSINESSID_UPDATE:
        case CHANGE_OPERATIONAL_UPDATE:
        case CHANGE_CEDULA_UPDATE:
        case CHANGE_NAME_UPDATE:
        case CHANGE_SURNAME_UPDATE:
        case CHANGE_PHOTO_UPDATE:
        case CHANGE_CLEAR_DATA_USER_UPDATE:
            return action.payload;
        default:
            return state;
    }
}

//Obtener datos para nombre del usuario
export const setUserNameChangeUser = (name) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_USERNAME_CREATED_USER,
        payload: { ...changeUser, userName: name }
    })
};

//Obtener datos para contraseña del usuario
export const setPasswordChangeUser = (pass) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_PASS_CREATED_PASS,
        payload: { ...changeUser, password: pass }
    })
};

//Obtener datos para email del usuario
export const setEmailChangeUser = (mail) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_EMAIL_CREATED_EMAIL,
        payload: { ...changeUser, email: mail }
    })
};

//Obtener datos para perfilId del usuario
export const setProfileChangeUser = (profile) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_PROFILE_CREATED,
        payload: { ...changeUser, profileId: profile }
    })
};

//Obtener datos para perfilId del usuario
export const setBusinessChangeUser = (business) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_BUSINESS_CREATED,
        payload: { ...changeUser, businessId: business }
    })
};

//obtener datos personales del usuario
export const setDataUserChangeUser = (usersData) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_DATAUSER_CREATED,
        payload: { ...changeUser, usersData: usersData }
    })
};

/*<-----------DATOS DE INFO PERSONAL---------> */
//Obtener datos de cedula del usuario
export const setCedulaChangeUser = (cedula) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_CEDULA_CREATED,
        payload: { ...changeUser, citizenShipCard: cedula }
    })
};

//Obtener datos de nombre del usuario
export const setNameChangeUser = (name) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_NAME_CREATED,
        payload: { ...changeUser, name: name }
    })
};

//obtener datos de apellido del usuarios
export const setSurNameChangeUser = (surName) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_SURNAME_CREATED,
        payload: { ...changeUser, surName: surName }
    })
};

//Obtener datos de la foto
export const setPhotoChangeUser = (photo) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_PHOTO_CREATED,
        payload: { ...changeUser, photo: photo }
    })
};

//limpiar datos para el campo nombre
export const setNameClearUserData = () => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_CLEAR_DATA_USER,
        payload: {
            ...changeUser,
            id: uuidv4(),
            userName: "",
            password: "",
            email: "",
            profileId: "",
            businessId: "",
            usersData: {},
            citizenShipCard: "",
            name: "",
            surName: "",
            area: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            departament: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            photo: null,
            contentType: "image/png"
        },
    });
};


/*<---------------ACTUALIZACION---------------> */
//Obtener datos para actualizar idUpdate
export const setIdUpdateChangeUser = (id) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_IDUSER_UPDATE,
        payload: { ...changeUser, idUpdate: id }
    })
}

//Obtener datos para actualizar userNameUpdate
export const setUserNameUpdateChangeUser = (user) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_USERNAME_UPDATE,
        payload: { ...changeUser, userNameUpdate: user }
    })
}

//Obtener datos para actualizar emailUpdate
export const setEmailUpdateChangeUser = (mail) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_EMAIL_UPDATE,
        payload: { ...changeUser, emailUpdate: mail }
    })
}

//Obtener datos para actualizar profileIdUpdate
export const setProfileIdUpdateChangeUser = (profile) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_PROFILEID_UPDATE,
        payload: { ...changeUser, profileIdUpdate: profile }
    })
}

//Obtener datos para actualizar businessIdUpdate
export const setBusinessIdUpdateChangeUser = (business) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_BUSINESSID_UPDATE,
        payload: { ...changeUser, businessIdUpdate: business }
    })
}

//Obtener datos para actualizar operationalState
export const setOperationalUpdateChangeUser = (bool) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_OPERATIONAL_UPDATE,
        payload: { ...changeUser, operationalState: bool }
    })
}

//Obtener datos para actualizar cedula citizenShipCardUpdate
export const setCedulaUpdateChangeUser = (cedula) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_CEDULA_UPDATE,
        payload: { ...changeUser, citizenShipCardUpdate: cedula }
    })
}

//Obtener datos para actualizar nombre
export const setNameUpdateChangeUser = (name) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_NAME_UPDATE,
        payload: { ...changeUser, nameUpdate: name }
    })
}

//obtener datos para actualizar apellido
export const setSurNameUpdateChangeUser = (surName) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_SURNAME_UPDATE,
        payload: { ...changeUser, surNameUpdate: surName }
    })
}

//obtener datos para actualizar la foto del usuario
export const setPhotoUpdateChangeUser = (photo) => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_PHOTO_UPDATE,
        payload: { ...changeUser, photoUpdate: photo }
    })
}

//limpiar datos de actualizacion de los datos
export const clearDataUpdateChangeUser = () => async (dispatch, getState) => {
    const { changeUser } = getState();
    dispatch({
        type: CHANGE_CLEAR_DATA_USER_UPDATE,
        payload: {
            ...changeUser,
            idUpdate: "",
            userNameUpdate: "",
            emailUpdate: "",
            profileIdUpdate: "",
            businessIdUpdate: "",
            operationalState: true,
            userDataDTO: {},
            citizenShipCardUpdate: "",
            nameUpdate: "",
            surNameUpdate: "",
            areaUpdate: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            departamentUpdate: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            photoUpdate: null
        }
    })
}