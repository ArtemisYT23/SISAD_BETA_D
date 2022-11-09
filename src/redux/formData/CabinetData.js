import { v4 as uuidv4 } from "uuid";

const initialState = {
    //creacion
    id: uuidv4(),
    name: "",
    description: "",
    groupId: null,
    fileTypes: [],
    //actualizacion
    idCabinet: "",
    nameCabinet: "",
    descriptionCabinet: "",
    onDay: false,
    groupIdCabinet: "",
    filetypeSelected: []
};

const GET_NAME_CABINET_DATA = "GET_NAME_CABINET_DATA";
const GET_DESCRIPTION_CABINET_DATA = "GET_DESCRIPTION_CABINET_DATA";
const GET_GROUPID_CABINET_DATA = "GET_GROUPID_CABINET_DATA";
const GET_GROUPID_NULL_CABINET_DATA = "GET_GROUPID_NULL_CABINET_DATA";
const GET_FILETYPE_CABINET_DATA = "GET_FILETYPE_CABINET_DATA";
const SET_CLEAR_CABINET_DATA = "SET_CLEAR_CABINET_DATA";
//actualizacion de gabinete
const SAVE_IDCABINET_SELECTED = "SAVE_IDCABINET_SELECTED";
const SAVE_NAMECABINET_SELECTED = "SAVE_NAMECABINET_SELECTED";
const SAVE_DESCRIPTION_CABINET_SELECTED = "SAVE_DESCRIPTION_CABINET_SELECTED";
const SAVE_GROUPID_CABINET_SELECTED = "SAVE_GROUPID_CABINET_SELECTED";
const SAVE_FILETYPE_CABINET_SELECTED = "SAVE_FILETYPE_CABINET_SELECTED";
const SET_CLEAR_CABINET_UPDATE_DATA = "SET_CLEAR_CABINET_UPDATE_DATA";

export default function CabinetDataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NAME_CABINET_DATA:
        case GET_DESCRIPTION_CABINET_DATA:
        case GET_GROUPID_CABINET_DATA:
        case GET_GROUPID_NULL_CABINET_DATA:
        case GET_FILETYPE_CABINET_DATA:
        case SET_CLEAR_CABINET_DATA:
        //actualizacion de gabinete
        case SAVE_IDCABINET_SELECTED:
        case SAVE_NAMECABINET_SELECTED:
        case SAVE_DESCRIPTION_CABINET_SELECTED:
        case SAVE_GROUPID_CABINET_SELECTED:
        case SAVE_FILETYPE_CABINET_SELECTED:
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

//guardar groudId del gabinete nuevo
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
        payload: { ...cabinetData, id: uuidv4(), name: "", description: "", groupId: null, fileTypes: [], }
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
            groupIdCabinet: null,
            filetypeSelected: []
        }
    })
}