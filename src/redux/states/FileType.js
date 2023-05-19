import axios from "axios";
import { CoreServer, DocumentServer } from "../../config/axios";
import { getTypeDataConfig } from "./DataType";
import { getListDataConfig } from "./List";
import { getAllDeleteFileTypeRestored } from "../formData/ResourceData";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
    TypeFile: [],
    TypeFileDefault: [],
    isLoadingTypeFile: false,
    FilesCabinets: [],
    FilesNoCabinets: [],
    FilesNewFolder: [],
    FilesFolders: [],
    FilesNoSelected: [],
    CountFileType: [],
    //acciones
    SelectedTypeFile: "",
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
const SELECTED_TYPEFILE_CONFIG = "SELECTED_TYPEFILE_CONFIG";
const SELECTED_ERRORS_TYPE_FILE_CONFIG = "SELECTED_ERRORS_TYPE_FILE_CONFIG";
const GET_ALL_FILETYPE_DOCUMENT = "GET_ALL_FILETYPE_DOCUMENT";
const GET_ALL_FILETYPE_DOCUMENT_ERRORS = "GET_ALL_FILETYPE_DOCUMENT_ERRORS";
const CLEAR_MEMORY_DATA_FILETYPE = "CLEAR_MEMORY_DATA_FILETYPE";
const GET_ALL_FILETYPE_DOCUMENT_JERARQUIQUE = "GET_ALL_FILETYPE_DOCUMENT_JERARQUIQUE";
const GET_ALL_FILETYPE_DOCUMENT_JERARQUIQUE_ERRORS = "GET_ALL_FILETYPE_DOCUMENT_JERARQUIQUE_ERRORS";
const GET_ALL_DOCUMEN_BY_FILETYPE = "GET_ALL_DOCUMEN_BY_FILETYPE";

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
        case SELECTED_TYPEFILE_CONFIG:
        case SELECTED_ERRORS_TYPE_FILE_CONFIG:
        case GET_ALL_FILETYPE_DOCUMENT:
        case GET_ALL_FILETYPE_DOCUMENT_ERRORS:
        case CLEAR_MEMORY_DATA_FILETYPE:
        case GET_ALL_FILETYPE_DOCUMENT_JERARQUIQUE:
        case GET_ALL_FILETYPE_DOCUMENT_JERARQUIQUE_ERRORS:
        case GET_ALL_DOCUMEN_BY_FILETYPE:
            return action.payload;
        default:
            return state;
    }
}


//Traer tipos de archivos
export const getTypeFileConfig = () => async (dispatch, getState) => {
    const { typeFileCore, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setActiveLoadingSpinnerTypeFile(true));
    axios({
        url: `${CoreServer}filetype`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
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
            dispatch(setActiveLoadingSpinnerTypeFile(false));
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
            Authorization: `Bearer ${TockenUser}`
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
            url: `${CoreServer}CabinetFileType/GetAllByCabinet/${id}`,
            headers: {
                Authorization: `Bearer ${TockenUser}`
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
                Authorization: `Bearer ${TockenUser}`
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
            url: `${CoreServer}CabinetFileType/GetAllByCabinet/${id}`,
            headers: {
                Authorization: `Bearer ${TockenUser}`
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
            url: `${CoreServer}FolderFileType/GetNamesByFolder/${id}`,
            headers: {
                Authorization: `Bearer ${TockenUser}`
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
                Authorization: `Bearer ${TockenUser}`
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

//tipos de archivos existentes para carpeta
export const getFileTypeByFolder = (id) => async (dispatch, getState) => {
    console.log(id);
    const { typeFileCore, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const res = await axios({
            url: `${CoreServer}FolderFileType/GetNamesByFolder/${id}`,
            headers: {
                Authorization: `Bearer ${TockenUser}`
            }
        });
        if (res.status == 200) {
            dispatch({
                type: GET_FILETYPE_ALL_FOLDER_CONFIG,
                payload: { ...typeFileCore, FilesFolders: res.data }
            });
        }
    } catch (error) {
        dispatch({
            type: SELECTED_INDEX_CABINET_ERROR_CONFIG,
            payload: { ...typeFileCore, FilesFolders: [] }
        });
    }
}

//Filtrar Tipo de archivo seleccionado 
export const setSelectedTypeFileConfig = (id) => async (dispatch, getState) => {
    const { typeFileCore } = getState();
    const { TypeFile } = typeFileCore;
    const SelectedTypeFile = TypeFile.find(TypeFile => TypeFile.id == id);

    if (SelectedTypeFile == undefined) {
        dispatch({
            type: SELECTED_ERRORS_TYPE_FILE_CONFIG,
            payload: { ...typeFileCore, elementError: "El id no existe" },
        });
        return;
    }
    dispatch({
        type: SELECTED_TYPEFILE_CONFIG,
        payload: { ...typeFileCore, SelectedTypeFile }
    });
}


//Traer Contador de tipos de Archivos por documento existente
export const setCountFileTypeByDocumentJerarquique = (index) => async (dispatch, getState) => {
    const { typeFileCore, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const res = await axios({
            url: `${CoreServer}FolderFileType/GetNamesByFolder/${index}`,
            headers: {
                Authorization: `Bearer ${TockenUser}`
            }
        });
        if (res.status == 200) {
            // console.log(res.data);
            dispatch({
                type: GET_ALL_FILETYPE_DOCUMENT_JERARQUIQUE,
                payload: { ...typeFileCore, FilesFolders: res.data }
            });
            dispatch(setCountFileTypeByDocument(index));
        }
    } catch (error) {
        dispatch({
            type: GET_ALL_FILETYPE_DOCUMENT_JERARQUIQUE_ERRORS,
            payload: { ...typeFileCore, FilesFolders: [] }
        });
    }
}


//Traer Contador de tipos de Archivos por documento existente
export const setCountFileTypeByDocument = (index, value) => async (dispatch, getState) => {
    console.log(index);
    const obj = '00000000-0000-0000-0000-000000000000';
    const { typeFileCore, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const response = await axios({
            url: `${DocumentServer}getalldocumentcountFileType/${obj}/${index}/0/${value || 20000}`,
            headers: {
                Authorization: `Bearer ${TockenUser}`,
            }
        });
        console.log(response.status);
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_FILETYPE_DOCUMENT,
                payload: { ...typeFileCore, CountFileType: response.data }
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_FILETYPE_DOCUMENT_ERRORS,
            payload: { ...typeFileCore, CountFileType: [] },
        });
    }
}

//guardar state de CountFileType
export const setCountFileDocument = (valueData) => async (dispatch, getState) => {
    const { typeFileCore } = getState();
    dispatch({
        type: GET_ALL_DOCUMEN_BY_FILETYPE,
        payload: { ...typeFileCore, CountFileType: valueData}
    })

}



/*<----------------------CRUD DE FILETYPE--------------------> */
//Crear nuevo tipo de archivo
export const CreatedTypeFileConfig = (newFile) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}filetype`,
        method: "PUT",
        data: newFile,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            dispatch(getTypeFileConfig());
            toast.success('Tipo de Archivo Creado');
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Tipo de Archivo no Creado');
    });
};

//Editar tipo de archivo y actualizar estado global 
export const UpdateTypeFileConfig = (update, id) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}filetype/${id}`,
        method: "PUT",
        data: update,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            dispatch(getTypeFileConfig());
            toast.success('Tipo de Archivo Actualizado');
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Tipo de Archivo no Actualizado');
    });
};

//eliminar tipo de archivo y actualizar estado global
export const DeleteTypeFileConfig = (update, id) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}filetype/${id}`,
        method: "DELETE",
        data: update,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            dispatch(getTypeFileConfig());
            dispatch(getAllDeleteFileTypeRestored());
            toast.success('Tipo de Archivo Eliminado');
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Tipo de Archivo no Eliminado');
    });
};

//limpiar estado de historial de documentos
export const clearDataMemoryFiletype = () => async (dispatch, getState) => {
    const { typeFileCore } = getState();
    dispatch({
        type: CLEAR_MEMORY_DATA_FILETYPE,
        payload: {
            ...typeFileCore,
            TypeFile: [],
            TypeFileDefault: [],
            isLoadingTypeFile: false,
            FilesCabinets: [],
            FilesNoCabinets: [],
            FilesNewFolder: [],
            FilesFolders: [],
            FilesNoSelected: [],
            CountFileType: [],
            //acciones
            SelectedTypeFile: "",
        }
    })
}