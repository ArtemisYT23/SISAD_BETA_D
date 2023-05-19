import axios from "axios";
import { DocumentServer } from "../../config/axios";
import { setChangeSelectView } from "./View";


const initialState = {
    files: [],
    SearchFiles: [],
    SelectedFile: null,
    SelectedUrlFile: "",
    isLoadingArchive: false,
    isLoadingFilesSearch: false,
    elementError: "",
}

const GET_FILES_DOCU = "GET_FILES_DOCU";
const GET_FILES_DOCU_ERRORS = "GET_FILES_DOCU_ERRORS";
const CLEARNER_FILES_ALL_DOCUMENT = "CLEARNER_FILES_ALL_DOCUMENT";
const SET_FILTAR_FILETYPE_BY_DOCUMENT = "SET_FILTAR_FILETYPE_BY_DOCUMENT";
const SELECTED_FILE_DOCUMENT = "SELECTED_FILE_DOCUMENT";
const SELECTED_FILE_ERRORS_DOCUMENT = "SELECTED_FILE_ERRORS_DOCUMENT";
const SET_CLEANER_FILES_DOCU = "SET_CLEANER_FILES_DOCU";
const SELECTED_URLFILE_CORE = "SELECTED_URLFILE_CORE";
const GET_ALL_FILES_NAME_DATA_CORE = "GET_ALL_FILES_NAME_DATA_CORE";
const GET_ALL_FILES_NAME_DATA_ERRORS_CORE = "GET_ALL_FILES_NAME_DATA_ERRORS_CORE";
const SET_ACTIVE_SPINNER_ARCHIVE = "SET_ACTIVE_SPINNER_ARCHIVE";
const SET_ACTIVE_SPINNER_SEARCH_FILES = "SET_ACTIVE_SPINNER_SEARCH_FILES";
const GET_FILES_BY_DOCUMENTFILE = "GET_FILES_BY_DOCUMENTFILE";
const GET_FILES_ERRORS_BY_DOCUMENTFILE = "GET_FILES_ERRORS_BY_DOCUMENTFILE";
const GET_FILES_SEARCH_TEXT = "GET_FILES_SEARCH_TEXT";
const GET_FILES_SEARCH_TEXT_ERRORS = "GET_FILES_SEARCH_TEXT_ERRORS";


export default function FilesCoreReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FILES_DOCU:
        case GET_FILES_DOCU_ERRORS:
        case CLEARNER_FILES_ALL_DOCUMENT:
        case SET_FILTAR_FILETYPE_BY_DOCUMENT:
        case SELECTED_FILE_DOCUMENT:
        case SELECTED_FILE_ERRORS_DOCUMENT:
        case SET_CLEANER_FILES_DOCU:
        case SELECTED_URLFILE_CORE:
        case GET_ALL_FILES_NAME_DATA_CORE:
        case GET_ALL_FILES_NAME_DATA_ERRORS_CORE:
        case SET_ACTIVE_SPINNER_ARCHIVE:
        case SET_ACTIVE_SPINNER_SEARCH_FILES:
        case GET_FILES_BY_DOCUMENTFILE:
        case GET_FILES_ERRORS_BY_DOCUMENTFILE:
        case GET_FILES_SEARCH_TEXT:
        case GET_FILES_SEARCH_TEXT_ERRORS:
            return action.payload;
        default:
            return state;
    }
};

//Traer todos los archivos por documento
export const getFileAllDocument = (id) => async (dispatch, getState) => {
    const { filesCore, sesion } = getState();
    const { TockenUser } = sesion;
    console.log(id);
    dispatch(setActiveLoadingArchive(true));
    try {
        const response = await axios({
            url: `${DocumentServer}filebydocument/${id}`,
            headers: {
                Authorization: `Bearer ${TockenUser}`
            }
        });
        if (response.status == 200) {
            dispatch({
                type: GET_FILES_DOCU,
                payload: { ...filesCore, files: response.data },
            });
            dispatch(setActiveLoadingArchive(false));
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_FILES_DOCU_ERRORS,
            payload: { ...filesCore, files: [] },
        });
    }
};

//Filtrar Archivos por tipos de archivos
export const setFilterFileTypeByDocument = (fileTypeId) => async (dispatch, getState) => {
    const { filesCore } = getState();
    const { files } = filesCore;
    dispatch({
        type: SET_FILTAR_FILETYPE_BY_DOCUMENT,
        payload: {
            ...filesCore, files: files.filter(file => file.fileTypeId == fileTypeId)
        }
    })
};

//traer archivos todos por carpeta
export const getFilesByFolderAll = (folderId) => async (dispatch, getState) => {
    const { filesCore, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setActiveLoadingArchive(true));
    try {
        const response = await axios({
            url: `${DocumentServer}filebyfolder/${folderId}`,
            headers: {
                Authorization: `Bearer ${TockenUser}`
            }
        });
        if (response.status == 200) {
            dispatch({
                type: GET_FILES_DOCU,
                payload: { ...filesCore, files: response.data },
            });
            dispatch(setActiveLoadingArchive(false));
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_FILES_DOCU_ERRORS,
            payload: { ...filesCore, files: [] },
        });
    }
};

//Limpiar estado de files al momento de cambiar entre carpeta
export const setFileCleanerAllDocument = () => async (dispatch, getState) => {
    const { filesCore } = getState();
    dispatch({
        type: CLEARNER_FILES_ALL_DOCUMENT,
        payload: { ...filesCore, files: [] }
    })
}

//Filtrar Archivo Seleccionado
export const setSelectedFileDocumentary = (id) => async (dispatch, getState) => {
    const { filesCore } = getState();
    const { files } = filesCore;
    const SelectedFile = files.find(files => files.id == id);

    if (SelectedFile == undefined) {
        dispatch({
            type: SELECTED_FILE_ERRORS_DOCUMENT,
            payload: { ...filesCore, elementError: "El id no existe" },
        });
        return;
    }

    dispatch({
        type: SELECTED_FILE_DOCUMENT,
        payload: { ...filesCore, SelectedFile }
    })
}

//guardar url del file seleccionado 
export const setSelectedUrlFileCore = (Url) => async (dispatch, getState) => {
    const { filesCore } = getState();
    dispatch({
        type: SELECTED_URLFILE_CORE,
        payload: { ...filesCore, SelectedUrlFile: Url }
    })
};


//filtrar a nivel de archivos
export const setFilterFileByName = (name) => async (dispatch, getState) => {
    const { filesCore, sesion } = getState();
    const { TockenUser } = sesion;
    console.log(name);
    dispatch(setActiveLoadingFilesSearch(true));
    try {
        const response = await axios({
            url: `${DocumentServer}filebytext/${name}`,
            headers: {
                Authorization: `Bearer ${TockenUser}`
            }
        });
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_FILES_NAME_DATA_CORE,
                payload: { ...filesCore, SearchFiles: response.data },
            });
            dispatch(setChangeSelectView("search"));
            dispatch(setActiveLoadingFilesSearch(false));
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_FILES_NAME_DATA_ERRORS_CORE,
            payload: { ...filesCore, SearchFiles: [] }
        });
    }
}

//buscar archivos por configuracion de filtros
//filtrar a nivel de archivos
export const setFilterFileConfiguration = (filterData) => async (dispatch, getState) => {
    const { filesCore, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setActiveLoadingFilesSearch(true));
    try {
        const response = await axios({
            url: `${DocumentServer}filesbyfilterandtext`,
            method: 'PUT',
            data: filterData,
            headers: {
                Authorization: `Bearer ${TockenUser}`
            }
        });
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_FILES_NAME_DATA_CORE,
                payload: { ...filesCore, SearchFiles: response.data },
            });
            dispatch(setChangeSelectView("search"));
            dispatch(setActiveLoadingFilesSearch(false));
        }
    } catch (error) {
        console.log(error);
        dispatch(setActiveLoadingFilesSearch(false));
        dispatch({
            type: GET_ALL_FILES_NAME_DATA_ERRORS_CORE,
            payload: { ...filesCore, SearchFiles: [] }
        });
    }
}

//traer archivos por metadata y tipo de archivo o cualquier parametro
export const getFileByTextReferent = (Request) => async (dispatch, getState) => {
    const { filesCore, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setActiveLoadingFilesSearch(true));
    axios({
        url: `${DocumentServer}getfilesbymetadata`,
        method: "PUT",
        data: Request,
        headers: {
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        console.log(response.data);
        if (response.status == 200) {
            dispatch({
                type: GET_FILES_SEARCH_TEXT,
                payload: { ...filesCore, SearchFiles: response.data }
            })
        }
        dispatch(setChangeSelectView("searchMetaFile"));
        dispatch(setActiveLoadingFilesSearch(false));
    }).catch(function (error) {
        console.log(error);
        dispatch(setActiveLoadingFilesSearch(false));
        dispatch({
            type: GET_FILES_SEARCH_TEXT_ERRORS,
            payload: { ...filesCore, SearchFiles: [] }
        })
    });
}

//carga de Spinner de Archivos
export const setActiveLoadingArchive = (bool) => async (dispatch, getState) => {
    const { filesCore } = getState();
    dispatch({
        type: SET_ACTIVE_SPINNER_ARCHIVE,
        payload: { ...filesCore, isLoadingArchive: bool }
    })
}

//carga de spinner para files en busqueda
export const setActiveLoadingFilesSearch = (bool) => async (dispatch, getState) => {
    const { filesCore } = getState();
    dispatch({
        type: SET_ACTIVE_SPINNER_SEARCH_FILES,
        payload: { ...filesCore, isLoadingFilesSearch: bool }
    })
}

//traer archivos por tipo de archivos y documento
export const getFileByDocumentFiles = (documentId, fileFolder) => async (dispatch, getState) => {
    console.log(documentId);
    console.log(fileFolder);
    const { filesCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}filebydocumentandfiletypes/${documentId}`,
        method: "PUT",
        data: fileFolder,
        headers: {
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        console.log(response.data);
        if (response.status == 200) {
            dispatch({
                type: GET_FILES_BY_DOCUMENTFILE,
                payload: { ...filesCore, FilesFolderType: response.data }
            })
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_FILES_ERRORS_BY_DOCUMENTFILE,
            payload: { ...filesCore, FilesFolderType: [] }
        })
    });
}



/*<-----------------CRUD FILES VIEW TRADITIONAL---------> */
//descargar archivo por id desde modal
export const getFilesUnitbyIdDocu = (index) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    const response = await axios({
        url: `${DocumentServer}downloadfilebyid/${index}`,
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    });
    console.log(response.status);
    if (response.status == 200) {
        const Data = response.data;
        switch (Data.extension) {
            case ".pdf":
                const url = "data:application/pdf;base64," + Data.fileBase64;
                import("file-saver").then((module) => {
                    if (module && module.default) {
                        const data = url;
                        module.default.saveAs(data, Data.name);
                    }
                });
            default:
                return Data.extension;
        }
    }
}

//limpiar estado para cierre de sesion 
export const setCleanerFileDocu = () => async (dispatch, getState) => {
    const { filesCore } = getState();
    dispatch({
        type: SET_CLEANER_FILES_DOCU,
        payload: {
            ...filesCore,
            files: [],
            SearchFiles: [],
            SelectedFile: null,
            SelectedUrlFile: "",
            isLoadingArchive: false,
            isLoadingFilesSearch: false,
            elementError: "",
        }
    })
}