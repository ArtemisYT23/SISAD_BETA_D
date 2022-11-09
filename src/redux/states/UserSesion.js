import axios from "axios";
import { SecurityServer } from "../../config/axios";
import jwt_decode from "jwt-decode";

const initialState = {
    RolSesion: [],
    DataUser: {},
    SesionUser: {},
    elementError: "",
};

//Gestion de Usuarios
const SAVE_ROLL_USER_SECURITY = "SAVE_ROLL_USER_SECURITY";
const GET_USER_INFO_DATA_SECURITY = "GET_USER_INFO_DATA_SECURITY";
const GET_USER_SESION_SECURITY = "GET_USER_SESION_SECURITY";
const SET_CLEAR_MEMORY_DATA_USERSESIONCORE = "SET_CLEAR_MEMORY_DATA_USERSESIONCORE";

export default function UserSecurityReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_ROLL_USER_SECURITY:
        case GET_USER_INFO_DATA_SECURITY:
        case GET_USER_SESION_SECURITY:
        case SET_CLEAR_MEMORY_DATA_USERSESIONCORE:
            return action.payload;
        default:
            return state;
    }
}

//obtener rol de usuario por tocken
export const saveAllRolUserSecurity = () => async (dispatch, getState) => {
    const { userSesion, sesion } = getState();
    const { TockenUser } = sesion;
    const token = TockenUser.token;
    const decoded = jwt_decode(token);
    // console.log(decoded);
    const TockenData = Object.values(decoded);
    // console.log(TockenData);
    dispatch({
        type: SAVE_ROLL_USER_SECURITY,
        payload: { ...userSesion, RolSesion: TockenData }
    })
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
                Authorization: `Bearer ${TockenUser?.token}`,
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
                Authorization: `Bearer ${TockenUser?.token}`,
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
            elementError: "",
        }
    })
}