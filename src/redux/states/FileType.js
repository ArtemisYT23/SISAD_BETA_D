import axios from "axios";
import { CoreServer } from "../../config/axios";
import { getTypeDataConfig } from "./DataType";
import { getListDataConfig } from "./List";

const initialState = {
    TypeFile: [],
    TypeFileDefault: [],
    isLoadingTypeFile: false,
    FilesCabinets: [],
    FilesNoCabinets: [],
    FilesNewFolder: [],
    FilesFolders: [],
    FilesNoSelected: [],
}

const GET_ALL_TYPE_FILE_CONFIG = "GET_ALL_TYPE_FILE_CONFIG";
const GET_ALL_TYPE_FILE_ERROR_CONFIG = "GET_ALL_TYPE_FILE_ERROR_CONFIG";
const GET_ALL_FYLETYPE_DEFAULT_CONFIG = "GET_ALL_FYLETYPE_DEFAULT_CONFIG";
const GET_ALL_FYLETYPE_DEFAULT_ERROR_CONFIG = "GET_ALL_FYLETYPE_DEFAULT_ERROR_CONFIG";
const SET_ACTIVE_SPINNER_FILETYPE = "SET_ACTIVE_SPINNER_FILETYPE";
const GET_ALL_TYPEFILE_BY_CABINET_SELECTED_CONFIG = "GET_ALL_TYPEFILE_BY_CABINET_SELECTED_CONFIG";
const GET_ALL_TYPEFILE_BY_CABINET_NOT_SELECTED_CONFIG = "GET_ALL_TYPEFILE_BY_CABINET_NOT_SELECTED_CONFIG";
const GET_ALL_TYPEFILE_BY_FOLDER_CREATED = "GET_ALL_TYPEFILE_BY_FOLDER_CREATED";
const GET_FILETYPE_ALL_FOLDER_CONFIG = "GET_FILETYPE_ALL_FOLDER_CONFIG";
const SELECTED_INDEX_CABINET_ERROR_CONFIG = "SELECTED_INDEX_CABINET_ERROR_CONFIG";
const GET_FILETYPE_ALL_FOLDER_NO_SELECTED = "GET_FILETYPE_ALL_FOLDER_NO_SELECTED";
const GET_FILETYPE_ALL_FOLDER_NO_SELECTED_ERRORS = "GET_FILETYPE_ALL_FOLDER_NO_SELECTED_ERRORS";

//payload de tag de acciones
export default function FileTypeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TYPE_FILE_CONFIG:
        case GET_ALL_TYPE_FILE_ERROR_CONFIG:
        case GET_ALL_FYLETYPE_DEFAULT_CONFIG:
        case GET_ALL_FYLETYPE_DEFAULT_ERROR_CONFIG:
        case SET_ACTIVE_SPINNER_FILETYPE:
        case GET_ALL_TYPEFILE_BY_CABINET_SELECTED_CONFIG:
        case GET_ALL_TYPEFILE_BY_CABINET_NOT_SELECTED_CONFIG:
        case GET_ALL_TYPEFILE_BY_FOLDER_CREATED:
        case GET_FILETYPE_ALL_FOLDER_CONFIG:
        case SELECTED_INDEX_CABINET_ERROR_CONFIG:
        case GET_FILETYPE_ALL_FOLDER_NO_SELECTED:
        case GET_FILETYPE_ALL_FOLDER_NO_SELECTED_ERRORS:
            return action.payload;
        default:
            return state;
    }
}


//Traer tipos de archivos
export const getTypeFileConfig = () => async (dispatch, getState) => {
    const { typeFileCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}filetype`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser?.token}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_TYPE_FILE_CONFIG,
                payload: { ...typeFileCore, TypeFile: response.data },
            });
            dispatch(getTypeFileDefault());
            dispatch(getTypeDataConfig());
            dispatch(getListDataConfig());
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_TYPE_FILE_ERROR_CONFIG,
            payload: { ...typeFileCore, TypeFile: [] },
        });
    })

};

//Traer tipo de archivo por defecto 
export const getTypeFileDefault = () => async (dispatch, getState) => {
    const { typeFileCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}defaultfiletype`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser?.token}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_FYLETYPE_DEFAULT_CONFIG,
                payload: { ...typeFileCore, TypeFileDefault: response.data }
            })
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_FYLETYPE_DEFAULT_ERROR_CONFIG,
            payload: { ...typeFileCore, TypeFileDefault: [] }
        })
    })
}

//Carga de Spinner de Files
export const setActiveLoadingSpinnerTypeFile = (bool) => async (dispatch, getState) => {
    const { typeFileCore } = getState();
    dispatch({
        type: SET_ACTIVE_SPINNER_FILETYPE,
        payload: { ...typeFileCore, isLoadingTypeFile: bool }
    })
}

//traer los tipos de archivos seleccionado para gabinete
export const getTypeFileByCabinet = (id) => async (dispatch, getState) => {
    const { typeFileCore, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const res = await axios({
            url: `${CoreServer}CabinetFileType/GetAllBydCabinet/${id}`,
            headers: {
                Authorization: `Bearer ${TockenUser?.token}`
            }
        });
        if (res.status == 200) {
            dispatch({
                type: GET_ALL_TYPEFILE_BY_CABINET_SELECTED_CONFIG,
                payload: { ...typeFileCore, FilesCabinets: res.data }
            })
            dispatch(getTypeFileByCabinetNoSelected(id));
        }
    } catch (error) {
        console.log(error);
    }
}

//traer los tipos de archivos no seleccionados para gabinetas
export const getTypeFileByCabinetNoSelected = (id) => async (dispatch, getState) => {
    const { typeFileCore, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const res = await axios({
            url: `${CoreServer}getcabinetfiletypetoadd/${id}`,
            headers: {
                Authorization: `Bearer ${TockenUser?.token}`
            }
        });
        if (res.status == 200) {
            dispatch({
                type: GET_ALL_TYPEFILE_BY_CABINET_NOT_SELECTED_CONFIG,
                payload: { ...typeFileCore, FilesNoCabinets: res.data }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//traer los tipos de archivos seleccionado para crear carpeta
export const getTypeFileByFolderNew = (id) => async (dispatch, getState) => {
    const { typeFileCore, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const res = await axios({
            url: `${CoreServer}CabinetFileType/GetAllBydCabinet/${id}`,
            headers: {
                Authorization: `Bearer ${TockenUser?.token}`
            }
        });
        if (res.status == 200) {
            dispatch({
                type: GET_ALL_TYPEFILE_BY_FOLDER_CREATED,
                payload: { ...typeFileCore, FilesNewFolder: res.data }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//tipos de archivos existentes para carpeta
export const getTypeFileByFolderFolder = (id) => async (dispatch, getState) => {
    const { typeFileCore, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const res = await axios({
            url: `${CoreServer}FolderFileType/GetNamesBydFolder/${id}`,
            headers: {
                Authorization: `Bearer ${TockenUser?.token}`
            }
        });
        if (res.status == 200) {
            dispatch({
                type: GET_FILETYPE_ALL_FOLDER_CONFIG,
                payload: { ...typeFileCore, FilesFolders: res.data }
            });
            dispatch(getTypeFileByFolderNoSelected(id));
        }
    } catch (error) {
        dispatch({
            type: SELECTED_INDEX_CABINET_ERROR_CONFIG,
            payload: { ...typeFileCore, FilesFolders: [] }
        });
    }
}

//tipos de archivos existentes no seleccionados
export const getTypeFileByFolderNoSelected = (id) => async (dispatch, getState) => {
    const { typeFileCore, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const res = await axios({
            url: `${CoreServer}FolderFileType/getfolderfiletypetoadd/${id}`,
            headers: {
                Authorization: `Bearer ${TockenUser?.token}`
            }
        });
        if (res.status == 200) {
            dispatch({
                type: GET_FILETYPE_ALL_FOLDER_NO_SELECTED,
                payload: { ...typeFileCore, FilesNoSelected: res.data }
            })
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_FILETYPE_ALL_FOLDER_NO_SELECTED_ERRORS,
            payload: { ...typeFileCore, FilesNoSelected: [] }
        })
    }
}