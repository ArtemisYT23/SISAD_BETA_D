import { v4 as uuidv4 } from "uuid";

const initialState = {
    id: uuidv4(),
    name: "",
    listId: null,
    //actualizacion
    idUpdate: "",
    nameUpdate: "",
    listIdUpdate: ""
}

const NAME_LIST_NEW_CORE = "NAME_LIST_NEW_CORE";
const LIST_LIST_NEW_CORE = "LIST_LIST_NEW_CORE";
const LIST_NULL_LIST_NEW_CORE = "LIST_NULL_LIST_NEW_CORE";
const CLEAR_LIST_DATA_CORE = "CLEAR_LIST_DATA_CORE";
//actualizacion
const ID_LIST_UPDATE_CORE = "ID_LIST_UPDATE_CORE";
const NAME_LIST_UPDATE_CORE = "NAME_LIST_UPDATE_CORE";
const LISTID_LIST_UPDATE_CORE = "LISTID_LIST_UPDATE_CORE";
const LIST_NULL_LIST_UPDATE_CORE = "LIST_NULL_LIST_UPDATE_CORE";
const CLEAR_LIST_DATA_UPDATE_CORE = "CLEAR_LIST_DATA_UPDATE_CORE";

//payload de tag de acciones 
export default function ListDataReducer(state = initialState, action) {
    switch (action.type) {
        case NAME_LIST_NEW_CORE:
        case LIST_LIST_NEW_CORE:
        case LIST_NULL_LIST_NEW_CORE:
        case CLEAR_LIST_DATA_CORE:
        //actualizacion
        case ID_LIST_UPDATE_CORE:
        case NAME_LIST_UPDATE_CORE:
        case LISTID_LIST_UPDATE_CORE:
        case LIST_NULL_LIST_UPDATE_CORE:
        case CLEAR_LIST_DATA_UPDATE_CORE:
            return action.payload;
        default:
            return state;
    }
};

//obtener nombre de nueva lista
export const getNameListNew = (name) => async (dispatch, getState) => {
    const { listDataNew } = getState();
    dispatch({
        type: NAME_LIST_NEW_CORE,
        payload: { ...listDataNew, name: name }
    });
};

//obtener listId de lista anidad para nueva lista
export const getListListNew = (listId) => async (dispatch, getState) => {
    const { listDataNew } = getState();
    dispatch({
        type: LIST_LIST_NEW_CORE,
        payload: { ...listDataNew, listId: listId }
    });
}

//listId null para sin seleccion de lista nueva
export const getListNullListNew = () => async (dispatch, getState) => {
    const { listDataNew } = getState();
    dispatch({
        type: LIST_NULL_LIST_NEW_CORE,
        payload: { ...listDataNew, listId: null }
    });
}

//limpiar estado de datos de creacion de listas
export const clearDataListNew = () => async (dispatch, getState) => {
    const { listDataNew } = getState();
    dispatch({
        type: CLEAR_LIST_DATA_CORE,
        payload: {
            ...listDataNew,
            id: uuidv4(),
            name: "",
            listId: null,
        }
    })
}

/*<---------------ACTUALIZACION DE LISTAS--------------------> */

//obtener id de lista de actualizar
export const getIdListUpdate = (id) => async (dispatch, getState) => {
    const { listDataNew } = getState();
    dispatch({
        type: ID_LIST_UPDATE_CORE,
        payload: { ...listDataNew, idUpdate: id }
    })
};

//obtener name de lista de actualizar
export const getNameListUpdate = (name) => async (dispatch, getState) => {
    const { listDataNew } = getState();
    dispatch({
        type: NAME_LIST_UPDATE_CORE,
        payload: { ...listDataNew, nameUpdate: name }
    })
};

//obtener name de lista de actualizar
export const getListListUpdate = (listId) => async (dispatch, getState) => {
    const { listDataNew } = getState();
    dispatch({
        type: LISTID_LIST_UPDATE_CORE,
        payload: { ...listDataNew, listIdUpdate: listId }
    })
};

//listId null para sin seleccion de lista nueva
export const getListNullListUpdate = () => async (dispatch, getState) => {
    const { listDataNew } = getState();
    dispatch({
        type: LIST_NULL_LIST_UPDATE_CORE,
        payload: { ...listDataNew, listIdUpdate: null }
    });
}

//limpiar estado de datos de creacion de listas
export const clearDataListUpdate = () => async (dispatch, getState) => {
    const { listDataNew } = getState();
    dispatch({
        type: CLEAR_LIST_DATA_UPDATE_CORE,
        payload: {
            ...listDataNew,
            idUpdate: "",
            nameUpdate: "",
            listIdUpdate: "",
        }
    })
}


