import { v4 as uuidv4 } from "uuid";

const initialState = {
    id: uuidv4(),
    name: "",
    //actualizacion
    idUpdate: "",
    nameUpdate: ""
}

const NAME_DATATYPE_NEW_CORE = "NAME_DATATYPE_NEW_CORE";
const CLEAR_DATATYPE_NEW_CORE = "CLEAR_DATATYPE_NEW_CORE";

//actualizaciones
const ID_DATATYPE_UPDATE_CORE = "ID_DATATYPE_UPDATE_CORE";
const NAME_DATATYPE_UPDATE_CORE = "NAME_DATATYPE_UPDATE_CORE";
const CLEAR_DATATYPE_UPDATE_CORE = "CLEAR_DATATYPE_UPDATE_CORE";

//payload de tag de acciones 
export default function DataTypeDataReducer(state = initialState, action) {
    switch (action.type) {
        case NAME_DATATYPE_NEW_CORE:
        case CLEAR_DATATYPE_NEW_CORE:
        //actualizaciones
        case ID_DATATYPE_UPDATE_CORE:
        case NAME_DATATYPE_UPDATE_CORE:
        case CLEAR_DATATYPE_UPDATE_CORE:
            return action.payload;
        default:
            return state;
    }
};

//obtener nombre de nueva lista
export const getNameDataTypeNew = (name) => async (dispatch, getState) => {
    const { DataTypeData } = getState();
    dispatch({
        type: NAME_DATATYPE_NEW_CORE,
        payload: { ...DataTypeData, name: name }
    });
};

//limpiar estado de tipo de datos
export const clearDataTypeNew = () => async (dispatch, getState) => {
    const { DataTypeData } = getState();
    dispatch({
        type: CLEAR_DATATYPE_NEW_CORE,
        payload: {
            ...DataTypeData,
            id: uuidv4(),
            name: ""
        }
    });
};

/*<---------------ACTUALIZACION------------------> */
//id de elemento seleccionado para actualizar
export const getIdDataTypeUpdate = (id) => async (dispatch, getState) => {
    const { DataTypeData } = getState();
    dispatch({
        type: ID_DATATYPE_UPDATE_CORE,
        payload: { ...DataTypeData, idUpdate: id }
    });
};

//name de elemento seleccionado para actualizar
export const getNameDataTypeUpdate = (name) => async (dispatch, getState) => {
    const { DataTypeData } = getState();
    dispatch({
        type: NAME_DATATYPE_UPDATE_CORE,
        payload: { ...DataTypeData, nameUpdate: name }
    });
};

//limpiar estado de elemento seleccionado para actualizar
export const clearDataTypeUpdate = () => async (dispatch, getState) => {
    const { DataTypeData } = getState();
    dispatch({
        type: CLEAR_DATATYPE_UPDATE_CORE,
        payload: {
            ...DataTypeData,
            idUpdate: "",
            nameUpdate: ""
        }
    })
}

