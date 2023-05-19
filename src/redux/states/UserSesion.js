import axios from "axios";
import { SecurityServer } from "../../config/axios";
import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";
import { getAllUserListSecurity } from "./UserCore";
import toast from "react-hot-toast";

const initialState = {
    RolSesion: [],
    DataUser: {},
    SesionUser: {},
    OptionsTocken: [],
    elementError: "",
    hoursDuration: null,
    passwordGenerate: null,
};

//Gestion de Usuarios
const SAVE_ROLL_USER_SECURITY = "SAVE_ROLL_USER_SECURITY";
const GET_USER_INFO_DATA_SECURITY = "GET_USER_INFO_DATA_SECURITY";
const GET_USER_SESION_SECURITY = "GET_USER_SESION_SECURITY";
const SET_CLEAR_MEMORY_DATA_USERSESIONCORE = "SET_CLEAR_MEMORY_DATA_USERSESIONCORE";
const SESION_OPTIONS_VALID = "SESION_OPTIONS_VALID";
const CHANGE_PASSWORD_GENERATED = "CHANGE_PASSWORD_GENERATED";
const CHANGE_PASSWORD_GENERATED_ERRORS = "CHANGE_PASSWORD_GENERATED_ERRORS";

export default function UserSecurityReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_ROLL_USER_SECURITY:
        case GET_USER_INFO_DATA_SECURITY:
        case GET_USER_SESION_SECURITY:
        case SET_CLEAR_MEMORY_DATA_USERSESIONCORE:
        case SESION_OPTIONS_VALID:
        case CHANGE_PASSWORD_GENERATED:
        case CHANGE_PASSWORD_GENERATED_ERRORS:
            return action.payload;
        default:
            return state;
    }
}

//obtener rol de usuario por tocken
export const saveAllRolUserSecurity = () => async (dispatch, getState) => {
    const { userSesion, sesion } = getState();
    const { TockenUser } = sesion;
    const token = TockenUser;
    const decoded = jwt_decode(token);
    // console.log(decoded);
    const TockenData = Object.values(decoded);
    console.log(TockenData);
    //conversion de tiempo para el token
    //instancia y guarda en una variable lo que decodifica del token
    const decodedToken = jwtDecode(token);
    //guarda el tiempo que vino en el token
    const expirationTimestamp = decodedToken.exp;
    //aca obtiene la hora actual y la divide para 1000
    const currentTimestamp = Date.now() / 1000;
    //resta el tiempo del tocken - el tiempo actual y lo divide para 60
    const expirationMinutes = Math.floor(
        (expirationTimestamp - currentTimestamp) / 60
    );

    const milliseconds = expirationMinutes * 60000;

    dispatch({
        type: SAVE_ROLL_USER_SECURITY,
        payload: { ...userSesion, RolSesion: TockenData, hoursDuration: milliseconds }
    })
    if (TockenData[2] == "Administrator") {
        dispatch(getAllUserListSecurity());
    }
    dispatch(optionsValidateSecuritySesion());
}

//Obtener Informacion del usuario logeado 
export const getUserInformationSecurity = (id) => async (dispatch, getState) => {
    console.log(id);
    const { userSesion, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const res = await axios({
            url: `${SecurityServer}user/info/${id}`,
            headers: {
                Authorization: `Bearer ${TockenUser}`,
            }
        })
        if (res.status == 200) {
            dispatch({
                type: GET_USER_INFO_DATA_SECURITY,
                payload: { ...userSesion, DataUser: res.data }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//obtener usuario por sesion
export const getUserSesionSecurity = (id) => async (dispatch, getState) => {
    console.log(id);
    const { userSesion, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const res = await axios({
            url: `${SecurityServer}user/${id}`,
            headers: {
                Authorization: `Bearer ${TockenUser}`,
            }
        })
        if (res.status == 200) {
            dispatch({
                type: GET_USER_SESION_SECURITY,
                payload: { ...userSesion, SesionUser: res.data }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//guardar option del tocken para validar Accesos
export const optionsValidateSecuritySesion = () => async (dispatch, getState) => {
    const { userSesion } = getState();
    const { RolSesion } = userSesion;
    const OptionTocken = [];
    const OptionUser = [];
    const FinalOptions = [];
    RolSesion.forEach((rol, i) => {
        if (i == 5) {
            OptionTocken.push(rol);
        }
    });

    OptionTocken.forEach((obj, i) => {
        const data = obj.split(",");
        OptionUser.push(data);
    });

    console.log(OptionUser);

    const result = OptionUser.forEach((info, i) => {
        info.forEach((inf, i) => {
            const infoData = inf.split("_");
            const final = { id: infoData[0], name: infoData[1] };
            FinalOptions.push(final);
        });
    });
    dispatch({
        type: SESION_OPTIONS_VALID,
        payload: { ...userSesion, OptionsTocken: FinalOptions }
    })
}

//Cambio de contraseña para usuarios
export const changePasswordByUser = (userId) => async (dispatch, getState) => {
    const { userSesion, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const response = await axios({
            url: `${SecurityServer}auth/changepasswordbyuser/${userId}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${TockenUser}`,
            }
        });
        if (response.status == 200) {
            dispatch({
                type: CHANGE_PASSWORD_GENERATED,
                payload: { ...userSesion, passwordGenerate: response.data }
            })
            toast.success("Contraseña Generada con exito");
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_PASSWORD_GENERATED_ERRORS,
            payload: { ...userSesion, passwordGenerate: null }
        })
        toast.success("Error al generar Contraseña")
    }


}

//limpiar estado del cabinetcore cierre de sesion 
export const setClearMemoryDataSesionUserCore = () => async (dispatch, getState) => {
    const { userSesion } = getState();
    dispatch({
        type: SET_CLEAR_MEMORY_DATA_USERSESIONCORE,
        payload: {
            ...userSesion,
            RolSesion: [],
            DataUser: {},
            SesionUser: {},
            OptionsTocken: [],
            elementError: "",
        }
    })
}