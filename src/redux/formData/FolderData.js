import { v4 as uuidv4 } from "uuid";

const initialState = {
    //creacion
    id: uuidv4(),
    name: "",
    description: "",
    cabinetId: "",
    folderId: null,
    folderFileTypes: [],
    //actualizacion
    idUpdate: "",
    nameUpdate: "",
    DescriptionUpdate: "",
    CabinetIdUpdate: "",
    folderIdUpdate: null,
    FileTypeUpdate: []
}

const GET_NAME_FOLDER_DATA = "GET_NAME_FOLDER_DATA";
const GET_DESCRIPTION_FOLDER_DATA = "GET_DESCRIPTION_FOLDER_DATA";
const GET_CABINETID_FOLDER_DATA = "GET_CABINETID_FOLDER_DATA";
const GET_FOLDERID_FOLDER_DATA = "GET_FOLDERID_FOLDER_DATA";
const GET_FILETYPE_FOLDER_DATA = "GET_FILETYPE_FOLDER_DATA";
const CLEAR_DATA_FOLDER_NEW = "CLEAR_DATA_FOLDER_NEW";
//actualizacion
const SAVE_UPDATE_IDFOLDER = "SAVE_UPDATE_IDFOLDER";
const SAVE_UPDATE_NAMEFOLDER = "SAVE_UPDATE_NAMEFOLDER";
const SAVE_UPDATE_DESCRIPTIONFOLDER = "SAVE_UPDATE_DESCRIPTIONFOLDER";
const SAVE_UPDATE_CABINETFOLDER = "SAVE_UPDATE_CABINETFOLDER";
const SAVE_UPDATE_FOLDERID = "SAVE_UPDATE_FOLDERID";
const SAVE_UPDATE_FILETYPE_FOLDER = "SAVE_UPDATE_FILETYPE_FOLDER";
const CLEAR_DATA_FOLDER_UPDATE = "CLEAR_DATA_FOLDER_UPDATE";

export default function FolderDataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NAME_FOLDER_DATA:
        case GET_DESCRIPTION_FOLDER_DATA:
        case GET_CABINETID_FOLDER_DATA:
        case GET_FOLDERID_FOLDER_DATA:
        case GET_FILETYPE_FOLDER_DATA:
        case CLEAR_DATA_FOLDER_NEW:
        //actualizacion de gabinete
        case SAVE_UPDATE_IDFOLDER:
        case SAVE_UPDATE_NAMEFOLDER:
        case SAVE_UPDATE_DESCRIPTIONFOLDER:
        case SAVE_UPDATE_CABINETFOLDER:
        case SAVE_UPDATE_FOLDERID:
        case SAVE_UPDATE_FILETYPE_FOLDER:
        case CLEAR_DATA_FOLDER_UPDATE:
            return action.payload;
        default:
            return state;
    }
}

//guardar nombre de la carpeta nueva
export const getNameFolderNew = (name) => async (dispatch, getState) => {
    const { folderData } = getState();
    dispatch({
        type: GET_NAME_FOLDER_DATA,
        payload: { ...folderData, name: name }
    })
}

//guardar descripcion de la carpeta nueva
export const getDescriptionFolderNew = (description) => async (dispatch, getState) => {
    const { folderData } = getState();
    dispatch({
        type: GET_DESCRIPTION_FOLDER_DATA,
        payload: { ...folderData, description: description }
    })
}

//guardar cabinetId de la carpeta nueva
export const getCabinetIdFolderNew = (cabinetId) => async (dispatch, getState) => {
    const { folderData } = getState();
    dispatch({
        type: GET_CABINETID_FOLDER_DATA,
        payload: { ...folderData, cabinetId: cabinetId }
    })
}

//guardar folderId para la carpeta nueva
export const getFolderIdFolderNew = (folderId) => async (dispatch, getState) => {
    const { folderData } = getState();
    dispatch({
        type: GET_FOLDERID_FOLDER_DATA,
        payload: { ...folderData, folderId: folderId }
    })
}

//guardar folderFileType para la nueva carpeta
export const getFileTypeIdFolderNew = (folderFileTypes) => async (dispatch, getState) => {
    const { folderData } = getState();
    dispatch({
        type: GET_FILETYPE_FOLDER_DATA,
        payload: { ...folderData, folderFileTypes: folderFileTypes }
    })
}

//limpiar estado de creacion de carpetas
export const setClearDataFolderNew = () => async (dispatch, getState) => {
    const { folderData } = getState();
    dispatch({
        type: CLEAR_DATA_FOLDER_NEW,
        payload: {
            ...folderData,
            id: uuidv4(),
            name: "",
            description: "",
            cabinetId: "",
            folderId: null,
            folderFileTypes: [],
        }
    })
}

/*<-----------------Actualizar Carpeta -----------> */
//Guardar id de carpeta seleccionada para actualizar
export const saveIdFolderSelectedUpdate = (id) => async (dispatch, getState) => {
    const { folderData } = getState();
    dispatch({
        type: SAVE_UPDATE_IDFOLDER,
        payload: { ...folderData, idUpdate: id }
    })
}

//Guardar nombre de carpeta seleccionada para actualizar 
export const saveNameFolderSelectedUpdate = (name) => async (dispatch, getState) => {
    const { folderData } = getState();
    dispatch({
        type: SAVE_UPDATE_NAMEFOLDER,
        payload: { ...folderData, nameUpdate: name }
    })
}

//Guardar descripcion de carpeta seleccionada para actualizar
export const saveDescriptionFolderSelectedUpdate = (descripcion) => async (dispatch, getState) => {
    const { folderData } = getState();
    dispatch({
        type: SAVE_UPDATE_DESCRIPTIONFOLDER,
        payload: { ...folderData, DescriptionUpdate: descripcion }
    })
}

//Guardar IdCabinet de carpeta seleccionada para actualizar
export const saveCabinetIdFolderSelectedUpdate = (cabinetId) => async (dispatch, getState) => {
    const { folderData } = getState();
    dispatch({
        type: SAVE_UPDATE_CABINETFOLDER,
        payload: { ...folderData, CabinetIdUpdate: cabinetId }
    })
}

//guardar folderId para actualizar carpeta
export const saveFolderIdSelectedUpdate = (folderId) => async (dispatch, getState) => {
    const { folderData } = getState();
    dispatch({
        type: SAVE_UPDATE_FOLDERID,
        payload: { ...folderData, folderIdUpdate: folderId }
    })
}

//guardar fileType de carpeta seleccionada para actualizar
export const saveFileTypeFolderSelectedUpdate = (fileType) => async (dispatch, getState) => {
    const { folderData } = getState();
    dispatch({
        type: SAVE_UPDATE_FILETYPE_FOLDER,
        payload: { ...folderData, FileTypeUpdate: fileType }
    })
}

//limpiar estado de carpetas para actualizacion
export const setClearFolderDataUpdate = () => async (dispatch, getState) => {
    const { folderData } = getState();
    dispatch({
        type: CLEAR_DATA_FOLDER_UPDATE,
        payload: {
            ...folderData,
            idUpdate: "",
            nameUpdate: "",
            DescriptionUpdate: "",
            CabinetIdUpdate: "",
            folderIdUpdate: null,
            FileTypeUpdate: []
        }
    })
}



