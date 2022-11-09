//estados Iniciales
const initialState = {
    //cambio de pantallas
    selected: "",
    //cambio de vistas
    selectedView: "grid",
    //cambio de Search
    selectedSearch: "",
}

//tag de acciones
//selected
const SELECTED_CHANGE_VIEW_DOCUMENTARY = "SELECTED_CHANGE_VIEW_DOCUMENTARY";
//Cambio de vistas
const VIEW_GRID_TRADITIONAL = "VIEW_GRID_TRADITIONAL";
const VIEW_LIST_TRADITIONAL = "VIEW_LIST_TRADITIONAL";
//cambio de search
const SELECTED_SEARCHTREE_SELECTED_CORE = "SELECTED_SEARCHTREE_SELECTED_CORE";
const SELECTED_SEARCHTREEMETADATA_CORE = "SELECTED_SEARCHTREEMETADATA_CORE";
const VIEW_SEARCH_TRADITIONAL = "VIEW_SEARCH_TRADITIONAL";
const VIEW_GROUP_MANTENIMIENT_TRADITIONAL = "VIEW_GROUP_MANTENIMIENT_TRADITIONAL";
//limpieza de estados a vacio
const SELECTED_INITIAL_CORE = "SELECTED_INITIAL_CORE";
const SELECTED_SEARCH_SELECTED_CORE = "SELECTED_SEARCH_SELECTED_CORE";
const SET_CLEAR_MEMORY_DATA_VIEWCORE = "SET_CLEAR_MEMORY_DATA_VIEWCORE";

//payload de acciones
export default function ViewReducer(state = initialState, action) {
    switch (action.type) {
        //selected
        case SELECTED_CHANGE_VIEW_DOCUMENTARY:
        //cambio de vistas
        case VIEW_GRID_TRADITIONAL:
        case VIEW_LIST_TRADITIONAL:
        //cambio de search
        case SELECTED_SEARCHTREE_SELECTED_CORE:
        case SELECTED_SEARCHTREEMETADATA_CORE:
        case VIEW_SEARCH_TRADITIONAL:
        case VIEW_GROUP_MANTENIMIENT_TRADITIONAL:
        //limpieza de estados a vacio
        case SELECTED_INITIAL_CORE:
        case SELECTED_SEARCH_SELECTED_CORE:
        case SET_CLEAR_MEMORY_DATA_VIEWCORE:
            return action.payload;
        default:
            return state;
    }
};

//acciones
/*<------------------SELECTED--------------> */
export const setChangeSelectView = (name) => async (dispatch, getState) => {
    const { viewCore } = getState();
    dispatch({
        type: SELECTED_CHANGE_VIEW_DOCUMENTARY,
        payload: { ...viewCore, selected: name }
    })
}

//Limpiar accion del selected
export const setSelectedNullCore = () => async (dispatch, getState) => {
    const { viewCore } = getState();
    dispatch({
        type: SELECTED_INITIAL_CORE,
        payload: { ...viewCore, selected: "" },
    });
};

/*<------------------VISTA------------------> */
//Cambiar estado para vista de grid a lista con Search Metadata
export const getAllViewListAndTraditional = () => async (dispatch, getState) => {
    const { viewCore } = getState();
    dispatch({
        type: VIEW_GRID_TRADITIONAL,
        payload: { ...viewCore, selectedView: "list" },
    });
};

//Cambiar estado de vista lista a grid
export const getAllViewGridAndTraditional = () => async (dispatch, getState) => {
    const { viewCore } = getState();
    dispatch({
        type: VIEW_LIST_TRADITIONAL,
        payload: { ...viewCore, selectedView: "grid" },
    });
};

/*<----------------------CAMBIO DE SEARCH-------------------------> */

//Cambiar a estado de Search filter a TreeView para gabinetes, grupos
export const setSelectedSearchTreeCore = () => async (dispatch, getState) => {
    const { viewCore } = getState();
    dispatch({
        type: SELECTED_SEARCHTREE_SELECTED_CORE,
        payload: { ...viewCore, selectedSearch: "TraditionalTree" }
    })
};

//Cambiar a estado de Search filter a View Metadata para documentos
export const setSelectedSearchMetadataCore = () => async (dispatch, getState) => {
    const { viewCore } = getState();
    dispatch({
        type: SELECTED_SEARCHTREEMETADATA_CORE,
        payload: { ...viewCore, selectedSearch: "MetadataSearch" }
    })
};

//Cambiar estado para vista tradicional con searh normal y visualizacion de gabinetes por defecto
export const ChangeCabinetGetAll = () => async (dispatch, getState) => {
    const { viewCore } = getState();
    dispatch({
        type: VIEW_SEARCH_TRADITIONAL,
        payload: { ...viewCore, selectedSearch: "TraditionalTree", selected: "CabinetAll" },
    });
};

//Cambiar a estado para vista tradicional de grupos para mantenimiento
export const ChangeGroupGetAll = () => async (dispatch, getState) => {
    const { viewCore } = getState();
    dispatch({
        type: VIEW_GROUP_MANTENIMIENT_TRADITIONAL,
        payload: { ...viewCore, selectedSearch: "TraditionalTree", selected: "GroupMantent" },
    })
};

//limpiar estado del selectedSearch para metadata
export const setSelectedSearchNullCore = () => async (dispatch, getState) => {
    const { viewCore } = getState();
    dispatch({
        type: SELECTED_SEARCH_SELECTED_CORE,
        payload: { ...viewCore, selectedSearch: "" }
    })
};

//limpiar estado del viewcore cierre de sesion 
export const setClearMemoryDataViewCore = () => async (dispatch, getState) => {
    const { viewCore } = getState();
    dispatch({
        type: SET_CLEAR_MEMORY_DATA_VIEWCORE,
        payload: {
            ...viewCore,
            selected: "",
            selectedView: "grid",
            selectedSearch: "",
        }
    })
}