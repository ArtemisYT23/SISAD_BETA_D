import { v4 as uuidv4 } from "uuid";

const initialState = {
    id: uuidv4(),
    name: "",
    //Actualizar perfil 
    idUpdate: "",
    nameUpdate: "",
}

const NAME_PROFILE_CREATED = "NAME_PROFILE_CREATED";
const CLEAR_DATA_PROFILE_CREATED = "CLEAR_DATA_PROFILE_CREATED";
//actualizacion
const ID_PROFILE_UPDATE = "ID_PROFILE_UPDATE";
const NAME_PROFILE_UPDATE = "NAME_PROFILE_UPDATE";
const CLEAR_DATA_PROFILE_UPDATE = "CLEAR_DATA_PROFILE_UPDATE";

export default function ProfileDataReducer(state = initialState, action) {
    switch (action.type) {
        case NAME_PROFILE_CREATED:
        case CLEAR_DATA_PROFILE_CREATED:
        //actualizacion
        case ID_PROFILE_UPDATE:
        case NAME_PROFILE_UPDATE:
        case CLEAR_DATA_PROFILE_UPDATE:
            return action.payload;
        default:
            return state;
    }
};

//cambiar estado de nombre del perfil
export const changeNameProfileCreated = (name) => async (dispatch, getState) => {
    const { profileData } = getState();
    dispatch({
        type: NAME_PROFILE_CREATED,
        payload: { ...profileData, name: name }
    })
}

//limpiar estado de creacion del perfil
//id del perfil seleccionado para actualizar
export const clearDataProfileCreated = () => async (dispatch, getState) => {
    const { profileData } = getState();
    dispatch({
        type: CLEAR_DATA_PROFILE_CREATED,
        payload: {
            ...profileData,
            id: uuidv4(),
            name: ""
        }
    })
}

/*<-------------ACTUALIZACION DE PERFIL--------------->*/
export const changeIdProfileUpdate = (id) => async (dispatch, getState) => {
    const { profileData } = getState();
    dispatch({
        type: ID_PROFILE_UPDATE,
        payload: { ...profileData, idUpdate: id }
    })
}

//nombre del perfil seleccionado para actualizar
export const changeNameProfileUpdate = (name) => async (dispatch, getState) => {
    const { profileData } = getState();
    dispatch({
        type: NAME_PROFILE_UPDATE,
        payload: { ...profileData, nameUpdate: name }
    })
}

//limpiar estado de actualizacion de  datos para el perfil
export const clearDataProfileUpdate = () => async (dispatch, getState) => {
    const { profileData } = getState();
    dispatch({
        type: CLEAR_DATA_PROFILE_UPDATE,
        payload: {
            ...profileData,
            idUpdate: "",
            nameUpdate: ""
        }
    })
}