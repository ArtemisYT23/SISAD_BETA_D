import { SecurityServer } from "../../config/axios";
import axios from "axios";
import { getAllProfileSecurity } from "./Profile";
import { getUserInformationSecurity } from "./UserSesion";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
    UserList: [],
    isLoadingUser: false,
    SelectionUser: "",
    UserData: [],
    ElementError: "",
};

const GET_ALL_USER_LIST_SECURITY = "GET_ALL_USER_LIST_SECURITY";
const GET_ALL_USER_LIST_SECURITY_ERROR = "GET_ALL_USER_LIST_SECURITY_ERROR";
const SET_ACTIVE_SPINNER_USER = "SET_ACTIVE_SPINNER_USER";
const SELECTED_USER_CORE = "SELECTED_USER_CORE";
const SELECTED_ERRORS_USER_CORE = "SELECTED_ERRORS_USER_CORE";
const SET_CLEAR_MEMORY_DATA_USERLISTCORE = "SET_CLEAR_MEMORY_DATA_USERLISTCORE";

export default function UserCoreReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USER_LIST_SECURITY:
        case GET_ALL_USER_LIST_SECURITY_ERROR:
        case SET_ACTIVE_SPINNER_USER:
        case SELECTED_USER_CORE:
        case SELECTED_ERRORS_USER_CORE:
        case SET_CLEAR_MEMORY_DATA_USERLISTCORE:
            return action.payload;
        default:
            return state;
    }
};

//peticion con autorizacion para listar usuarios
export const getAllUserListSecurity = () => async (dispatch, getState) => {
    const { userCore, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setActiveLoadingSpinnerUser(true));
    axios({
        url: `${SecurityServer}user`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_USER_LIST_SECURITY,
                payload: {
                    ...userCore, UserList: response.data
                }
            })
            dispatch(getAllProfileSecurity());
            dispatch(setActiveLoadingSpinnerUser(false));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_USER_LIST_SECURITY_ERROR,
            payload: { ...userCore, UserList: [], ElementError: error }
        })
    });
}

//Filtrar Usuario Seleccionada para actualizar
export const setSelectedUserCore = (id) => async (dispatch, getState) => {
    const { userCore } = getState();
    const { UserList } = userCore;
    const SelectionUser = UserList.find(UserList => UserList.id == id);

    if (SelectionUser == undefined) {
        dispatch({
            type: SELECTED_ERRORS_USER_CORE,
            payload: { ...userCore, elementError: "El Id no existe" },
        });
        return;
    }

    dispatch({
        type: SELECTED_USER_CORE,
        payload: { ...userCore, SelectionUser },
    });
};

//Carga de Spinner de Usuarios
export const setActiveLoadingSpinnerUser = (bool) => async (dispatch, getState) => {
    const { userCore } = getState();
    dispatch({
        type: SET_ACTIVE_SPINNER_USER,
        payload: { ...userCore, isLoadingUser: bool }
    })
}



//limpiar estado del cabinetcore cierre de sesion 
export const setClearMemoryDataUserCore = () => async (dispatch, getState) => {
    const { userCore } = getState();
    dispatch({
        type: SET_CLEAR_MEMORY_DATA_USERLISTCORE,
        payload: {
            ...userCore,
            UserList: [],
            isLoadingUser: false,
            SelectionUser: "",
            UserData: [],
            ElementError: "",
        }
    })
}


/*<-----------CRUD DE USUARIOS-------------------> */
//traer todos los usuarios
export const getAllUserListCreated = () => async (dispatch, getState) => {
    const { userCore, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setActiveLoadingSpinnerUser(true));
    axios({
        url: `${SecurityServer}user`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_USER_LIST_SECURITY,
                payload: {
                    ...userCore, UserList: response.data
                }
            })
            dispatch(setActiveLoadingSpinnerUser(false));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_USER_LIST_SECURITY_ERROR,
            payload: { ...userCore, UserList: [], ElementError: error }
        })
    });
}


//Enviar datos de creacion de usuario
export const setUserCreatedSecurity = (UserNew) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    console.log(UserNew);
    axios({
        url: `${SecurityServer}user/register`,
        method: "POST",
        data: UserNew,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`,
        },
    })
        .then(function (response) {
            console.log(response);
            if (response.status == 200) {
                toast.success("Usuario Creado Exitosamente");
                dispatch(getAllUserListCreated());
            }
        })
        .catch(function (error) {
            console.log(error);
            toast.error("Error Usuario No Creado");
        });
};

//Actualizar datos de creacion de usuario
export const setUserUpdateSecurity = (id, UserUp) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${SecurityServer}user`,
        method: "PUT",
        data: UserUp,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`,
        },
    })
        .then(function (response) {
            console.log(response);
            if (response.status == 200) {
                toast.success("Usuario Actualizado Exitosamente");
                dispatch(getAllUserListCreated());
                dispatch(getUserInformationSecurity(id));
            }
        })
        .catch(function (error) {
            console.log(error);
            toast.error("Error Usuario No Actualizado");
        });
};

//Eliminar Datos de creacion de usuario
export const setUserDeleteSecurity = (data) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${SecurityServer}user`,
        method: "DELETE",
        data: data,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`,
        },
    })
        .then(function (response) {
            console.log(response);
            if (response.status == 200) {
                toast.success("Usuario Eliminado Exitosamente");
                dispatch(getAllUserListCreated());
            }
        })
        .catch(function (error) {
            console.log(error);
            toast.error("Error Usuario No Eliminado");
        });
};