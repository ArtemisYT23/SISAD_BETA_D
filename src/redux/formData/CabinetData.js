import { v4 as uuidv4 } from "uuid";

const initialState = {
    //creacion
    id: uuidv4(),
    name: "",
    description: "",
    groupId: null,
    viewMode: false,
    fileTypes: [],
    //actualizacion
    idCabinet: "",
    nameCabinet: "",
    descriptionCabinet: "",
    onDay: false,
    groupIdCabinet: "",
    viewModeUpdate: false,
    filetypeSelected: []
};

const GET_NAME_CABINET_DATA = "GET_NAME_CABINET_DATA";
const GET_DESCRIPTION_CABINET_DATA = "GET_DESCRIPTION_CABINET_DATA";
const GET_GROUPID_CABINET_DATA = "GET_GROUPID_CABINET_DATA";
const GET_GROUPID_NULL_CABINET_DATA = "GET_GROUPID_NULL_CABINET_DATA";
const GET_CONFIGURACION_CABINET = "GET_CONFIGURACION_CABINET";
const GET_FILETYPE_CABINET_DATA = "GET_FILETYPE_CABINET_DATA";
const SET_CLEAR_CABINET_DATA = "SET_CLEAR_CABINET_DATA";
//actualizacion de gabinete
const SAVE_IDCABINET_SELECTED = "SAVE_IDCABINET_SELECTED";
const SAVE_NAMECABINET_SELECTED = "SAVE_NAMECABINET_SELECTED";
const SAVE_DESCRIPTION_CABINET_SELECTED = "SAVE_DESCRIPTION_CABINET_SELECTED";
const SAVE_GROUPID_CABINET_SELECTED = "SAVE_GROUPID_CABINET_SELECTED";
const SAVE_CONFIG_CABINET_UPDATE = "SAVE_CONFIG_CABINET_UPDATE";
const SAVE_FILETYPE_CABINET_SELECTED = "SAVE_FILETYPE_CABINET_SELECTED";
const CHANGE_CONFIG_CABINET_UPDATE = "CHANGE_CONFIG_CABINET_UPDATE";
const SET_CLEAR_CABINET_UPDATE_DATA = "SET_CLEAR_CABINET_UPDATE_DATA";

export default function CabinetDataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NAME_CABINET_DATA:
        case GET_DESCRIPTION_CABINET_DATA:
        case GET_GROUPID_CABINET_DATA:
        case GET_GROUPID_NULL_CABINET_DATA:
        case GET_CONFIGURACION_CABINET:
        case GET_FILETYPE_CABINET_DATA:
        case SET_CLEAR_CABINET_DATA:
        //actualizacion de gabinete
        case SAVE_IDCABINET_SELECTED:
        case SAVE_NAMECABINET_SELECTED:
        case SAVE_DESCRIPTION_CABINET_SELECTED:
        case SAVE_GROUPID_CABINET_SELECTED:
        case SAVE_FILETYPE_CABINET_SELECTED:
        case SAVE_CONFIG_CABINET_UPDATE:
        case CHANGE_CONFIG_CABINET_UPDATE:
        case SET_CLEAR_CABINET_UPDATE_DATA:
            return action.payload;
        default:
            return state;
    }
}

//guardar nombre del gabinete nuevo
export const getNameCabinetNew = (name) => async (dispatch, getState) => {
    const { cabinetData } = getState();
    dispatch({
        type: GET_NAME_CABINET_DATA,
        payload: { ...cabinetData, name: name }
    })
};

//guardar descripcion del gabinete nuevo
export const getDescriptionCabinetNew = (description) => async (dispatch, getState) => {
    const { cabinetData } = getState();
    dispatch({
        type: GET_DESCRIPTION_CABINET_DATA,
        payload: { ...cabinetData, description: description }
    })
};

//guardar groudId del gabinete nuevo
export const getGroupIdCabinetNew = (groupId) => async (dispatch, getState) => {
    const { cabinetData } = getState();
    dispatch({
        type: GET_GROUPID_CABINET_DATA,
        payload: { ...cabinetData, groupId: groupId }
    })
};

//guardar groudId null
export const getGroupIdNullCabinetNew = () => async (dispatch, getState) => {
    const { cabinetData } = getState();
    dispatch({
        type: GET_GROUPID_NULL_CABINET_DATA,
        payload: { ...cabinetData, groupId: null, groupIdCabinet: null }
    })
};

//guardar configuracion para gabinete
export const getConfiguracionCabinetNew = (value) => async (dispatch, getState) => {
    const { cabinetData } = getState();
    if (value == "active") {
        dispatch({
            type: GET_CONFIGURACION_CABINET,
            payload: { ...cabinetData, viewMode: false }
        })
    }
    if (value == "inactive") {
        dispatch({
            type: GET_CONFIGURACION_CABINET,
            payload: { ...cabinetData, viewMode: true }
        })
    }
}

//guardar fileTypes del gabinete nuevo
export const getFileTypesCabinetNew = (fileTypes) => async (dispatch, getState) => {
    const { cabinetData } = getState();
    dispatch({
        type: GET_FILETYPE_CABINET_DATA,
        payload: { ...cabinetData, fileTypes: fileTypes }
    })
};


/*<-----------ACTUALIZACION DE GABINETES---------------> */
//guardar id de gabinete Seleccionado
export const saveIdCabinetSelected = (id) => async (dispatch, getState) => {
    const { cabinetData } = getState();
    dispatch({
        type: SAVE_IDCABINET_SELECTED,
        payload: { ...cabinetData, idCabinet: id }
    })
}

//guardar nombre del gabinete seleccionado
export const saveNameCabinetSelected = (name) => async (dispatch, getState) => {
    const { cabinetData } = getState();
    dispatch({
        type: SAVE_NAMECABINET_SELECTED,
        payload: { ...cabinetData, nameCabinet: name }
    })
}

//guardar descripcion del gabinete seleccionado
export const saveDescriptionSelected = (description) => async (dispatch, getState) => {
    const { cabinetData } = getState();
    dispatch({
        type: SAVE_DESCRIPTION_CABINET_SELECTED,
        payload: { ...cabinetData, descriptionCabinet: description }
    })
}

//guardar groupId de actualizacion de gabinete seleccionado
export const saveGroupIdSelected = (groupId) => async (dispatch, getState) => {
    const { cabinetData } = getState();
    dispatch({
        type: SAVE_GROUPID_CABINET_SELECTED,
        payload: { ...cabinetData, groupIdCabinet: groupId }
    })
}

//guardar configuracion de gabinete para actualizado
export const saveConfigCabinetUpdate = (bool) => async (dispatch, getState) => {
    const { cabinetData } = getState();
    dispatch({
        type: SAVE_CONFIG_CABINET_UPDATE,
        payload: { ...cabinetData, viewModeUpdate: bool }
    })
}

//cambiar valor de configuracion de gabinete para actualizar
export const changeDataCabinetUpdate = (value) => async (dispatch, getState) => {
    const { cabinetData } = getState();
    if (value == "active") {
        dispatch({
            type: CHANGE_CONFIG_CABINET_UPDATE,
            payload: { ...cabinetData, viewModeUpdate: false }
        })
    }
    if (value == "inactive") {
        dispatch({
            type: CHANGE_CONFIG_CABINET_UPDATE,
            payload: { ...cabinetData, viewModeUpdate: true }
        })
    }
}

//guardar fileType de actualizacion de gabinete seleccionado
export const saveFileTypeSelected = (filetype) => async (dispatch, getState) => {
    const { cabinetData } = getState();
    dispatch({
        type: SAVE_FILETYPE_CABINET_SELECTED,
        payload: { ...cabinetData, filetypeSelected: filetype }
    })
}

//limpiar estado de datos de creacion
export const setClearCabinetDataNew = () => async (dispatch, getState) => {
    const { cabinetData } = getState();
    dispatch({
        type: SET_CLEAR_CABINET_DATA,
        payload: { ...cabinetData, id: uuidv4(), name: "", description: "", groupId: null, viewMode: false, fileTypes: [], }
    })
}

//limpiar estados de actualizacion
export const setClearCabinetDataUpdate = () => async (dispatch, getState) => {
    const { cabinetData } = getState();
    dispatch({
        type: SET_CLEAR_CABINET_UPDATE_DATA,
        payload: {
            ...cabinetData,
            idCabinet: "",
            nameCabinet: "",
            descriptionCabinet: "",
            onDay: false,
            viewModeUpdate: false,
            groupIdCabinet: null,
            filetypeSelected: []
        }
    })
}