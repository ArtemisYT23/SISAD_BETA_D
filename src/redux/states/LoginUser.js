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


const initialState = {
    TockenUser: { },
    Route: ""
}

const TOCKEN_USER_LOGIN_SUCCESS = "TOCKEN_USER_LOGIN_SUCCESS";
const TOCKEN_USER_LOGIN_ERROR = "TOCKEN_USER_LOGIN_ERROR";
const CLEAR_TOCKEN_SESION_CLOSE_SECURITY = "CLEAR_TOCKEN_SESION_CLOSE_SECURITY";

export default function SesionReducer(state = initialState, action) {
    switch (action.type) {
        case TOCKEN_USER_LOGIN_SUCCESS:
        case TOCKEN_USER_LOGIN_ERROR:
        case CLEAR_TOCKEN_SESION_CLOSE_SECURITY:
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
        if (response.status == 200) {
            dispatch({
                type: TOCKEN_USER_LOGIN_SUCCESS,
                payload: { ...sesion, TockenUser: response.data, Route: response.status }
            });
            toast.success("ACCESO EXITOSO");
            dispatch(saveAllRolUserSecurity());
            dispatch(getAllGroupsCore());
            dispatch(getAllCabinetsCore());
            dispatch(getAllFoldersCore());
            dispatch(getTypeFileConfig());
            dispatch(getAllDocumentDocu());
            dispatch(getIndexCabinetGetAllConfig());
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: TOCKEN_USER_LOGIN_ERROR,
            payload: { ...sesion, TockenUser: [] }
        })
        toast.error(error.response?.data);
    })
};

//Eliminar tocken cierre de sesion 
export const setClearTockenInvalidate = () => async (dispatch, getState) => {
    const { sesion } = getState();
    dispatch({
        type: CLEAR_TOCKEN_SESION_CLOSE_SECURITY,
        payload: { sesion, TockenUser: {} },
    })
}