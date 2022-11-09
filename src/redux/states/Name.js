import { setClearTockenInvalidate } from "./LoginUser";
import {
    setSelectedNullCore,
    setSelectedSearchNullCore,
} from "./View";
import { setClearMemoryDataGroupCore } from "./Group";
import { setClearDataCabinetCore } from "./Cabinet";

const initialState = {
    breackcompGroup: null,
    breackcomp: null,
    breackcompFolder: null,
    NameGlobalSelected: "",
    NameManagmentSelected: "",
    elementError: "",
}

//nombre global para header
const GET_NAME_ELEMENT_GLOBAL_CHANGE = "GET_NAME_ELEMENT_GLOBAL_CHANGE";
const GET_CLEANER_NAME_ELEMENT_GLOBAL_CHANGE = "GET_CLEANER_NAME_ELEMENT_GLOBAL_CHANGE";
const ADD_DATA_ELEMENT_SELECTED_GROUP = "ADD_DATA_ELEMENT_SELECTED_GROUP";
const BREAK_GROUPS_ERROR = "BREAK_GROUPS_ERROR";
const CLEAR_DATA_ELEMENT_GROUPS_SELECTED_CORE = "CLEAR_DATA_ELEMENT_GROUPS_SELECTED_CORE";
const ADD_DATA_ELEMENT_SELECTED_CORE = "ADD_DATA_ELEMENT_SELECTED_CORE";
const BREAK_CABINETS_ERROR = "BREAK_CABINETS_ERROR";
const CLEAR_DATA_ELEMENT_SELECTED_CORE = "CLEAR_DATA_ELEMENT_SELECTED_CORE";
const ADD_DATA_ELEMENT_FOLDER_SELECTED_CORE = "ADD_DATA_ELEMENT_FOLDER_SELECTED_CORE";
const CLEAR_DATA_ELEMENT_FOLDER_SELECTED_CORE = "CLEAR_DATA_ELEMENT_FOLDER_SELECTED_CORE";
const GET_NAME_ELEMENT_MANAGMENT_CHANGE = "GET_NAME_ELEMENT_MANAGMENT_CHANGE";

export default function NameReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NAME_ELEMENT_GLOBAL_CHANGE:
        case GET_CLEANER_NAME_ELEMENT_GLOBAL_CHANGE:
        case ADD_DATA_ELEMENT_SELECTED_GROUP:
        case BREAK_GROUPS_ERROR:
        case CLEAR_DATA_ELEMENT_GROUPS_SELECTED_CORE:
        case ADD_DATA_ELEMENT_SELECTED_CORE:
        case BREAK_CABINETS_ERROR:
        case CLEAR_DATA_ELEMENT_SELECTED_CORE:
        case ADD_DATA_ELEMENT_FOLDER_SELECTED_CORE:
        case CLEAR_DATA_ELEMENT_FOLDER_SELECTED_CORE:
        case GET_NAME_ELEMENT_MANAGMENT_CHANGE:
            return action.payload;
        default:
            return state;
    }
}


/*<--------------Tituto del header--------------->*/
export const getNameGlobalChange = (name) => async (dispatch, getState) => {
    const { nameCore } = getState();
    dispatch({
        type: GET_NAME_ELEMENT_GLOBAL_CHANGE,
        payload: { ...nameCore, NameGlobalSelected: name }
    })
};

//vaciar estado del titulo del header
export const getNameGlobalChangeCleaner = () => async (dispatch, getState) => {
    const { nameCore } = getState();
    dispatch({
        type: GET_CLEANER_NAME_ELEMENT_GLOBAL_CHANGE,
        payload: { ...nameCore, NameGlobalSelected: "" }
    })
};

//name config documentary
/*<------------------Guardar nombre de la seleccion de menun de managament----------------->*/
export const getNameManagmentChange = (name) => async (dispatch, getState) => {
    const { nameCore } = getState();
    dispatch({
        type: GET_NAME_ELEMENT_MANAGMENT_CHANGE,
        payload: { ...nameCore, NameManagmentSelected: name }
    })
}

/*<-------------------BREAKCOMP--------------------> */
//filtrar array para breakcomp de grupos
export const setSaveElementBreakGroup = (id) => async (dispatch, getState) => {
    const { nameCore, groupCore } = getState();
    const { groups } = groupCore;
    const breackcompGroup = groups.find(groups => groups.id == id);

    if (breackcompGroup == undefined) {
        dispatch({
            type: BREAK_GROUPS_ERROR,
            payload: { ...nameCore, elementError: "El id no existe" }
        });
        return;
    }
    dispatch({
        type: ADD_DATA_ELEMENT_SELECTED_GROUP,
        payload: { ...nameCore, breackcompGroup }
    })
}

//limpiar array de datos para breakcomp de grupos
export const setClearElementGroupBreak = () => async (dispatch, getState) => {
    const { nameCore } = getState();
    dispatch({
        type: CLEAR_DATA_ELEMENT_GROUPS_SELECTED_CORE,
        payload: { ...nameCore, breackcompGroup: null }
    })
}

//guardar array para breakcomp de gabinetes 
export const setSaveElementBreak = (id) => async (dispatch, getState) => {
    const { nameCore, cabinetCore } = getState();
    const { cabinets } = cabinetCore;
    const breackcomp = cabinets.find(cabinets => cabinets.id == id);

    if (breackcomp == undefined) {
        dispatch({
            type: BREAK_CABINETS_ERROR,
            payload: { ...nameCore, elementError: "El id no existe" }
        });
        return;
    }

    dispatch({
        type: ADD_DATA_ELEMENT_SELECTED_CORE,
        payload: { ...nameCore, breackcomp }
    })
}

//Limpiar estado del breakcomp de gabinetes
export const setClearElementBreak = () => async (dispatch, getState) => {
    const { nameCore } = getState();
    dispatch({
        type: CLEAR_DATA_ELEMENT_SELECTED_CORE,
        payload: { ...nameCore, breackcomp: null }
    })
}

//guardar array para breakcomp de carpetas
export const setSaveElementBreakFolder = (Data) => async (dispatch, getState) => {
    const { nameCore } = getState();
    dispatch({
        type: ADD_DATA_ELEMENT_FOLDER_SELECTED_CORE,
        payload: { ...nameCore, breackcompFolder: Data }
    })
}


//limpiar estado del breakcomp de carpetas
export const setClearElementFolderBreak = () => async (dispatch, getState) => {
    const { nameCore } = getState();
    dispatch({
        type: CLEAR_DATA_ELEMENT_FOLDER_SELECTED_CORE,
        payload: { ...nameCore, breackcompFolder: null }
    })
}

//cierre de sesion global
export const closeSesionCleaningState = () => async (dispatch, getState) => {
    dispatch(setClearElementFolderBreak());
    dispatch(setClearElementBreak());
    dispatch(setClearElementGroupBreak());
    dispatch(getNameGlobalChangeCleaner());
    dispatch(setClearTockenInvalidate());
    dispatch(setSelectedNullCore());
    dispatch(setSelectedSearchNullCore());
    dispatch(setClearMemoryDataGroupCore());
    dispatch(setClearDataCabinetCore());
}

export const CleaningStateInitial = () => async (dispatch, getState) => {
    dispatch(setClearElementFolderBreak());
    dispatch(setClearElementBreak());
    dispatch(setClearElementGroupBreak());
    dispatch(getNameGlobalChangeCleaner());
    dispatch(setSelectedNullCore());
    dispatch(setSelectedSearchNullCore());
}