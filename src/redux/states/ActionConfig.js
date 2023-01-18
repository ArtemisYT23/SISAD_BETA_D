import { setChangeSelectView } from "./View";

//estados iniciales
const initialState = {
    IndexCreated: false,
    IndexUpdate: false,
    IndexDelete: false,
    ListDataCreated: false,
    ListDataUpdate: false,
    ListDataDelete: false,
    ListElementCreated: false,
    ListElementUpdate: false,
    ListElementDelete: false,
    TypeFileCreated: false,
    TypeFileUpdate: false,
    TypeFileDelete: false,
    TypeDataCreated: false,
    TypeDataUpdate: false,
    TypeDataDelete: false,
}

const OPEN_MODAL_CREATED_INDEX_CONFIG = "OPEN_MODAL_CREATED_INDEX_CONFIG";
const OPEN_MODAL_UPDATE_INDEX_CONFIG = "OPEN_MODAL_UPDATE_INDEX_CONFIG";
const OPEN_MODAL_INDEX_DELETE_CONFIG = "OPEN_MODAL_INDEX_DELETE_CONFIG";
const OPEN_MODAL_CREATED_LISTDATA_CONFIG = "OPEN_MODAL_CREATED_LISTDATA_CONFIG";
const OPEN_MODAL_UPDATE_LISTDATA_CONFIG = "OPEN_MODAL_UPDATE_LISTDATA_CONFIG";
const OPEN_MODAL_DELETE_LISTDATA_CONFIG = "OPEN_MODAL_DELETE_LISTDATA_CONFIG";
const OPEN_MODAL_CREATED_LISTELEMENT_CONFIG = "OPEN_MODAL_CREATED_LISTELEMENT_CONFIG";
const OPEN_MODAL_UPDATE_ELEMENT_CONFIG = "OPEN_MODAL_UPDATE_ELEMENT_CONFIG";
const OPEN_MODAL_DELETE_ELEMENT_CONFIG = "OPEN_MODAL_DELETE_ELEMENT_CONFIG";
const OPEN_MODAL_TYPEFILE_CREATED_CONFIG = "OPEN_MODAL_TYPEFILE_CREATED_CONFIG";
const OPEN_MODAL_TYPEFILE_UPDATE_CONFIG = "OPEN_MODAL_TYPEFILE_UPDATE_CONFIG";
const OPEN_MODAL_TYPEFILE_DELETE_CONFIG = "OPEN_MODAL_TYPEFILE_DELETE_CONFIG";
const OPEN_MODAL_CREATED_TYPEDATA_CONFIG = "OPEN_MODAL_CREATED_TYPEDATA_CONFIG";
const OPEN_MODAL_UPDATE_TYPEDATA_CONFIG = "OPEN_MODAL_UPDATE_TYPEDATA_CONFIG";
const OPEN_MODAL_DELETE_TYPEDATA_CONFIG = "OPEN_MODAL_DELETE_TYPEDATA_CONFIG";

//payload de tag de acciones 
export default function ModalConfigReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL_CREATED_INDEX_CONFIG:
        case OPEN_MODAL_UPDATE_INDEX_CONFIG:
        case OPEN_MODAL_INDEX_DELETE_CONFIG:
        case OPEN_MODAL_CREATED_LISTDATA_CONFIG:
        case OPEN_MODAL_UPDATE_LISTDATA_CONFIG:
        case OPEN_MODAL_DELETE_LISTDATA_CONFIG:
        case OPEN_MODAL_CREATED_LISTELEMENT_CONFIG:
        case OPEN_MODAL_UPDATE_ELEMENT_CONFIG:
        case OPEN_MODAL_DELETE_ELEMENT_CONFIG:
        case OPEN_MODAL_TYPEFILE_CREATED_CONFIG:
        case OPEN_MODAL_TYPEFILE_UPDATE_CONFIG:
        case OPEN_MODAL_TYPEFILE_DELETE_CONFIG:
        case OPEN_MODAL_CREATED_TYPEDATA_CONFIG:
        case OPEN_MODAL_UPDATE_TYPEDATA_CONFIG:
        case OPEN_MODAL_DELETE_TYPEDATA_CONFIG:
            return action.payload;
        default:
            return state;
    }
};


/*<---------INDEX-----------> */

//modal para crear nuevo indice
export const setOpenModalConfigCreated = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type: OPEN_MODAL_CREATED_INDEX_CONFIG,
        payload: { ...modalConfig, IndexCreated: bool }
    });
};

//modal para actualizar indice
export const setOpenModalConfigUpdate = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type: OPEN_MODAL_UPDATE_INDEX_CONFIG,
        payload: { ...modalConfig, IndexUpdate: bool }
    })
}

//modal para eliminar indice
export const setOpenModalConfigDelete = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type: OPEN_MODAL_INDEX_DELETE_CONFIG,
        payload: { ...modalConfig, IndexDelete: bool }
    })
}

/*<--------------LISTAS----------------->*/
//Modal Crear nueva lista de datos
export const setOpenModalListDataCreated = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type: OPEN_MODAL_CREATED_LISTDATA_CONFIG,
        payload: { ...modalConfig, ListDataCreated: bool }
    });
};

//Modal Editar lista de datos
export const setOpenModalListDataUpdate = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type: OPEN_MODAL_UPDATE_LISTDATA_CONFIG,
        payload: { ...modalConfig, ListDataUpdate: bool }
    });
};

//modal para eliminar lista de datos
export const setOpenListDataDelete = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type: OPEN_MODAL_DELETE_LISTDATA_CONFIG,
        payload: { ...modalConfig, ListDataDelete: bool }
    });
};

/*<-----------------ELEMENTOS DE LISTA------------------->*/
//modal para crear nuevo elemento de la lista
export const setOpenModalListElementCreated = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type: OPEN_MODAL_CREATED_LISTELEMENT_CONFIG,
        payload: { ...modalConfig, ListElementCreated: bool }
    });
};

//modal para editar elemento de una lista
export const setOpenModalListElementUpdate = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type: OPEN_MODAL_UPDATE_ELEMENT_CONFIG,
        payload: { ...modalConfig, ListElementUpdate: bool }
    });
};

//modal para eliminar elemento de una lista
export const setOpenModalListElementDelete = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type: OPEN_MODAL_DELETE_ELEMENT_CONFIG,
        payload: { ...modalConfig, ListElementDelete: bool }
    });
};

/*<------------------FILETYPE---------------------> */
//modal para guardar nuevo tipo de archivo
export const setOpenModalTypeFileCreated = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type: OPEN_MODAL_TYPEFILE_CREATED_CONFIG,
        payload: {
            ...modalConfig, TypeFileCreated: bool
        }
    });
};

//Modal para Editar tipo de archivo
export const setOpenModalTypeFileUpdate = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type: OPEN_MODAL_TYPEFILE_UPDATE_CONFIG,
        payload: {
            ...modalConfig, TypeFileUpdate: bool
        }
    });
};

//Modal para eliminar tipo de archivo
export const setOpenModalTypeFileDelete = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type: OPEN_MODAL_TYPEFILE_DELETE_CONFIG,
        payload: {
            ...modalConfig, TypeFileDelete: bool
        }
    });
};

/*<-----------------DATATYPE-----------------> */
 //modal para guardado de nuevo tipo de dato 
 export const setOpenModalTypeDataCreated = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type: OPEN_MODAL_CREATED_TYPEDATA_CONFIG,
        payload: { ...modalConfig, TypeDataCreated: bool }
    });
};

//modal para actualizar un tipo de dato 
export const setOpenModalTypeDataUpdate = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type: OPEN_MODAL_UPDATE_TYPEDATA_CONFIG,
        payload: { ...modalConfig, TypeDataUpdate: bool }
    });
};

//modal para eliminar un tipo de dato
export const setOpenTypeDataDelete = (bool) => async (dispatch, getState) => {
    const { modalConfig } = getState();
    dispatch({
        type:OPEN_MODAL_DELETE_TYPEDATA_CONFIG,
        payload: { ...modalConfig, TypeDataDelete: bool }
    });
};