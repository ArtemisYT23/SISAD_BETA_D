import axios from "axios";
import { CoreServer } from "../../config/axios";
import { setChangeSelectView } from "./View";
import { setOpenModalListElementCreated } from "./ActionConfig";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
    ListData: [],
    SelectedList: "",
    //elementos
    ElementList: [],
    ElementFilterList: [],
    selectedElement: "",
    elementError: "",
}

const GET_ALL_LISTDATA_CONFIG = "GET_ALL_LISTDATA_CONFIG";
const GET_ALL_LISTDATA_ERROR_CONFIG = "GET_ALL_LISTDATA_ERROR_CONFIG";
const SELECTED_LIST_CONFIG = "SELECTED_LIST_CONFIG";
const SELECTED_ERRORS_LIST_CONFIG = "SELECTED_ERRORS_LIST_CONFIG";
const SELECTED_LIST_BY_ELEMENT = "SELECTED_LIST_BY_ELEMENT";
const NOT_SELECTED_LIST_CONFIG = "NOT_SELECTED_LIST_CONFIG";
const FILTER_ELEMENTLIST_CONFIG = "FILTER_ELEMENTLIST_CONFIG";
const GET_ALL_ELEMENTLIST_CONFIG = "GET_ALL_ELEMENTLIST_CONFIG";
const GET_ALL_ELEMENTLIST_ERROR_CONFIG = "GET_ALL_ELEMENTLIST_ERROR_CONFIG";
const SET_SELECTED_ELEMENT_LIST_ITEM = "SET_SELECTED_ELEMENT_LIST_ITEM";
const SET_SELECTED_ELEMENT_LIST_ITEM_ERRORS = "SET_SELECTED_ELEMENT_LIST_ITEM_ERRORS";
const CLEAR_DATA_MEMORY_LIST = "CLEAR_DATA_MEMORY_LIST";

export default function ListReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_LISTDATA_CONFIG:
        case GET_ALL_LISTDATA_ERROR_CONFIG:
        case SELECTED_LIST_CONFIG:
        case SELECTED_ERRORS_LIST_CONFIG:
        case SELECTED_LIST_BY_ELEMENT:
        case NOT_SELECTED_LIST_CONFIG:
        case FILTER_ELEMENTLIST_CONFIG:
        case GET_ALL_ELEMENTLIST_CONFIG:
        case GET_ALL_ELEMENTLIST_ERROR_CONFIG:
        case SET_SELECTED_ELEMENT_LIST_ITEM:
        case SET_SELECTED_ELEMENT_LIST_ITEM_ERRORS:
        case CLEAR_DATA_MEMORY_LIST:
            return action.payload;
        default:
            return state;
    }
}

//traer todas las listas de datos
export const getListDataConfig = () => async (dispatch, getState) => {
    const { listCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}list`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_LISTDATA_CONFIG,
                payload: { ...listCore, ListData: response.data },
            });
            dispatch(getAllElementListConfig());
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_LISTDATA_ERROR_CONFIG,
            payload: { ...listCore, ListData: [] }
        })
    })
};

// filtrar lista seleccionada 
export const SelectedListConfig = (id) => async (dispatch, getState) => {
    const { listCore } = getState();
    const { ListData } = listCore;
    const SelectedList = ListData.find(ListData => ListData.id == id);

    if (SelectedList == undefined) {
        dispatch({
            type: SELECTED_ERRORS_LIST_CONFIG,
            payload: { ...listCore, elementError: "El id no existe" },
        });
        return;
    }
    dispatch({
        type: SELECTED_LIST_CONFIG,
        payload: { ...listCore, SelectedList },
    })
};

//Eliminar Lista seleccionada de memoria
export const SelectedNotSelectedListConfig = () => async (dispatch, getState) => {
    const { listCore } = getState();
    dispatch({
        type: NOT_SELECTED_LIST_CONFIG,
        payload: { ...listCore, SelectedList: "" },
    })
}

//traer todos los elementos 
export const getAllElementListConfig = () => async (dispatch, getState) => {
    const { listCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}listelement`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_ELEMENTLIST_CONFIG,
                payload: { ...listCore, ElementList: response.data },
            });
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_ELEMENTLIST_ERROR_CONFIG,
            payload: { ...listCore, ElementList: [] }
        })
    })

};

//filtrar elementos de una lista
export const setElementListFilterConfig = (id) => async (dispatch, getState) => {
    const { listCore } = getState();
    const { ElementList } = listCore;
    dispatch({
        type: FILTER_ELEMENTLIST_CONFIG,
        payload: {
            ...listCore, ElementFilterList: ElementList.filter(
                ElementList => ElementList.listId == id)
        },
    });
};

//filtro para guardar elemento seleccionado
export const setSelectedElementConfig = (id) => async (dispatch, getState) => {
    const { listCore } = getState();
    const { ElementList } = listCore;
    const selectedElement = ElementList.find(ElementList => ElementList.id == id);

    if (selectedElement == undefined) {
        dispatch({
            type: SET_SELECTED_ELEMENT_LIST_ITEM_ERRORS,
            payload: { ...listCore, elementError: "El id no existe" },
        });
        return;
    }
    dispatch({
        type: SET_SELECTED_ELEMENT_LIST_ITEM,
        payload: { ...listCore, selectedElement },
    });
};

//guardar lista creada para luego enviarla a elementos
export const ListSelectedElem = (listNew) => async (dispatch, getState) => {
    const { listCore } = getState();
    dispatch({
        type: SELECTED_LIST_BY_ELEMENT,
        payload: { ...listCore, SelectedList: listNew }
    })
}

/*<----------------Listas-------------------->*/
//traer todas las listas de datos para modal de creacion de listas
export const getListDataCreated = (listNew) => async (dispatch, getState) => {
    const { listCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}list`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_LISTDATA_CONFIG,
                payload: { ...listCore, ListData: response.data },
            });
            dispatch(ListSelectedElem(listNew));
            dispatch(setOpenModalListElementCreated(true));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_LISTDATA_ERROR_CONFIG,
            payload: { ...listCore, ListData: [] }
        })
    })
};


/*<----------------LISTAS------------------------> */
//crear lista de datos nueva
export const CreatedListConfig = (newList) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}list`,
        method: "PUT",
        data: newList,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            dispatch(getListDataCreated(newList));
            toast.success('Lista Creada');
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Lista no Creada');
    })
};

//actualizar Lista 
export const UpdateElementConfig = (UpdateList, id) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}list/${id}`,
        method: "PUT",
        data: UpdateList,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            dispatch(getListDataConfig());
            toast.success('Lista Actualizada');
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Lista no Actualizada');
    });
}


/*<---------------ELEMENTOS DE LISTA-------------------->*/

//traer todos los elementos creacion
export const getAllElementListCreated = (listId) => async (dispatch, getState) => {
    const { listCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}listelement`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_ELEMENTLIST_CONFIG,
                payload: { ...listCore, ElementList: response.data },
            });
            dispatch(setElementListFilterConfig(listId));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_ELEMENTLIST_ERROR_CONFIG,
            payload: { ...listCore, ElementList: [] }
        })
    })

};


//Crear Elemento de la lista
export const CreatedElementListConfig = (newElement, listId) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}listelement`,
        method: "PUT",
        data: newElement,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            dispatch(getAllElementListCreated(listId));
            toast.success('Elemento Creado');
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Elemento no Creado');
    });
};


//Actualizar elemento de la lista
export const UpdateElementListConfig = (UpdateElement, id, listId) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}listelement/${id}`,
        method: "PUT",
        data: UpdateElement,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            dispatch(getAllElementListCreated(listId));
            toast.success('Elemento Actualizado');
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Elemento no Actualizado');
    });
};

//Eliminar Elemento de la lista
export const DeleteElementListConfig = (DeleteEle, id, listId) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}listelement/${id}`,
        method: "DELETE",
        data: DeleteEle,
        headers: {
            "Content-type": "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            toast.success('Elemento Eliminado');
            dispatch(getAllElementListCreated(listId));
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Elemento no Eliminado');
    });
}

//limpiar estado de cierre de sesion 
export const setClearDataMemoryList = () => async (dispatch, getState) => {
    const { listCore } = getState();
    dispatch({
        type: CLEAR_DATA_MEMORY_LIST,
        payload: {
            ...listCore,
            ListData: [],
            SelectedList: "",
            //elementos
            ElementList: [],
            ElementFilterList: [],
            selectedElement: "",
            elementError: "",
        }
    })
}

