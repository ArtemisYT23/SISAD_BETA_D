const initialState = {
    ContextGroup: false,
    ContextFolder: false,
    //modales grupos
    GroupCreated: false,
    GroupUpdate: false,
    GroupDelete: false,
    //modales gabinetes
    CabinetCreated: false,
    CabinetUpdate: false,
    CabinetDelete: false,
    //modales carpetas
    FolderCreated: false,
    FolderUpdate: false,
    FolderDelete: false,
    //historial de elemento
    HistoryElementView: false,
}

//menu contextuales
const SET_OPEN_MENUCONTEXT_GROUP = "SET_OPEN_MENUCONTEXT_GROUP";
const SET_CLOSE_MENUCONTEXT_FOLDER = "SET_CLOSE_MENUCONTEXT_FOLDER";
//grupos
const OPEN_MODAL_CREATED_GROUP_CORE = "OPEN_MODAL_CREATED_GROUP_CORE";
const OPEN_MODAL_UPDATE_GROUP_CORE = "OPEN_MODAL_UPDATE_GROUP_CORE";
const OPEN_MODAL_DELETE_GROUP_CORE = "OPEN_MODAL_DELETE_GROUP_CORE";
//gabinetes
const OPEN_MODAL_CREATE_CABINET_CORE = "OPEN_MODAL_CREATE_CABINET_CORE";
const OPEN_MODAL_UPDATE_CABINET_CORE = "OPEN_MODAL_UPDATE_CABINET_CORE";
const OPEN_MODAL_DELETE_CABINET_CORE = "OPEN_MODAL_DELETE_CABINET_CORE";
//carpetas
const OPEN_MODAL_CREATE_FOLDER_CORE = "OPEN_MODAL_CREATE_FOLDER_CORE";
const OPEN_MODAL_UPDATE_FOLDER_CORE = "OPEN_MODAL_UPDATE_FOLDER_CORE";
const OPEN_MODAL_DELETE_FOLDER_CORE = "OPEN_MODAL_DELETE_FOLDER_CORE";
const SET_OPEN_MODAL_HISTORYVIEW_CORE = "SET_OPEN_MODAL_HISTORYVIEW_CORE";
const SET_CLEANING_STATE_CORE = "SET_CLEANING_STATE_CORE";

export default function ActionReducer(state = initialState, action) {
    switch (action.type) {
        //menu contextuales
        case SET_OPEN_MENUCONTEXT_GROUP:
        case SET_CLOSE_MENUCONTEXT_FOLDER:
        //grupos
        case OPEN_MODAL_CREATED_GROUP_CORE:
        case OPEN_MODAL_UPDATE_GROUP_CORE:
        case OPEN_MODAL_DELETE_GROUP_CORE:
        //gabinetes
        case OPEN_MODAL_CREATE_CABINET_CORE:
        case OPEN_MODAL_UPDATE_CABINET_CORE:
        case OPEN_MODAL_DELETE_CABINET_CORE:
        //carpetas
        case OPEN_MODAL_CREATE_FOLDER_CORE:
        case OPEN_MODAL_UPDATE_FOLDER_CORE:
        case OPEN_MODAL_DELETE_FOLDER_CORE:
        case SET_OPEN_MODAL_HISTORYVIEW_CORE:
        case SET_CLEANING_STATE_CORE:
            return action.payload;
        default:
            return state;
    }
}

/*<--------------------------MENU CONTEXTUAL--------------------------->*/
//menu contextual crear gabinetes y grupos
export const setCloseMenuContextGroup = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: SET_OPEN_MENUCONTEXT_GROUP,
        payload: { ...modalCore, ContextGroup: bool }
    })
};

//menu contextual para carpeta
export const setCloseContextFolder = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: SET_CLOSE_MENUCONTEXT_FOLDER,
        payload: { ...modalCore, ContextFolder: bool }
    })
}



/*<----------------------------GROUPS------------------------------------->*/
//Modal para crear grupos
export const setOpenModalGroupCreated = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: OPEN_MODAL_CREATED_GROUP_CORE,
        payload: { ...modalCore, GroupCreated: bool }
    });
};

//Modal para Actualizar Un Grupo de gabinetes
export const setOpenModalGroupUpdate = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: OPEN_MODAL_UPDATE_GROUP_CORE,
        payload: { ...modalCore, GroupUpdate: bool }
    });
};

//Modal para eliminar un grupo de gabinetes
export const setOpenModalGroupDelete = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: OPEN_MODAL_DELETE_GROUP_CORE,
        payload: { ...modalCore, GroupDelete: bool }
    });
};

/*<-----------GABINETES-------------->*/
//Modal para guardar nuevo Gabinete 
export const setOpenModalCabinetCreated = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: OPEN_MODAL_CREATE_CABINET_CORE,
        payload: { ...modalCore, CabinetCreated: bool }
    });
};

//Modal para actualizar Gabinete
export const setOpenModalCabinetUpdate = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: OPEN_MODAL_UPDATE_CABINET_CORE,
        payload: { ...modalCore, CabinetUpdate: bool }
    });
};

//Modal para Eliminar Gabinete
export const setOpenModalCabinetDelete = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: OPEN_MODAL_DELETE_CABINET_CORE,
        payload: { ...modalCore, CabinetDelete: bool }
    });
};

/*<--------------FOLDER------------------>*/
//Modal para guardar nueva carpeta
export const setOpenModalFolderCreated = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: OPEN_MODAL_CREATE_FOLDER_CORE,
        payload: { ...modalCore, FolderCreated: bool }
    });
};

//Modal para actualizar nueva carpeta
export const setOpenModalFolderUpdate = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: OPEN_MODAL_UPDATE_FOLDER_CORE,
        payload: { ...modalCore, FolderUpdate: bool }
    });
};

//Modal para Borrar Carpeta
export const setOpenModalFolderDelete = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: OPEN_MODAL_DELETE_FOLDER_CORE,
        payload: { ...modalCore, FolderDelete: bool }
    });
};

//modal para Historial de un elemento En especifico x usuario
export const setOpenModalHistoryViewElement = (bool) => async(dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: SET_OPEN_MODAL_HISTORYVIEW_CORE,
        payload: { ...modalCore, HistoryElementView: bool }
    })
}

//Limpiar estado para cierre de sesion
export const setCleanerModalCore = () => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: SET_CLEANING_STATE_CORE,
        payload: {
            ...modalCore,
            ContextGroup: false,
            ContextFolder: false,
            GroupCreated: false,
            GroupUpdate: false,
            GroupDelete: false,
            CabinetCreated: false,
            CabinetUpdate: false,
            CabinetDelete: false,
            FolderCreated: false,
            FolderUpdate: false,
            FolderDelete: false,
            HistoryElementView: false,
        }
    })
}