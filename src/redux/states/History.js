import axios from "axios";
import { CoreServer, DocumentServer } from "../../config/axios";

const initialState = {
    historyResource: [],
    historyResourceDocu: [],
    historyUserCore: [],
    historyUser: [],
    UnionHistory: [],
    isLoadingHistoryUser: false
};

const GET_ALL_HISTORY_RESOURSE = "GET_ALL_HISTORY_RESOURSE";
const GET_ALL_HISTORY_RESOURSE_DOCU = "GET_ALL_HISTORY_RESOURSE_DOCU";
const GET_ALL_HISTORY_USER_DOCU = "GET_ALL_HISTORY_USER_DOCU";
const GET_ALL_HISTORY_USER_CORE_DOCU = "GET_ALL_HISTORY_USER_CORE_DOCU";
const SET_CONCAT_DATA_HISTORY = "SET_CONCAT_DATA_HISTORY";
const ERROR_HISTORY_USER_CORE_DOCU = "ERROR_HISTORY_USER_CORE_DOCU";
const SET_ACTIVE_SPINNER_HISTORY = "SET_ACTIVE_SPINNER_HISTORY";
const ERROR_HISTORY_USER_DOCU = "ERROR_HISTORY_USER_DOCU";
const CLEAR_DATA_HISTORY_USER_CORE = "CLEAR_DATA_HISTORY_USER_CORE";
const CLEAR_DATA_HISTORY_DOCUMENT = "CLEAR_DATA_HISTORY_DOCUMENT";
const CLEAR_DATA_RESOURCE_CORE = "CLEAR_DATA_RESOURCE_CORE";
const CLEAR_DATA_RESOURSE_DOCUMENTAL = "CLEAR_DATA_RESOURSE_DOCUMENTAL";
const CLEAR_DATA_MEMORY_HISTORY = "CLEAR_DATA_MEMORY_HISTORY";

export default function HistoryReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_HISTORY_RESOURSE:
        case GET_ALL_HISTORY_RESOURSE_DOCU:
        case GET_ALL_HISTORY_USER_DOCU:
        case GET_ALL_HISTORY_USER_CORE_DOCU:
        case ERROR_HISTORY_USER_CORE_DOCU:
        case SET_CONCAT_DATA_HISTORY:
        case SET_ACTIVE_SPINNER_HISTORY:
        case ERROR_HISTORY_USER_DOCU:
        case CLEAR_DATA_HISTORY_USER_CORE:
        case CLEAR_DATA_HISTORY_DOCUMENT:
        case CLEAR_DATA_RESOURCE_CORE:
        case CLEAR_DATA_RESOURSE_DOCUMENTAL:
        case CLEAR_DATA_MEMORY_HISTORY:
            return action.payload;
        default:
            return state;
    }
};

//spiner de carga de datos de historial
export const setActiveSpinnerHistory = (bool) => async (dispatch, getState) => {
    const { historyCore } = getState();
    dispatch({
        type: SET_ACTIVE_SPINNER_HISTORY,
        payload: { ...historyCore, isLoadingHistoryUser: bool }
    })
}

/*<---------------- HISTORIAL POR USUARIO Y RECURSO---------------------->*/
//peticion traer historial de un elemento por usuario de sesion en core
export const getAllHistoryElementCore = (resourseId, userId) => async (dispatch, getState) => {
    const { historyCore, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setActiveSpinnerHistory(true));
    axios({
        url: `${CoreServer}traceability/${userId}/${resourseId}/0/500`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_HISTORY_RESOURSE,
                payload: {
                    ...historyCore, historyResource: response.data.traceabilityList
                }
            })
            dispatch(setActiveSpinnerHistory(false));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch(setActiveSpinnerHistory(false));
    })
}

//limpiar estado de recursos de core
export const clearResourceDataCore = () => async (dispatch, getState) => {
    const { historyCore } = getState();
    dispatch({
        type: CLEAR_DATA_RESOURCE_CORE,
        payload: { ...historyCore, historyResource: [] }
    })
}

//peticion traer historial de un elemento por usuario de sesion en documental
export const getAllHistoryElementDocu = (resourseId, userId) => async (dispatch, getState) => {
    const { historyCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}traceability/${userId}/${resourseId}/0/500`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_HISTORY_RESOURSE_DOCU,
                payload: {
                    ...historyCore, historyResourceDocu: response.data.traceabilityList
                }
            })
        }
    }).catch(function (error) {
        console.log(error);
    })
}

//limpiar estado de recursos de documental
export const clearResourseDataDocumental = () => async (dispatch, getState) => {
    const { historyCore } = getState();
    dispatch({
        type: CLEAR_DATA_RESOURSE_DOCUMENTAL,
        payload: { ...historyCore, historyResourceDocu: [] }
    })
}


/*<---------------- HISTORIAL POR USUARIO---------------------->*/
//traer historial por usuario de Core
export const getAllHistoryUserCore = (user, valor) => async (dispatch, getState) => {
    const { historyCore, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setActiveSpinnerHistory(true));
    axios({
        url: `${CoreServer}traceabilitybyuser/${user?.id}/0/${valor}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        dispatch(clearDataHistoryUserCore());
        dispatch(clearDataHistoryDocument());
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_HISTORY_USER_CORE_DOCU,
                payload: {
                    ...historyCore, historyUserCore: response.data.traceabilityList
                }
            })
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: ERROR_HISTORY_USER_CORE_DOCU,
            payload: { ...historyCore, historyUserCore: [] }
        })
        dispatch(clearDataHistoryDocument());
        dispatch(setActiveSpinnerHistory(false));
    })
}

//limpiar estado de historial de usuario de core
export const clearDataHistoryUserCore = () => async (dispatch, getState) => {
    const { historyCore } = getState();
    dispatch({
        type: CLEAR_DATA_HISTORY_USER_CORE,
        payload: { ...historyCore, historyUserCore: [] }
    })
}

//traer historial por usuario de Document
export const getAllHistoryUserDocu = (user, valor) => async (dispatch, getState) => {
    const { historyCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}traceabilitybyuser/${user?.id}/0/${valor}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_HISTORY_USER_DOCU,
                payload: {
                    ...historyCore, historyUserCore: response.data.traceabilityList
                }
            })
            dispatch(setActiveSpinnerHistory(false));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: ERROR_HISTORY_USER_DOCU,
            payload: { ...historyCore, historyUserCore: [] }
        })
        dispatch(setActiveSpinnerHistory(false));
    })
}

//limpiar estado de historial de documentos
export const clearDataHistoryDocument = () => async (dispatch, getState) => {
    const { historyCore } = getState();
    dispatch({
        type: CLEAR_DATA_HISTORY_DOCUMENT,
        payload: { ...historyCore, historyUser: [] }
    })
}


//limpiar estado de historiales
export const setClearDataMemoryHistory = () => async (dispatch, getState) => {
    const { historyCore } = getState();
    dispatch({
        type: CLEAR_DATA_MEMORY_HISTORY,
        payload: {
            ...historyCore,
            historyResource: [],
            historyResourceDocu: [],
            historyUserCore: [],
            historyUser: [],
            UnionHistory: [],
            isLoadingHistoryUser: false
        }
    })
}

