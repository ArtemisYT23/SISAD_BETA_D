import { v4 as uuidv4 } from "uuid";

const initialState = {
    id: uuidv4(),
    name: "",
    description: ""
};

const GET_NAME_GROUP_DATA = "GET_NAME_GROUP_DATA";
const GET_DESCRIPTION_GROUP_DATA = "GET_DESCRIPTION_GROUP_DATA";
const SET_CLEAR_GROUP_DATA = "SET_CLEAR_GROUP_DATA";

export default function GroupDataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NAME_GROUP_DATA:
        case GET_DESCRIPTION_GROUP_DATA:
        case SET_CLEAR_GROUP_DATA:
            return action.payload;
        default:
            return state;
    }
}

//guardar nombre del grupo nuevo
export const getNameGroupNew = (name) => async(dispatch, getState) => {
    const { groupData } = getState();
    dispatch({
        type: GET_NAME_GROUP_DATA,
        payload: { ...groupData, name: name }
    })
};

//guardar descripcion del grupo nuevo
export const getDescriptionGroupNew = (description) => async(dispatch, getState) => {
    const { groupData } = getState();
    dispatch({
        type: GET_DESCRIPTION_GROUP_DATA,
        payload: { ...groupData, description: description }
    })
};

//limpiar estado de datos
export const setClearGroupDataNew = () => async(dispatch, getState) => {
    const { groupData } = getState();
    dispatch({
        type: SET_CLEAR_GROUP_DATA,
        payload: { ...groupData, id: uuidv4(), name: "", description: "" }
    })
}