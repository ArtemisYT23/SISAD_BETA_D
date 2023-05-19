import axios from "axios";
import { SecurityServer } from "../../config/axios";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
    profile: [],
    business: [],
    SelectedProfile: "",
    isLoadingProfile: false,
    elementError: ""
}

const GET_PROFILE_SECURITY = "GET_PROFILE_SECURITY";
const GET_PROFILE_ERROR_SECURITY = "GET_PROFILE_ERROR_SECURITY";
const SELECTED_PROFILE_SUCCESS = "SELECTED_PROFILE_SUCCESS";
const SELECTED_PROFILE_ERROR = "SELECTED_PROFILE_ERROR";
const CLEAR_PROFILE_DATA = "CLEAR_PROFILE_DATA";
const SPINNER_ACTIVE_PROFILES = "SPINNER_ACTIVE_PROFILES";
const CLEAR_DATA_MEMORY_PROFILE = "CLEAR_DATA_MEMORY_PROFILE";
const GET_ALL_BUSINESS_DATA = "GET_ALL_BUSINESS_DATA";
const GET_ALL_BUSINESS_DATA_ERRORS = "GET_ALL_BUSINESS_DATA_ERRORS";

export default function ProfileReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE_SECURITY:
        case GET_PROFILE_ERROR_SECURITY:
        case SELECTED_PROFILE_SUCCESS:
        case SELECTED_PROFILE_ERROR:
        case CLEAR_PROFILE_DATA:
        case SPINNER_ACTIVE_PROFILES:
        case CLEAR_DATA_MEMORY_PROFILE:
        case GET_ALL_BUSINESS_DATA:
        case GET_ALL_BUSINESS_DATA_ERRORS:
            return action.payload;
        default:
            return state;
    }
}

//peticion con autorizacion para listar perfiles
export const getAllProfileSecurity = () => async (dispatch, getState) => {
    const { profileCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${SecurityServer}profile`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_PROFILE_SECURITY,
                payload: {
                    ...profileCore, profile: response.data
                }
            })
            dispatch(setBusinessAllData());
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_PROFILE_ERROR_SECURITY,
            payload: { ...profileCore, profile: [], elementError: error }
        })
    });
}


//Traer todas las empresas 
export const setBusinessAllData = () => async (dispatch, getState) => {
    const { profileCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${SecurityServer}business`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if(response.status == 200) {
            dispatch({
                type: GET_ALL_BUSINESS_DATA,
                payload: { ...profileCore, business: response.data}
            })
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_BUSINESS_DATA_ERRORS,
            payLOAD: { ...profileCore, business: []}
        })
    })
}


//filtrar perfil seleccionado para actualizar
export const setfilterProfileSelected = (id) => async (dispatch, getState) => {
    const { profileCore } = getState();
    const { profile } = profileCore;
    const SelectedProfile = profile.find(profile => profile.id === id);

    if (SelectedProfile == undefined) {
        dispatch({
            type: SELECTED_PROFILE_ERROR,
            payload: { ...profileCore, elementError: "El Id no existe" },
        });
        return;
    }

    dispatch({
        type: SELECTED_PROFILE_SUCCESS,
        payload: { ...profileCore, SelectedProfile }
    })
}

//spinner para perfiles
export const setSpinnerActive = (bool) => async (dispatch, getState) => {
    const { profileCore } = getState();
    dispatch({
        type: SPINNER_ACTIVE_PROFILES,
        payload: { ...profileCore, isLoadingProfile: bool }
    })
}


/*<-----------------CRUD DE PERFILES------------->*/
//Crear nuevo perfil y accesos
export const CreateProfileCore = (newProfile, newAccess) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setSpinnerActive(true));
    axios({
        url: `${SecurityServer}profile`,
        method: "POST",
        data: newProfile,
        headers: {
            'Content-Type': "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            toast.success('Perfil Creado');
            dispatch(getAllProfileSecurity());
            dispatch(CreateAccessCore(newAccess))
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Perfil no Creado.');
    })
}

//actualizar un perfil y sus Accesos
export const UpdateProfileCore = (updateProfile, updateAccess) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setSpinnerActive(true));
    axios({
        url: `${SecurityServer}profile`,
        method: "PUT",
        data: updateProfile,
        headers: {
            'Content-Type': "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            toast.success('Perfil Actualizado');
            dispatch(getAllProfileSecurity());
            dispatch(UpdateAccessCore(updateAccess));
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Perfil no Actualizado');
    })
}

//eliminar un perfil y sus accesos
export const DeleteProfileCore = (deleteProfile, deleteAccess) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${SecurityServer}profile`,
        method: "DELETE",
        data: deleteProfile,
        headers: {
            'Content-Type': "Application/json",
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            toast.success('Perfil Eliminado');
            dispatch(getAllProfileSecurity());
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Perfil no Eliminado');
    })
}

//Crear Accesos para un Perfil
export const CreateAccessCore = (newAccess) => async (dispatch, getState) => {
    console.log(newAccess);
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${SecurityServer}access`,
        method: "POST",
        data: newAccess,
        headers: {
            'Content-Type': "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        console.log(response.status);
        if (response.status === 200) {
            dispatch(setSpinnerActive(false));
            toast.success('Accesos Creados');
        }
    }).catch(function (error) {
        console.log(error);
        dispatch(setSpinnerActive(false));
        toast.error('Error Accesos no Creados');
    })
}

//Actualizar Accesos para un perfil
export const UpdateAccessCore = (updateAccess) => async (dispatch, getState) => {
    console.log(updateAccess);
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${SecurityServer}access`,
        method: "PUT",
        data: updateAccess,
        headers: {
            'Content-Type': "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        console.log(response.status);
        if (response.status === 200) {
            dispatch(setSpinnerActive(false));
            toast.success('Accesos Actualizado');
        }

    }).catch(function (error) {
        console.log(error);
        dispatch(setSpinnerActive(false));
        toast.error('Error Accesos no Actualizados');
    })
}


//limpiar estado de cierre de sesion 
export const setClearDataMemoryProfile = () => async (dispatch, getState) => {
    const { profileCore } = getState();
    dispatch({
        type: CLEAR_DATA_MEMORY_PROFILE,
        payload: {
            ...profileCore,
            profile: [],
            SelectedProfile: "",
            isLoadingProfile: false,
            elementError: ""
        }
    })
}

