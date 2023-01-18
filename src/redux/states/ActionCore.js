const initialState = {
    ContextGroup: false,
    ContextFolder: false,
    ContextChild: false,
    ContextMantentGroup: false,
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
    ChildCreated: false,
    FolderUpdate: false,
    FolderDelete: false,
    //historial de elemento
    HistoryElementView: false,
    //apertura de menu laterales
    isOpenCore: true,
    isOpenManag: false,
    isOpenSecurity: false,
    isOpenRestored: false,
    //Cambio para Configuracion de busqueda (Filtros)
    isFilterFileType: false,
}

//menu contextuales
const SET_OPEN_MENUCONTEXT_GROUP = "SET_OPEN_MENUCONTEXT_GROUP";
const SET_CLOSE_MENUCONTEXT_FOLDER = "SET_CLOSE_MENUCONTEXT_FOLDER";
const SET_OPEN_MENUCONTEXT_MANTENTGROUP = "SET_OPEN_MENUCONTEXT_MANTENTGROUP";
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
const OPEN_MODAL_CHILD_CREATED_CORE = "OPEN_MODAL_CHILD_CREATED_CORE";
const OPEN_MODAL_UPDATE_FOLDER_CORE = "OPEN_MODAL_UPDATE_FOLDER_CORE";
const OPEN_MODAL_DELETE_FOLDER_CORE = "OPEN_MODAL_DELETE_FOLDER_CORE";
const SET_CLOSE_MENUCONTEXT_CHILD = "SET_CLOSE_MENUCONTEXT_CHILD";
const SET_OPEN_MODAL_HISTORYVIEW_CORE = "SET_OPEN_MODAL_HISTORYVIEW_CORE";
const SET_CLEANING_STATE_CORE = "SET_CLEANING_STATE_CORE";

//Modales para menu laterales
const OPEN_MODAL_CORE = "OPEN_MODAL_CORE";
const OPEN_MODAL_MANAG = "OPEN_MODAL_MANAG";
const OPEN_MODAL_SECURITY = "OPEN_MODAL_SECURITY";
const OPEN_MODAL_RESTORED = "OPEN_MODAL_RESTORED";

//configurar filtros de busqueda
const SET_CONFIG_FILE_TYPE = "SET_CONFIG_FILE_TYPE";

export default function ActionReducer(state = initialState, action) {
    switch (action.type) {
        //menu contextuales
        case SET_OPEN_MENUCONTEXT_GROUP:
        case SET_CLOSE_MENUCONTEXT_FOLDER:
        case SET_OPEN_MENUCONTEXT_MANTENTGROUP:
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
        case OPEN_MODAL_CHILD_CREATED_CORE:
        case OPEN_MODAL_UPDATE_FOLDER_CORE:
        case OPEN_MODAL_DELETE_FOLDER_CORE:
        case SET_CLOSE_MENUCONTEXT_CHILD:
        case SET_OPEN_MODAL_HISTORYVIEW_CORE:
        case SET_CLEANING_STATE_CORE:
        //menu laterales
        case OPEN_MODAL_CORE:
        case OPEN_MODAL_MANAG:
        case OPEN_MODAL_SECURITY:
        case OPEN_MODAL_RESTORED:
        //busquedas configuraciones
        case SET_CONFIG_FILE_TYPE:
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

//menu contextual para subcarpetas
export const setCloseContextChild = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: SET_CLOSE_MENUCONTEXT_CHILD,
        payload: { ...modalCore, ContextChild: bool }
    })
}

//menu contextual para mantenimiento de Grupos
export const setCloseMenuContextMantentGroup = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: SET_OPEN_MENUCONTEXT_MANTENTGROUP,
        payload: { ...modalCore, ContextMantentGroup: bool }
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

//Modal para crear carpeta hija 
export const setOpenModalChildCreated = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: OPEN_MODAL_CHILD_CREATED_CORE,    
        payload: { ...modalCore, ChildCreated: bool }
    })
}

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
export const setOpenModalHistoryViewElement = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: SET_OPEN_MODAL_HISTORYVIEW_CORE,
        payload: { ...modalCore, HistoryElementView: bool }
    })
}

/*<---------------------Apertura de Menu Laterales----------------->*/
//Modal para Core
export const setOpenModalCore = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: OPEN_MODAL_CORE,
        payload: { ...modalCore, isOpenCore: bool }
    });
};

//Modal para Managment
export const setOpenModalManag = () => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: OPEN_MODAL_MANAG,
        payload: { ...modalCore, isOpenManag: !modalCore.isOpenManag }
    });
};


//Modal para Security
export const setOpenModalSecurity = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: OPEN_MODAL_SECURITY,
        payload: { ...modalCore, isOpenSecurity: bool }
    });
};

//Modal para Restaurar 
export const setOpenModalRestored = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: OPEN_MODAL_RESTORED,
        payload: { ...modalCore, isOpenRestored: bool }
    })
}

/*<-------------------------FILTROS PARA BUSQUEDA-------------------------------->*/
export const filterSetConfigFile = (bool) => async (dispatch, getState) => {
    const { modalCore } = getState();
    dispatch({
        type: SET_CONFIG_FILE_TYPE,
        payload: { ...modalCore, isFilterFileType: bool}
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
            ContextMantentGroup: false,
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