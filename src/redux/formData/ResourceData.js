import axios from "axios";
import { CoreServer } from "../../config/axios"
import toast, { Toaster } from "react-hot-toast";
import { getAllGroupsCore } from "../states/Group";
import { getAllCabinetsCore } from "../states/Cabinet";
import { getAllFoldersCore } from "../states/Folder";
import { getIndexCabinetGetAllConfig } from "../states/Indexes";
import { getTypeDataConfig } from "../states/DataType";
import { getTypeFileConfig } from "../states/FileType";

const initialState = {
    groupRestored: [],
    cabinetRestored: [],
    folderRestored: [],
    indexRestored: [],
    typeDataRestored: [],
    fileTypeRestored: [],
    isLoadingRestored: false,
    elementError: ""
}

const GET_DELETED_GROUP_RESTORED = "GET_DELETED_GROUP_RESTORED";
const GET_DELETED_GROUP_ERROR_RESTORED = "GET_DELETED_GROUP_ERROR_RESTORED";
const GET_DELETED_CABINET_RESTORED = "GET_DELETED_CABINET_RESTORED";
const GET_DELETED_CABINET_ERROR_RESTORED = "GET_DELETED_CABINET_ERROR_RESTORED";
const GET_DELETED_FOLDER_RESTORED = "GET_DELETED_FOLDER_RESTORED";
const GET_DELETED_FOLDER_ERROR_RESTORED = "GET_DELETED_FOLDER_ERROR_RESTORED";
const GET_DELETED_INDEX_RESTORED = "GET_DELETED_INDEX_RESTORED";
const GET_DELETED_INDEX_ERROR_RESTORED = "GET_DELETED_INDEX_ERROR_RESTORED";
const GET_DELETED_TYPEDATA_RESTORED = "GET_DELETED_TYPEDATA_RESTORED";
const GET_DELETED_TYPEDATA_ERROR_RESTORED = "GET_DELETED_TYPEDATA_ERROR_RESTORED";
const GET_DELETED_FILETYPE_RESTORED = "GET_DELETED_FILETYPE_RESTORED";
const GET_DELETED_FILETYPE_ERROR_RESTORED = "GET_DELETED_FILETYPE_ERROR_RESTORED";

const SPINNER_ACTIVE_RESTORED = "SPINNER_ACTIVE_RESTORED";
const CLEAR_INFO_RESOURCE_DATA = "CLEAR_INFO_RESOURCE_DATA";


export default function ResourceDataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DELETED_GROUP_RESTORED:
        case GET_DELETED_GROUP_ERROR_RESTORED:
        case GET_DELETED_CABINET_RESTORED:
        case GET_DELETED_CABINET_ERROR_RESTORED:
        case GET_DELETED_FOLDER_RESTORED:
        case GET_DELETED_FOLDER_ERROR_RESTORED:
        case GET_DELETED_INDEX_RESTORED:
        case GET_DELETED_INDEX_ERROR_RESTORED:
        case GET_DELETED_TYPEDATA_RESTORED:
        case GET_DELETED_TYPEDATA_ERROR_RESTORED:
        case GET_DELETED_FILETYPE_RESTORED:
        case GET_DELETED_FILETYPE_ERROR_RESTORED:

        case SPINNER_ACTIVE_RESTORED:
        case CLEAR_INFO_RESOURCE_DATA:
            return action.payload;
        default:
            return state;
    }
}


//spinner de carga de datos para restored 
export const setSpinnerDataRestored = (bool) => async (dispatch, getState) => {
    const { dataResult } = getState();
    dispatch({
        type: SPINNER_ACTIVE_RESTORED,
        payload: { ...dataResult, isLoadingRestored: bool }
    })
}


/*<----------------TRAER RECURSOS ELIMINADOS-----------> */
//Traer todos los grupos eliminados para restauracion
export const getAllDeleteGroupRestored = () => async (dispatch, getState) => {
    const { dataResult, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setSpinnerDataRestored(true));
    axios({
        url: `${CoreServer}groupsdeleted`,
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_DELETED_GROUP_RESTORED,
                payload: { ...dataResult, groupRestored: response.data }
            })
            dispatch(setSpinnerDataRestored(false));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_DELETED_GROUP_ERROR_RESTORED,
            payload: { ...dataResult, groupRestored: [] }
        })
        dispatch(setSpinnerDataRestored(false));
    })
}

//Traer todos los gabinetes eliminados para restauracion
export const getAllDeleteCabinetRestored = () => async (dispatch, getState) => {
    const { dataResult, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setSpinnerDataRestored(true));
    axios({
        url: `${CoreServer}cabinetsdeleted`,
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_DELETED_CABINET_RESTORED,
                payload: { ...dataResult, cabinetRestored: response.data }
            })
            dispatch(setSpinnerDataRestored(false));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_DELETED_CABINET_ERROR_RESTORED,
            payload: { ...dataResult, cabinetRestored: [] }
        })
        dispatch(setSpinnerDataRestored(false));
    })
}

//Traer todas las carpetas eliminadas para restauracion
export const getAllDeleteFolderRestored = () => async (dispatch, getState) => {
    const { dataResult, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setSpinnerDataRestored(true));
    axios({
        url: `${CoreServer}foldersdeleted`,
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_DELETED_FOLDER_RESTORED,
                payload: { ...dataResult, folderRestored: response.data }
            })
            dispatch(setSpinnerDataRestored(false));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_DELETED_FOLDER_ERROR_RESTORED,
            payload: { ...dataResult, folderRestored: [] }
        })
        dispatch(setSpinnerDataRestored(false));
    })
}

//Traer todos los indeces eliminados para la restauracion
export const getAllDeleteIndexRestored = () => async (dispatch, getState) => {
    const { dataResult, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setSpinnerDataRestored(true));
    axios({
        url: `${CoreServer}indexdeleted`,
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_DELETED_INDEX_RESTORED,
                payload: { ...dataResult, indexRestored: response.data }
            })
            dispatch(setSpinnerDataRestored(false));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_DELETED_INDEX_ERROR_RESTORED,
            payload: { ...dataResult, indexRestored: [] }
        })
        dispatch(setSpinnerDataRestored(false));
    })
}

//Traer todos los tipos de datos eliminados para la restauracion
export const getAllDeleteTypeDataRestored = () => async (dispatch, getState) => {
    const { dataResult, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setSpinnerDataRestored(true));
    axios({
        url: `${CoreServer}datatypesdeleted`,
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_DELETED_TYPEDATA_RESTORED,
                payload: { ...dataResult, typeDataRestored: response.data }
            })
            dispatch(setSpinnerDataRestored(false));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_DELETED_TYPEDATA_ERROR_RESTORED,
            payload: { ...dataResult, typeDataRestored: [] }
        })
        dispatch(setSpinnerDataRestored(false));
    })
}

//Traer todos los tipos de archivos eliminados para la restauracion 
export const getAllDeleteFileTypeRestored = () => async (dispatch, getState) => {
    const { dataResult, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setSpinnerDataRestored(true));
    axios({
        url: `${CoreServer}filetypesdeleted`,
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_DELETED_FILETYPE_RESTORED,
                payload: { ...dataResult, fileTypeRestored: response.data }
            })
            dispatch(setSpinnerDataRestored(false));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_DELETED_FILETYPE_ERROR_RESTORED,
            payload: { ...dataResult, fileTypeRestored: [] }
        })
        dispatch(setSpinnerDataRestored(false));
    })
}



/*<------------------RESTAURACION INDIVIDUAL DE RECURSOS------------------> */
//grupos Restaurar
export const RestoredGroup = (id) =>
    (dispatch, getState) => {
        const { sesion } = getState();
        const { TockenUser } = sesion;
        axios({
            url: `${CoreServer}restoregroup/${id}`,
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${TockenUser}`
            },
        })
            .then(function (response) {
                if (response.status == 200) {
                    toast.success('Grupo Restaurado');
                    dispatch(getAllGroupsCore());
                    dispatch(getAllDeleteGroupRestored());
                };
            }).catch(function (error) {
                console.log(error);
                toast.error('Grupo No Restaurado');
            })
    };


//gabinetes Restaurar
export const RestoredCabinet = (id) =>
    (dispatch, getState) => {
        const { sesion } = getState();
        const { TockenUser } = sesion;
        axios({
            url: `${CoreServer}restorecabinet/${id}`,
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${TockenUser}`
            },
        })
            .then(function (response) {
                if (response.status == 200) {
                    toast.success('Gabinete Restaurado');
                    dispatch(getAllCabinetsCore());
                    dispatch(getAllDeleteCabinetRestored());
                };
            }).catch(function (error) {
                console.log(error);
                toast.error('Gabinete No Restaurado');
            })
    };


//carpeta Restaurar
export const RestoredFolder = (id) =>
    (dispatch, getState) => {
        const { sesion } = getState();
        const { TockenUser } = sesion;
        axios({
            url: `${CoreServer}restorefolder/${id}`,
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${TockenUser}`
            },
        })
            .then(function (response) {
                if (response.status == 200) {
                    toast.success('Carpeta Restaurado');
                    dispatch(getAllFoldersCore());
                    dispatch(getAllDeleteFolderRestored());
                };
            }).catch(function (error) {
                console.log(error);
                toast.error('Carpeta No Restaurado');
            })
    };

//restaurar indices
export const RestoredIndex = (id, cabinetId) =>
    (dispatch, getState) => {
        const { sesion } = getState();
        const { TockenUser } = sesion;
        axios({
            url: `${CoreServer}restoreindex/${id}/${cabinetId}`,
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${TockenUser}`
            },
        })
            .then(function (response) {
                if (response.status == 200) {
                    toast.success('Indice Restaurado');
                    dispatch(getIndexCabinetGetAllConfig());
                    dispatch(getAllDeleteIndexRestored());
                };
            }).catch(function (error) {
                console.log(error);
                toast.error('Indice No Restaurado');
            })
    };

//restaurar tipo de datos 
export const RestoredTypeData = (id) =>
    (dispatch, getState) => {
        const { sesion } = getState();
        const { TockenUser } = sesion;
        axios({
            url: `${CoreServer}restoredatatype/${id}`,
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${TockenUser}`
            },
        })
            .then(function (response) {
                if (response.status == 200) {
                    toast.success('Tipo De Dato Restaurado');
                    dispatch(getTypeDataConfig());
                    dispatch(getAllDeleteTypeDataRestored());
                };
            }).catch(function (error) {
                console.log(error);
                toast.error('Tipo De Dato No Restaurado');
            })
    };


//restaurar tipo de archivo
export const RestoredFileType = (id) =>
    (dispatch, getState) => {
        const { sesion } = getState();
        const { TockenUser } = sesion;
        axios({
            url: `${CoreServer}restorefiletype/${id}`,
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${TockenUser}`
            },
        })
            .then(function (response) {
                if (response.status == 200) {
                    toast.success('Tipo De Archivo Restaurado');
                    dispatch(getTypeFileConfig());
                    dispatch(getAllDeleteFileTypeRestored());
                };
            }).catch(function (error) {
                console.log(error);
                toast.error('Tipo De Archivo No Restaurado');
            })
    };


//limpiar estado de datos iniciales de recursos
export const clearDataResourceInfo = () => async (dispatch, getState) => {
    const { dataResult } = getState();
    dispatch({
        type: CLEAR_DATA_INFO_RESOURCE,
        payload: {
            ...dataResult,
            groupRestored: [],
            cabinetRestored: [],
            folderRestored: [],
            indexRestored: [],
            typeDataRestored: [],
            fileTypeRestored: [],
            isLoadingRestored: false,
            elementError: ""
        }
    })
}