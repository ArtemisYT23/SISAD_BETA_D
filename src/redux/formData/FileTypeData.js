import { v4 as uuidv4 } from "uuid";

const initialState = {
    //creacion
    id: uuidv4(),
    name: "",
    description: "",
    //actualizacion
    idUpdate: "",
    nameUpdate: "",
    descriptionUpdate: "",
    isDefault: false,
}

const NAME_FILETYPE_NEW_CORE = "NAME_FILETYPE_NEW_CORE";
const DESCRIPTION_FILETYPE_NEW_CORE = "DESCRIPTION_FILETYPE_NEW_CORE";
const CLEAR_FILETYPE_DATA_CORE = "CLEAR_FILETYPE_DATA_CORE";

//actualizaciones
const ID_FILETYPE_UPDATE_CORE = "ID_FILETYPE_UPDATE_CORE";
const NAME_FILETYPE_UPDATE_CORE = "NAME_FILETYPE_UPDATE_CORE";
const DESCRIPTION_FILETYPE_UPDATE_CORE = "DESCRIPTION_FILETYPE_UPDATE_CORE";
const DEFAULT_FILETYPE_UPDATE_CORE = "DEFAULT_FILETYPE_UPDATE_CORE";
const DEFAULT_FILETYPE_TRUE_UPDATE_CORE = "DEFAULT_FILETYPE_TRUE_UPDATE_CORE";
const DEFAULT_FILETYPE_FALSE_UPDATE_CORE = "DEFAULT_FILETYPE_FALSE_UPDATE_CORE";
const CLEAR_FILETYPE_UPDATE_CORE = "CLEAR_FILETYPE_UPDATE_CORE";

//payload de tag de acciones 
export default function FileTypeDataReducer(state = initialState, action) {
    switch (action.type) {
        case NAME_FILETYPE_NEW_CORE:
        case DESCRIPTION_FILETYPE_NEW_CORE:
        case CLEAR_FILETYPE_DATA_CORE:
        //actualizaciones
        case ID_FILETYPE_UPDATE_CORE:
        case NAME_FILETYPE_UPDATE_CORE:
        case DESCRIPTION_FILETYPE_UPDATE_CORE:
        case DEFAULT_FILETYPE_UPDATE_CORE:
        case DEFAULT_FILETYPE_TRUE_UPDATE_CORE:
        case DEFAULT_FILETYPE_FALSE_UPDATE_CORE:
        case CLEAR_FILETYPE_UPDATE_CORE:
            return action.payload;
        default:
            return state;
    }
};

//obtener nombre de nuevo tipo de archivo
export const getNameFileTypeNew = (name) => async (dispatch, getState) => {
    const { FileTypeData } = getState();
    dispatch({
        type: NAME_FILETYPE_NEW_CORE,
        payload: { ...FileTypeData, name: name }
    });
};

//obtener listId de lista anidad para nuevo tipo de archivo
export const getDescriptionFileTypeNew = (description) => async (dispatch, getState) => {
    const { FileTypeData } = getState();
    dispatch({
        type: DESCRIPTION_FILETYPE_NEW_CORE,
        payload: { ...FileTypeData, description: description }
    });
}

//limpiar estado de datos de creacion de tipo de archivo
export const clearDataFileTypeNew = () => async (dispatch, getState) => {
    const { FileTypeData } = getState();
    dispatch({
        type: CLEAR_FILETYPE_DATA_CORE,
        payload: {
            ...FileTypeData,
            id: uuidv4(),
            name: "",
            description: "",
        }
    })
}

/*<---------------ACTUALIZACION-------------------> */
//id de elemento seleccionado para actualizar
export const getIdFileTypeUpdate = (id) => async (dispatch, getState) => {
    const { FileTypeData } = getState();
    dispatch({
        type: ID_FILETYPE_UPDATE_CORE,
        payload: { ...FileTypeData, idUpdate: id }
    });
};

//name del elemento seleccionado para actualizar
export const getNameFileTypeUpdate = (name) => async (dispatch, getState) => {
    const { FileTypeData } = getState();
    dispatch({
        type: NAME_FILETYPE_UPDATE_CORE,
        payload: { ...FileTypeData, nameUpdate: name }
    })
}

//listId del Elemento Seleccionado para actualizar
export const getDescriptionFileTypeUpdate = (description) => async (dispatch, getState) => {
    const { FileTypeData } = getState();
    dispatch({
        type: DESCRIPTION_FILETYPE_UPDATE_CORE,
        payload: { ...FileTypeData, descriptionUpdate: description }
    })
}

//isDefault de elemento seleccionado para actualizar 
export const getDefaultFileTypeUpdate = (isDefault) => async (dispatch, getState) => {
    const { FileTypeData } = getState();
    dispatch({
        type: DEFAULT_FILETYPE_UPDATE_CORE,
        payload: { ...FileTypeData, isDefault: isDefault }
    })
}

//isDefault True actualizacion
export const getDefaultFileTrueTypeUpdate = () => async (dispatch, getState) => {
    const { FileTypeData } = getState();
    dispatch({
        type: DEFAULT_FILETYPE_TRUE_UPDATE_CORE,
        payload: { ...FileTypeData, isDefault: true }
    })
}

//isDefault False Actualizacion
export const getDefaultFileFalseTypeUpdate = () => async (dispatch, getState) => {
    const { FileTypeData } = getState();
    dispatch({
        type: DEFAULT_FILETYPE_FALSE_UPDATE_CORE,
        payload: { ...FileTypeData, isDefault: false }
    })
}


//limpiar estado de seleccion de elementos para actualizar
export const clearFileTypeUpdate = () => async (dispatch, getState) => {
    const { FileTypeData } = getState();
    dispatch({
        type: CLEAR_FILETYPE_UPDATE_CORE,
        payload: {
            ...FileTypeData,
            idUpdate: "",
            nameUpdate: "",
            descriptionUpdate: "",
            descriptionUpdate: ""
        }
    })
}

