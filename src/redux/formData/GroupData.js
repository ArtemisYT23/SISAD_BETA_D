import { v4 as uuidv4 } from "uuid";

const initialState = {
    id: uuidv4(),
    name: "",
    description: "",
    //actualizacion
    idUpdate: "",
    nameUpdate: "",
    descriptionUpdate: "",
};

const GET_NAME_GROUP_DATA = "GET_NAME_GROUP_DATA";
const GET_DESCRIPTION_GROUP_DATA = "GET_DESCRIPTION_GROUP_DATA";
const SET_CLEAR_GROUP_DATA = "SET_CLEAR_GROUP_DATA";
//actualizacion
const GET_ID_UPDATE_GROUP_DATA = "GET_ID_UPDATE_GROUP_DATA";
const GET_NAME_UPDATE_GROUP_DATA = "GET_NAME_UPDATE_GROUP_DATA";
const GET_DESCRIPTION_UPDATE_GROUP_DATA = "GET_DESCRIPTION_UPDATE_GROUP_DATA";
const SET_CLEAR_GROUP_UPDATE_DATA = "SET_CLEAR_GROUP_UPDATE_DATA";

export default function GroupDataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NAME_GROUP_DATA:
        case GET_DESCRIPTION_GROUP_DATA:
        case SET_CLEAR_GROUP_DATA:
        //actualizacion
        case GET_ID_UPDATE_GROUP_DATA:
        case GET_NAME_UPDATE_GROUP_DATA:
        case GET_DESCRIPTION_UPDATE_GROUP_DATA:
        case SET_CLEAR_GROUP_UPDATE_DATA:
            return action.payload;
        default:
            return state;
    }
}

//guardar nombre del grupo nuevo
export const getNameGroupNew = (name) => async (dispatch, getState) => {
    const { groupData } = getState();
    dispatch({
        type: GET_NAME_GROUP_DATA,
        payload: { ...groupData, name: name }
    })
};

//guardar descripcion del grupo nuevo
export const getDescriptionGroupNew = (description) => async (dispatch, getState) => {
    const { groupData } = getState();
    dispatch({
        type: GET_DESCRIPTION_GROUP_DATA,
        payload: { ...groupData, description: description }
    })
};

//limpiar estado de datos
export const setClearGroupDataNew = () => async (dispatch, getState) => {
    const { groupData } = getState();
    dispatch({
        type: SET_CLEAR_GROUP_DATA,
        payload: { ...groupData, id: uuidv4(), name: "", description: "" }
    })
}

/*<-------------------ACTUALIZACION Y ELIMINACION--------------->*/

//id del grupo seleccionado
export const getIdGroupUpdate = (id) => async (dispatch, getState) => {
    const { groupData } = getState();
    dispatch({
        type: GET_ID_UPDATE_GROUP_DATA,
        payload: { ...groupData, idUpdate: id }
    })
}

//nombre del grupo seleccionado
export const getNameGroupUpdate = (name) => async (dispatch, getState) => {
    const { groupData } = getState();
    dispatch({
        type: GET_NAME_UPDATE_GROUP_DATA,
        payload: { ...groupData, nameUpdate: name }
    })
}

//descripcion del grupo seleccionado
export const getDescriptionGroupUpdate = (description) => async (dispatch, getState) => {
    const { groupData } = getState();
    dispatch({
        type: GET_DESCRIPTION_UPDATE_GROUP_DATA,
        payload: { ...groupData, descriptionUpdate: description }
    })
}

//limpiar estado de actualizacion de grupos
export const clearDataUpdateGroup = () => async (dispatch, getState) => {
    const { groupData } = getState();
    dispatch({
        type: SET_CLEAR_GROUP_UPDATE_DATA,
        payload: { ...groupData, 
            idUpdate: "", 
            nameUpdate: "", 
            descriptionUpdate: "" 
        }
    })
}