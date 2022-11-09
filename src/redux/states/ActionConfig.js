import { setChangeSelectView } from "./View";

//estados iniciales
const initialState = {
    IndexCreated: false,
    IndexUpdate: false,
    IndexDelete: false,
}

const OPEN_MODAL_CREATED_INDEX_CONFIG = "OPEN_MODAL_CREATED_INDEX_CONFIG";
const OPEN_MODAL_UPDATE_INDEX_CONFIG = "OPEN_MODAL_UPDATE_INDEX_CONFIG";
const OPEN_MODAL_INDEX_DELETE_CONFIG = "OPEN_MODAL_INDEX_DELETE_CONFIG";

//payload de tag de acciones 
export default function ModalConfigReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL_CREATED_INDEX_CONFIG:
        case OPEN_MODAL_UPDATE_INDEX_CONFIG:
        case OPEN_MODAL_INDEX_DELETE_CONFIG:
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