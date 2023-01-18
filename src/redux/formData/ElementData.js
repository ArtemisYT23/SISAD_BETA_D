import { v4 as uuidv4 } from "uuid";

const initialState = {
    //creacion
    id: uuidv4(),
    name: "",
    listId: "",
    //actualizacion
    idUpdate: "",
    nameUpdate: "",
    listIdUpdate: "",
}

const NAME_ELEMENT_NEW_CORE = "NAME_ELEMENT_NEW_CORE";
const LIST_ELEMENT_NEW_CORE = "LIST_ELEMENT_NEW_CORE";
const CLEAR_ELEMENT_DATA_CORE = "CLEAR_ELEMENT_DATA_CORE";
//actualizaciones
const ID_ELEMENT_UPDATE_CORE = "ID_ELEMENT_UPDATE_CORE";
const NAME_ELEMENT_UPDATE_CORE = "NAME_ELEMENT_UPDATE_CORE";
const LISTID_ELEMENT_UPDATE_CORE = "LISTID_ELEMENT_UPDATE_CORE";
const CLEAR_ELEMENT_UPDATE_CORE = "CLEAR_ELEMENT_UPDATE_CORE";

//payload de tag de acciones 
export default function ElementDataReducer(state = initialState, action) {
    switch (action.type) {
        case NAME_ELEMENT_NEW_CORE:
        case LIST_ELEMENT_NEW_CORE:
        case CLEAR_ELEMENT_DATA_CORE:
        //actualizaciones
        case ID_ELEMENT_UPDATE_CORE:
        case NAME_ELEMENT_UPDATE_CORE:
        case LISTID_ELEMENT_UPDATE_CORE:
        case CLEAR_ELEMENT_UPDATE_CORE:
            return action.payload;
        default:
            return state;
    }
};

//obtener nombre de nueva lista
export const getNameElementNew = (name) => async (dispatch, getState) => {
    const { elementDataNew } = getState();
    dispatch({
        type: NAME_ELEMENT_NEW_CORE,
        payload: { ...elementDataNew, name: name }
    });
};

//obtener listId de lista anidad para nueva lista
export const getListElementNew = (listId) => async (dispatch, getState) => {
    const { elementDataNew } = getState();
    dispatch({
        type: LIST_ELEMENT_NEW_CORE,
        payload: { ...elementDataNew, listId: listId }
    });
}

//limpiar estado de datos de creacion de listas
export const clearDataElementNew = () => async (dispatch, getState) => {
    const { elementDataNew } = getState();
    dispatch({
        type: CLEAR_ELEMENT_DATA_CORE,
        payload: {
            ...elementDataNew,
            id: uuidv4(),
            name: "",
            listId: "",
        }
    })
}

/*<---------------ACTUALIZACION-------------------> */
//id de elemento seleccionado para actualizar
export const getIdElementUpdate = (id) => async (dispatch, getState) => {
    const { elementDataNew } = getState();
    dispatch({
        type: ID_ELEMENT_UPDATE_CORE,
        payload: { ...elementDataNew, idUpdate: id }
    });
};

//name del elemento seleccionado para actualizar
export const getNameElementUpdate = (name) => async (dispatch, getState) => {
    const { elementDataNew } = getState();
    dispatch({
        type: NAME_ELEMENT_UPDATE_CORE,
        payload: { ...elementDataNew, nameUpdate: name }
    })
}

//listId del Elemento Seleccionado para actualizar
export const getListIdElementUpdate = (listId) => async (dispatch, getState) => {
    const { elementDataNew } = getState();
    dispatch({
        type: LISTID_ELEMENT_UPDATE_CORE,
        payload: { ...elementDataNew, listIdUpdate: listId }
    })
}

//limpiar estado de seleccion de elementos para actualizar
export const clearElementUpdate = () => async (dispatch, getState) => {
    const { elementDataNew } = getState();
    dispatch({
        type: CLEAR_ELEMENT_UPDATE_CORE,
        payload: {
            ...elementDataNew,
            idUpdate: "",
            nameUpdate: "",
            listIdUpdate: "",
        }
    })
}

