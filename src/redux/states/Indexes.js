import axios from "axios";
import { CoreServer } from "../../config/axios";
import { setChangeSelectView } from "./View";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
    Indexes: [],
    IndexNames: [],
    IndexConfig: [],
    IndexPreview: [],
    IndexSelected: "",
    isLoadingIndex: false,
}

const GET_CABINET_INDEX_CONFIG =
    "GET_CABINET_INDEX_CONFIG";
const GET_CABINET_INDEX_ERRORS_CONFIG = "GET_CABINET_INDEX_ERRORS_CONFIG";
const GET_INDEX_CABINET_GET_ALL_CONFIG = "GET_INDEX_CABINET_GET_ALL_CONFIG";
const GET_INDEX_CABINET_GET_ALL_ERRORS_CONFIG = "GET_INDEX_CABINET_GET_ALL_ERRORS_CONFIG";
const SET_ACTIVE_SPINNER_INDEX = "SET_ACTIVE_SPINNER_INDEX";
const GET_INDEX_DATA_CABINET_CORE = "GET_INDEX_DATA_CABINET_CORE";
const GET_INDEX_BY_CABINET_FAILED_CONFIG = "GET_INDEX_BY_CABINET_FAILED_CONFIG";
const SELECTED_INDEX_CORE = "SELECTED_INDEX_CORE";
const SELECTED_ERRORS_INDEX_CORE = "SELECTED_ERRORS_INDEX_CORE";
const GET_INDEX_FILTER_CABINET_CORE = "GET_INDEX_FILTER_CABINET_CORE";
const GET_INDEX_FILTER_CABINET_FAILED ="GET_INDEX_FILTER_CABINET_FAILED";

export default function IndexReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CABINET_INDEX_CONFIG:
        case GET_CABINET_INDEX_ERRORS_CONFIG:
        case GET_INDEX_CABINET_GET_ALL_CONFIG:
        case GET_INDEX_CABINET_GET_ALL_ERRORS_CONFIG:
        case SET_ACTIVE_SPINNER_INDEX:
        case GET_INDEX_DATA_CABINET_CORE:
        case GET_INDEX_BY_CABINET_FAILED_CONFIG:
        case SELECTED_INDEX_CORE:
        case SELECTED_ERRORS_INDEX_CORE:
        case GET_INDEX_FILTER_CABINET_CORE:
        case GET_INDEX_FILTER_CABINET_FAILED:
            return action.payload;
        default:
            return state;
    }
};

//traer todos los indices 
export const getIndexCabinetAll = () => async (dispatch, getState) => {
    const { indexCore, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const res = await axios({
            url: `${CoreServer}index`,
            headers: {
                Authorization: `Bearer ${TockenUser?.token}`
            }
        });
        if (res.status == 200) {
            dispatch({
                type: GET_CABINET_INDEX_CONFIG,
                payload: { ...indexCore, Indexes: res.data }
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_CABINET_INDEX_ERRORS_CONFIG,
            payload: { ...indexCore, Indexes: [] }
        });
    }
}

//Traer todos los indices sin selector
export const getIndexCabinetGetAllConfig = () => async (dispatch, getState) => {
    const { indexCore, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const res = await axios({
            url: `${CoreServer}getallnamesdata`,
            headers: {
                Authorization: `Bearer ${TockenUser?.token}`
            }
        });
        if (res.status == 200) {
            dispatch({
                type: GET_INDEX_CABINET_GET_ALL_CONFIG,
                payload: { ...indexCore, IndexNames: res.data }
            });
            dispatch(getIndexCabinetAll());
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_INDEX_CABINET_GET_ALL_ERRORS_CONFIG,
            payload: { ...indexCore, IndexNames: [] }
        });
    }
}

//Carga de Spinner de indices
export const setActiveLoadingSpinnerIndex = (bool) => async (dispatch, getState) => {
    const { indexCore } = getState();
    dispatch({
        type: SET_ACTIVE_SPINNER_INDEX,
        payload: { ...indexCore, isLoadingIndex: bool }
    })
}

//Filtrar indices por cada gabinete con selected
export const getIndexAllCabinetConfig = (name) => async (dispatch, getState) => {
    const { indexCore } = getState();
    const { IndexNames } = indexCore;
    try {
        dispatch({
            type: GET_INDEX_DATA_CABINET_CORE,
            payload: {
                ...indexCore, IndexConfig: IndexNames.filter(
                    Index => Index.cabinetName == name)
            }
        });
        dispatch(setChangeSelectView("ConfigIndex"));
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_INDEX_BY_CABINET_FAILED_CONFIG,
            payload: { ...indexCore, IndexConfig: [] },
        });
    }
};

//filtrar indices x gabinete para preview
export const getIndexAllCabinetPreview = (id) => async (dispatch, getState) => {
    const { indexCore } = getState();
    const { Indexes } = indexCore;
    try {
        dispatch({
            type: GET_INDEX_FILTER_CABINET_CORE,
            payload: {
                ...indexCore, IndexPreview: Indexes.filter(
                    Index => Index.cabinetId == id)
            }
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_INDEX_FILTER_CABINET_FAILED,
            payload: { ...indexCore, IndexPreview: [] },
        });
    }
};

//Filtrar de Indice seleccionado
export const setSelectedIndexes = id => async (dispatch, getState) => {
    const { indexCore } = getState();
    const { Indexes } = indexCore;
    const IndexSelected = Indexes.find(Indexes => Indexes.id == id);
  
    if (IndexSelected == undefined) {
      dispatch({
        type: SELECTED_ERRORS_INDEX_CORE,
        payload: { ...indexCore, elementError: "El Id no existe" },
      });
      return;
    }
  
    dispatch({
      type: SELECTED_INDEX_CORE,
      payload: { ...indexCore, IndexSelected },
    });
  };



/*<-------------------CRUD INDICES--------------------->*/

//Traer todos los indices con nombre para la actualizacion
export const getIndexNameConfig = (Name) => async (dispatch, getState) => {
    const { indexCore, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setActiveLoadingSpinnerIndex(true));
    try {
        const res = await axios({
            url: `${CoreServer}getallnamesdata`,
            headers: {
                Authorization: `Bearer ${TockenUser?.token}`
            }
        });
        if (res.status == 200) {
            dispatch({
                type: GET_INDEX_CABINET_GET_ALL_CONFIG,
                payload: { ...indexCore, IndexNames: res.data }
            });
            dispatch(getFilterIndexNameConfig(Name));
            dispatch(setActiveLoadingSpinnerIndex(false));
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_INDEX_CABINET_GET_ALL_ERRORS_CONFIG,
            payload: { ...indexCore, IndexNames: [] }
        });
    }
}

//filtro de indices para actualizacion
export const getFilterIndexNameConfig = (name) => async (dispatch, getState) => {
    const { indexCore } = getState();
    const { IndexNames } = indexCore;
    try {
        dispatch({
            type: GET_INDEX_DATA_CABINET_CORE,
            payload: {
                ...indexCore, IndexConfig: IndexNames.filter(
                    Index => Index.cabinetName == name)
            }
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_INDEX_BY_CABINET_FAILED_CONFIG,
            payload: { ...indexCore, IndexConfig: [] },
        });
    }
};


/*<------------------CRUD DE INDICES-----------------> */

//Crear indice de gabinete y actualizar estado
export const setIndexCabinetCreatedConfig = (newIndex, Name) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}index`,
        method: "PUT",
        data: newIndex,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser?.token}`
        },
    })
        .then(function (response) {
            console.log(response)
            if (response.status == 200) {
                toast.success('Indice Creado');
                dispatch(getIndexNameConfig(Name));
            }
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Indice no Creado.');
        });
};


//Actualizar Indice de gabinete y actualizar estado
export const setIndexCabinetUpdateConfig = (updateIndex, id, Name) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}index/${id}`,
        method: "PUT",
        data: updateIndex,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser?.token}`
        },
    })
        .then(function (response) {
            console.log(response)
            if (response.status == 200) {
                toast.success('Indice Actualizado');
                dispatch(getIndexNameConfig(Name));
            }
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Indice no Actualizado');
        });
};

//Eliminar Indice de gabinetey actualizar estado
export const setIndexCabinetDeleteConfig = (deleteIndex, id, Name, cabinetId) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}index/${id}/${cabinetId}`,
        method: "DELETE",
        data: deleteIndex,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser?.token}`
        },
    })
        .then(function (response) {
            console.log(response)
            if (response.status == 200) {
                toast.success('Indice Eliminado');
                dispatch(getIndexNameConfig(Name));
            }
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Indice no Eliminado');
        });
};