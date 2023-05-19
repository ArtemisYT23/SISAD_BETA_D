import { DocumentServer, CoreServer } from "../../config/axios";
import axios from "axios";

const initialState = {
    folderId: "",
    ColaboratorDefault: [],
    UserSelected: [],
    ColaboratorFiles: [],
}

const SET_FOLDERID_SAVE = "SET_FOLDERID_SAVE";
const GET_FILETYPE_COLABORATOS = "GET_FILETYPE_COLABORATOS";
const GET_ERRORS_FILETYPE_COLABORATOS = "GET_ERRORS_FILETYPE_COLABORATOS";
const GET_DEFAULT_COLABATOR = "GET_DEFAULT_COLABATOR";
const GET_ERRORS_DEFAULT_COLABATOR = "GET_ERRORS_DEFAULT_COLABATOR";
const SET_SELECT_USERS = "SET_SELECT_USERS";


export default function AnalitycReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FOLDERID_SAVE:
        case GET_FILETYPE_COLABORATOS:
        case GET_ERRORS_FILETYPE_COLABORATOS:
        case GET_DEFAULT_COLABATOR:
        case GET_ERRORS_DEFAULT_COLABATOR:
        case SET_SELECT_USERS:
            return action.payload;
        default:
            return state;
    }
}


//folder id guardar
export const setFolderIdSave = (folderId) => async (dispatch, getState) => {
    const { analitycData } = getState();
    dispatch({
        type: SET_FOLDERID_SAVE,
        payload: { ...analitycData, folderId: folderId }
    })
}

//Traer Cantidad de archivos por defecto para filtro de colaboradores
export const getAllColaboratorDefaultFilter = (valueFilter) => async (dispatch, getState) => {
    const { analitycData, sesion } = getState();
    const { TockenUser } = sesion;

    axios({
        url: `${DocumentServer}docmetacountfilebyconditions`,
        method: "PUT",
        data: valueFilter,
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_DEFAULT_COLABATOR,
                payload: { ...analitycData, ColaboratorDefault: response.data }
            })
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ERRORS_DEFAULT_COLABATOR,
            payload: { ...analitycData, ColaboratorDefault: [] }
        })
    })
}

//Guardar Usuarios Seleccionados 
export const setSelectedUserFilter = (users, valueSearch) => async (dispatch, getState) => {
    const { analitycData } = getState();
    dispatch({
        type: SET_SELECT_USERS,
        payload: { ...analitycData, UserSelected: users }
    })
    dispatch(getAllFileTypeByColaborator(valueSearch))
}

//Traer Cantidad de tipos de archivos por cada colaborador
export const getAllFileTypeByColaborator = (valueSearch) => async (dispatch, getState) => {
    const { analitycData, sesion } = getState();
    const { TockenUser } = sesion;

    axios({
        url: `${DocumentServer}docmetacountfilebyconditions`,
        method: "PUT",
        data: valueSearch,
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_FILETYPE_COLABORATOS,
                payload: { ...analitycData, ColaboratorFiles: response.data }
            })
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ERRORS_FILETYPE_COLABORATOS,
            payload: { ...analitycData, ColaboratorFiles: [] }
        })
    })
} 