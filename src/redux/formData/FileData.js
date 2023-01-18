import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { getFileAllDocument } from "../states/Files";
import { getAllDocumentCreated } from "../states/Document";
import { getMetadataByCabinet } from "../states/Metadata";
import { getFilesByFolderAll } from "../states/Files";
import { DocumentServer } from "../../config/axios";
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
    idSelected: "",
    id: uuidv4(),
    Name: "",
    Description: "",
    File: null,
    FileTypeId: "",
    DocumentId: "",
    NameFile: "",
    DocumentIdUpdate: "",
    //subida de Masiva
    FolderId: "",
    ExcelTemplate: null,
    FilesZIP: null,
    isLoadingMasive: false,
    //Exportacion masiva
    documentIdDown: [],
    indexesDown: [],
    fileType: [],
    MetaValueDocu: [],

};

const GET_NAME_FILE_DOCU = "GET_NAME_FILE_DOCU";
const GET_ID_FILE_DOCU = "GET_ID_FILE_DOCU";
const GET_DESCRIPTION_FILE_DOCU = "GET_DESCRIPTION_FILE_DOCU";
const GET_FILE_FILE_DOCU = "GET_FILE_FILE_DOCU";
const GET_FILETYPE_FILE_DOCU = "GET_FILETYPE_FILE_DOCU";
const GET_DOCUMENT_FILE_DOCU = "GET_DOCUMENT_FILE_DOCU";
const GET_NAME_TYPEFILE_DOCU = "GET_NAME_TYPEFILE_DOCU";
//subida masiva 
const GET_FOLDER_SELECTED_MASIVE = "GET_FOLDER_SELECTED_MASIVE";
const GET_EXCEL_FILE_MASIVE = "GET_EXCEL_FILE_MASIVE";
const GET_ZIP_FILE_MASIVE = "GET_ZIP_FILE_MASIVE";
const GET_CLEAR_DATA_MASIVE = "GET_CLEAR_DATA_MASIVE";
const SPINNER_MASIVE_UPLOADER = "SPINNER_MASIVE_UPLOADER";

//Exportacion masiva
const GET_DATA_DOCUMENT_DOWN = "GET_DATA_DOCUMENT_DOWN";
const SET_CLEAR_DOCUMENT_DOWN = "SET_CLEAR_DOCUMENT_DOWN";
const GET_DATA_INDEXID_DOWN = "GET_DATA_INDEXID_DOWN";
const SET_CLEAR_DATA_INDEXID_DOWN = "SET_CLEAR_DATA_INDEXID_DOWN";
const GET_FILETYPE_ID_DOWN = "GET_FILETYPE_ID_DOWN";
const SET_CLEAR_DATA_FILETYPEID_DOWN = "SET_CLEAR_DATA_FILETYPEID_DOWN";
const SET_METADATA_VALUE_CABINET = "SET_METADATA_VALUE_CABINET";


export default function FileUploaderReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ID_FILE_DOCU:
        case GET_NAME_FILE_DOCU:
        case GET_DESCRIPTION_FILE_DOCU:
        case GET_FILE_FILE_DOCU:
        case GET_FILETYPE_FILE_DOCU:
        case GET_DOCUMENT_FILE_DOCU:
        case GET_NAME_TYPEFILE_DOCU:
        //subida masiva 
        case GET_FOLDER_SELECTED_MASIVE:
        case GET_EXCEL_FILE_MASIVE:
        case GET_ZIP_FILE_MASIVE:
        case GET_CLEAR_DATA_MASIVE:
        case SPINNER_MASIVE_UPLOADER:
        // exportacion masiva
        case GET_DATA_DOCUMENT_DOWN:
        case SET_CLEAR_DOCUMENT_DOWN:
        case GET_DATA_INDEXID_DOWN:
        case SET_CLEAR_DATA_INDEXID_DOWN:
        case GET_FILETYPE_ID_DOWN:
        case SET_CLEAR_DATA_FILETYPEID_DOWN:
        case SET_METADATA_VALUE_CABINET:
            return action.payload;
        default:
            return state;
    }
}


//Cambiar estado del nombre del tipo de archivo en apertura del modal de subir archivo
export const setGetNameTypeFileNameDocu = (name) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_NAME_TYPEFILE_DOCU,
        payload: { ...uploader, NameFile: name }
    })
};

//cambiar estado al id del file seleccionado
export const setGetIdFileDocu = (id) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_ID_FILE_DOCU,
        payload: { ...uploader, idSelected: id }
    })
}

// Cambiar Estado Nombre por valor del input
export const setGetNameFileDocu = (Name) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_NAME_FILE_DOCU,
        payload: { ...uploader, Name: Name }
    })
};

//cambiar estado descripcion por valor del input
export const setGetDescriptionFileDocu = (Description) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_DESCRIPTION_FILE_DOCU,
        payload: { ...uploader, Description: Description }
    })
};

//cambiar estado por archivo subido del input file
export const setGetFileFileDocu = (File) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_FILE_FILE_DOCU,
        payload: { ...uploader, File: File }
    })
}

//cambiar estado de id del tipo de archivo 
export const setGetFileTypeFileDocu = (FileTypeId) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_FILETYPE_FILE_DOCU,
        payload: { ...uploader, FileTypeId: FileTypeId }
    })
}

//cambiar estado de documentoId
export const setDocumentFileDocu = (DocumentId) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_DOCUMENT_FILE_DOCU,
        payload: { ...uploader, DocumentId: DocumentId }
    })
}

//cambiar estado de documentoId
export const setDocumentFileDocuUpdate = (DocumentId) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_DOCUMENT_FILE_DOCU,
        payload: { ...uploader, DocumentIdUpdate: DocumentId }
    })
}


/*<-----------------FORMULARIO DE SUBIDA MASIVA DATOS--------> */
//cambiar dato de folderI
export const setFolderMasiveSelected = (id) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_FOLDER_SELECTED_MASIVE,
        payload: { ...uploader, FolderId: id }
    })
}


//obtener Excel
export const setFileExcelTemplate = (File) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_EXCEL_FILE_MASIVE,
        payload: { ...uploader, ExcelTemplate: File }
    })
}

//cambiar estado para archivo zip de files
export const setFileZipTemplate = (File) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_ZIP_FILE_MASIVE,
        payload: { ...uploader, FilesZIP: File }
    })
}

//limpiar estados de subida masiva
export const clearDataSubmitMasive = () => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_CLEAR_DATA_MASIVE,
        payload: {
            ...uploader,
            FolderId: "",
            ExcelTemplate: null,
            FilesZIP: null,
        }
    })
}

//enviar formulario multipart/formdata de subida de archivo Crear
export const sendFileDocumentaryDocu = (formFile, documentId, MetaFolderSelected) => async (dispatch, getState) => {
    console.log(formFile.get("Id"));
    console.log(formFile.get("Name"));
    console.log(formFile.get("Description"));
    console.log(formFile.get("File"));
    console.log(formFile.get("FileTypeId"));
    console.log(formFile.get("DocumentId"));
    const { sesion } = getState();
    const { TockenUser } = sesion;
    const toastId = toast.loading('Subiendo Archivo');
    // toast.loading('Subiendo Archivo');
    axios({
        url: `${DocumentServer}file`,
        method: "PUT",
        data: formFile,
        headers: {
            Accept: 'application/json',
            'Content-Type': "multipart/form-data",
            Authorization: `Bearer ${TockenUser}`
        },
    })
        .then(function (response) {
            console.log(response);
            if (response.status == 200) {
                dispatch(getFileAllDocument(documentId))
                // toast.success('Archivo Subido Correctamente');
                toast.success('Archivo Subido Correctamente', {
                    id: toastId,
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Error Archivo no Subido');
        })
}

//Actualizar file subida de archivo
export const updateFileDocumentaryDocu = (id, formFile, documentId, MetaFolderSelected) => async (dispatch, getState) => {
    console.log(MetaFolderSelected);
    console.log(formFile.get("Id"));
    console.log(formFile.get("Name"));
    console.log(formFile.get("Description"));
    console.log(formFile.get("File"));
    console.log(formFile.get("FileTypeId"));
    console.log(formFile.get("DocumentId"));
    const { sesion } = getState();
    const { TockenUser } = sesion;
    toast.loading('Actualizando Archivo');
    axios({
        url: `${DocumentServer}file/${id}`,
        method: "PUT",
        data: formFile,
        headers: {
            Accept: 'application/json',
            'Content-Type': "multipart/form-data",
            Authorization: `Bearer ${TockenUser}`
        },
    })
        .then(function (response) {
            console.log(response);
            if (response.status == 200) {
                dispatch(getFileAllDocument(documentId))
                toast.success('Archivo Actualizado Correctamente');
            }
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Error Archivo no Subido');
        })
}

//Eliminar un archivo y actualizar estado de los archivos por documento
export const setDeleteFileDocumentary = (file, id, documentId) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}file/${id}`,
        method: "DELETE",
        data: file,
        headers: {
            'Content-Type': "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    })
        .then(function (response) {
            console.log(response);
            if (response.status == 200) {
                toast.success('Archivo Eliminado');
                dispatch(getFileAllDocument(documentId));
            }
        }).catch(function (error) {
            console.log(error);
            toast.error('Archivo no Eliminado')
        })
}

//Eliminar file
export const DeleteFilesViewTraditionalDocu = (FileId, documentId, deleteFile) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}file/${FileId}`,
        method: "DELETE",
        data: deleteFile,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            dispatch(getFileAllDocument(documentId));
            toast.success("Archivo Eliminado");
        }
    }).catch(function (error) {
        console.log(error);
        toast.error("Archivo no Eliminado");
    });
}

//spinner de carga para subida masiva
export const setSpinnerFileMasive = (bool) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: SPINNER_MASIVE_UPLOADER,
        payload: { ...uploader, isLoadingMasive: bool }
    })
}

/*<------------------SUBIDA MASIVA--------------> */
export const createdSubmitFileMasive = (formFile, FolderId, CabinetId) => async (dispatch, getState) => {
    console.log(formFile.get("ExcelTemplate"));
    console.log(formFile.get("FilesZIP"));
    dispatch(setSpinnerFileMasive(true));
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}massiveuploaddocumentmetafiles`,
        method: "PUT",
        data: formFile,
        headers: {
            Accept: 'application/json',
            'Content-Type': "multipart/form-data",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
            toast.success('Metadata y Archivos Subidos');
            dispatch(getAllDocumentCreated(FolderId));
            dispatch(getMetadataByCabinet(CabinetId));
            dispatch(getFilesByFolderAll(FolderId));
            dispatch(setSpinnerFileMasive(false));
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Error Metadata y Archivos No Subidos');
        dispatch(setSpinnerFileMasive(false));
    })
}


/*<---------------Exportacion Masiva------------------> */

//guardar array de dato de documentos
export const getDataDocumentId = (Document) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_DATA_DOCUMENT_DOWN,
        payload: { ...uploader, documentIdDown: Document }
    })
};

//Limpiar estado de dato de documentos 
export const setClearDataDocumentId = () => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: SET_CLEAR_DOCUMENT_DOWN,
        payload: { ...uploader, documentIdDown: [] }
    })
}

//guardar array de datos de indices
export const getDataIndexId = (index) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_DATA_INDEXID_DOWN,
        payload: { ...uploader, indexesDown: index }
    })
};

//limpiar estado de dato de indices
export const setClearDataIndexId = () => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: SET_CLEAR_DATA_INDEXID_DOWN,
        payload: { ...uploader, indexesDown: [] }
    })
};

//guardar array de datos de tipos de archivos
export const getFileTypeId = (id) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: GET_FILETYPE_ID_DOWN,
        payload: { ...uploader, fileType: id }
    })
}

//limpiar el estado de dato de archivos
export const setClearDataFileTypeId = () => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: SET_CLEAR_DATA_FILETYPEID_DOWN,
        payload: { ...uploader, fileType: [] }
    })
}

//guardar metadata para su valor de
export const setMetadaValuesCabinet = (meta) => async (dispatch, getState) => {
    const { uploader } = getState();
    dispatch({
        type: SET_METADATA_VALUE_CABINET,
        payload: { ...uploader, MetaValueDocu: meta }
    })
}

//envio de datos para descarga masiva de metadata
export const getDataDownloadMetaFiles = (DownData) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    toast.loading('Exportando ...');
    axios({
        url: `${DocumentServer}downloadfilesbycabinet`,
        method: 'PUT',
        data: DownData,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
            const url =
                "data:application/zip;base64," + response.data;
            import("file-saver").then((module) => {
                if (module && module.default) {
                    const data = url;
                    module.default.saveAs(data, "_export_" + new Date());
                }
            })
            toast.success("Archivo Descargado con Exito");
        }
    }).catch(function (error) {
        console.log(error);
        // toast.error(error.response.data);
    })
}