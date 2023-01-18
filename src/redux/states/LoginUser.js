import axios from "axios";
import toast from "react-hot-toast";
import { SecurityServer } from "../../config/axios";
import { getAllCabinetsCore } from "./Cabinet";
import { getTypeFileConfig } from "./FileType";
import { getAllGroupsCore } from "./Group";
import { getAllFoldersCore } from "./Folder";
import { getAllDocumentDocu } from "./Document";
import { saveAllRolUserSecurity } from "./UserSesion";
import { getIndexCabinetGetAllConfig } from "./Indexes";
import { setOpenModalRecuperationPassword } from "./ActionSecurity";
import { getAllPermisionResource } from "../states/ResourceCore";

// const tocken = localStorage.getItem('tocken');

const initialState = {
    TockenUser: "",
    Route: false,
    passForm: 0,
    userId: "",
    verifyPing: false,
}

const TOCKEN_USER_LOGIN_SUCCESS = "TOCKEN_USER_LOGIN_SUCCESS";
const TOCKEN_USER_LOGIN_ERROR = "TOCKEN_USER_LOGIN_ERROR";
const CLEAR_TOCKEN_SESION_CLOSE_SECURITY = "CLEAR_TOCKEN_SESION_CLOSE_SECURITY";
const SUCESS_PING_RESET_PASS = "SUCESS_PING_RESET_PASS";
const ERROR_PING_RESET_PASS = "ERROR_PING_RESET_PASS";
const CLEAR_NUMBER_SECTION_FORM = "CLEAR_NUMBER_SECTION_FORM";
const SET_RESET_PASSWORD_REQUEST = "SET_RESET_PASSWORD_REQUEST";
const PING_VALIDATED_REQUEST = "PING_VALIDATED_REQUEST";
const PING_VALIDATED_REQUEST_ERROR = "PING_VALIDATED_REQUEST_ERROR";

export default function SesionReducer(state = initialState, action) {
    switch (action.type) {
        case TOCKEN_USER_LOGIN_SUCCESS:
        case SET_RESET_PASSWORD_REQUEST:
        case CLEAR_TOCKEN_SESION_CLOSE_SECURITY:
        case SUCESS_PING_RESET_PASS:
        case ERROR_PING_RESET_PASS:
        case CLEAR_NUMBER_SECTION_FORM:
        case PING_VALIDATED_REQUEST:
        case PING_VALIDATED_REQUEST_ERROR:
            return action.payload;
        default:
            return state;
    }
};

//obtener tocken de inicio de sesion 
export const setLoginUserTocken = (LoginData) => async (dispatch, getState) => {
    const { sesion } = getState();
    axios({
        url: `${SecurityServer}user/login`,
        method: "POST",
        data: LoginData,
        headers: {
            'Content-Type': "Application/json",
            'Access-Control-Allow-Origin': '*',

        },
    }).then(function (response) {
        // localStorage.setItem('tocken', response.data.token);
        // const tocken = localStorage.getItem('tocken');
        // console.log(tocken);
        if (response.status == 200) {
            dispatch({
                type: TOCKEN_USER_LOGIN_SUCCESS,
                payload: { ...sesion, TockenUser: response.data.token, Route: response.status }
            });
            toast.success("ACCESO EXITOSO");
            dispatch(saveAllRolUserSecurity());
            dispatch(getAllGroupsCore());
            dispatch(getAllCabinetsCore());
            dispatch(getAllFoldersCore());
            dispatch(getTypeFileConfig());
            dispatch(getAllDocumentDocu());
            dispatch(getIndexCabinetGetAllConfig());
            dispatch(getAllPermisionResource());
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: TOCKEN_USER_LOGIN_ERROR,
            payload: { ...sesion, TockenUser: "" }
        })
        toast.error(error.response?.data);
    })
};


//Eliminar tocken cierre de sesion 
export const setClearTockenInvalidate = () => async (dispatch, getState) => {
    const { sesion } = getState();
    // localStorage.removeItem('tocken');
    dispatch({
        type: CLEAR_TOCKEN_SESION_CLOSE_SECURITY,
        payload: { sesion, TockenUser: "" },
    })
}

//regresar estado inicial de formulario de reset password
export const resetFormPassword = () => async (dispatch, getState) => {
    const { sesion } = getState();
    dispatch({
        type: CLEAR_NUMBER_SECTION_FORM,
        payload: { ...sesion, passForm: 0 }
    })
}


//Enviar Correo para recuperacion por medio del usuario
export const setUserResetPassword = (userData) => async (dispatch, getState) => {
    const { sesion } = getState();
    axios({
        url: `${SecurityServer}auth/requestresetpassword`,
        method: "POST",
        data: userData,
        headers: {
            'Content-Type': "Application/json",
            'Access-Control-Allow-Origin': '*',

        },
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: SET_RESET_PASSWORD_REQUEST,
                payload: { ...sesion, userId: response.data }
            })
            dispatch(setOpenModalRecuperationPassword(true));

        }
    }).catch(function (error) {
        console.log(error);
    })
};

//validar si el ping fue usado o no
export const setValidatePingUsed = (id, userPing) => async (dispatch, getState) => {
    const { sesion } = getState();
    axios({
        url: `${SecurityServer}auth/verifyclaimed/${id}`,
        method: "GET",
        headers: {
            'Content-Type': "Application/json",
            'Access-Control-Allow-Origin': '*',

        },
    }).then(function (response) {
        if (response.status == 200) {
            response.data.isClaimed ?
                toast.error("El Pin Fue Usado")
                : dispatch(setValidatePingReset(userPing))
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: PING_VALIDATED_REQUEST_ERROR,
            payload: { ...sesion, verifyPing: "" }
        })
    })
}

//Validar ping de confirmacion
export const setValidatePingReset = (userPing) => async (dispatch, getState) => {
    const { sesion } = getState();
    axios({
        url: `${SecurityServer}auth/confirmpincode`,
        method: "POST",
        data: userPing,
        headers: {
            'Content-Type': "Application/json",
            'Access-Control-Allow-Origin': '*',

        },
    }).then(function (response) {
        if (response.status == 200) {
            response.data.isCorrect ?
                dispatch({
                    type: SUCESS_PING_RESET_PASS,
                    payload: { ...sesion, passForm: 1 }
                }) : toast.error("Pin Incorrecto")
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: ERROR_PING_RESET_PASS,
            payload: { ...sesion, passForm: 0 }
        })
    })
}

//cambiar contraseña despues de verificacion
export const changePasswordVerification = (userPass) => async (dispatch, getState) => {
    axios({
        url: `${SecurityServer}auth/resetpassword`,
        method: "PUT",
        data: userPass,
        headers: {
            'Content-Type': "Application/json",
            'Access-Control-Allow-Origin': '*',
        }
    }).then(function (response) {
        if (response.status == 200) {
            toast.success("Contraseña Cambiada")
        }
    }).catch(function (error) {
        console.log(error);
        toast.error("Error En Cambio de Contraseña")
    })
}