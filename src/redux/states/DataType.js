import axios from "axios";
import { CoreServer } from "../../config/axios";
import { getAllDeleteTypeDataRestored } from "../formData/ResourceData";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
    TypeData: [],
    isLoadingDataType: false,
    SelectedTypeData: "",
    elementError: "",
}

const GET_ALL_TYPEDATA_CONFIG = "GET_ALL_TYPEDATA_CONFIG";
const GET_ALL_TYPEDATA_ERROR_CONFIG = "GET_ALL_TYPEDATA_ERROR_CONFIG";
const SELECTED_ERRORS_TYPEDATA_CONFIG = "SELECTED_ERRORS_TYPEDATA_CONFIG";
const SELECTED_TYPEDATA_CONFIG = "SELECTED_TYPEDATA_CONFIG";
const SET_ACTIVE_SPINNER_DATATYPE = "SET_ACTIVE_SPINNER_DATATYPE";
const SET_CLEANER_MEMORY_DATATYPE = "SET_CLEANER_MEMORY_DATATYPE";

export default function TypeDataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TYPEDATA_CONFIG:
        case GET_ALL_TYPEDATA_ERROR_CONFIG:
        case SELECTED_ERRORS_TYPEDATA_CONFIG:
        case SELECTED_TYPEDATA_CONFIG:
        case SET_ACTIVE_SPINNER_DATATYPE:
        case SET_CLEANER_MEMORY_DATATYPE:
            return action.payload;
        default:
            return state;
    }
}

//Traer todos los tipos de datos
export const getTypeDataConfig = () => async (dispatch, getState) => {
    const { typeDataCore, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setActiveLoadingSpinnerTypeFile(true));
    axios({
        url: `${CoreServer}datatype`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_TYPEDATA_CONFIG,
                payload: { ...typeDataCore, TypeData: response.data },
            });
            dispatch(setActiveLoadingSpinnerTypeFile(false));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_TYPEDATA_ERROR_CONFIG,
            payload: { ...typeDataCore, TypeData: [] }
        })
    })
};



//Guardar dato seleccionado para crud
export const setSelectedTypeDataConfig = (id) => async (dispatch, getState) => {
    const { typeDataCore } = getState();
    const { TypeData } = typeDataCore;
    const SelectedTypeData = TypeData.find(TypeData => TypeData.id == id);

    if (SelectedTypeData == undefined) {
        dispatch({
            type: SELECTED_ERRORS_TYPEDATA_CONFIG,
            payload: { ...typeDataCore, elementError: "El id no existe" },
        });
        return;
    }
    dispatch({
        type: SELECTED_TYPEDATA_CONFIG,
        payload: { ...typeDataCore, SelectedTypeData }
    });
};


//Carga de Spinner de DataType
export const setActiveLoadingSpinnerTypeFile = (bool) => async (dispatch, getState) => {
    const { typeDataCore } = getState();
    dispatch({
        type: SET_ACTIVE_SPINNER_DATATYPE,
        payload: { ...typeDataCore, isLoadingDataType: bool }
    })
}

/*<---------------Guardado de datos Managment crud----------------------->*/

//Guardar nuevo tipo de dato y actualizar el estado global
export const CreatedTypeDataConfig = (newData) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}datatype`,
        method: "PUT",
        data: newData,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            dispatch(getTypeDataConfig());
            toast.success('Tipo de Dato Creado.');
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Tipo de Dato no Creado.');
    });
};

//Editar tipo de dato y estado global
export const UpdateTypeDataConfig = (UpdateData, id) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}datatype/${id}`,
        method: "PUT",
        data: UpdateData,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    })
        .then(function (response) {
            if (response.status == 200) {
                dispatch(getTypeDataConfig());
                toast.success('Tipo de Dato Actualizado.');
            }
        }).catch(function (error) {
            console.log(error);
            toast.error('Tipo de Dato no Actualizado');
        });
};

//Eliminar tipo de dato y actualizar estado 
export const DeleteTypeDataConfig = (DeleteData, id) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}datatype/${id}`,
        method: "DELETE",
        data: DeleteData,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            dispatch(getTypeDataConfig());
            dispatch(getAllDeleteTypeDataRestored());
            toast.success('Tipo de Dato Eliminado');
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Tipo de Dato no Eliminado');
    });
};


//limpiar estado para cierre de sesion 
export const setCleanerMemoryDataType = () => async (dispatch, getState) => {
    const { typeDataCore } = getState();
    dispatch({
        type: SET_CLEANER_MEMORY_DATATYPE,
        payload: {
            ...typeDataCore,
            TypeData: [],
            isLoadingDataType: false,
            SelectedTypeData: "",
            elementError: "",
        }
    })
}


