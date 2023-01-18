import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
    id: uuidv4(),
    name: "",
    description: "",
    file: null,
    fileTypeId: "",
    documentId: "",
};

const GET_NAME_FILE_NEW = "GET_NAME_FILE_NEW";
const GET_DESCRIPTION_FILE_NEW = "GET_DESCRIPTION_FILE_NEW";
const GET_FILE_FILE_NEW = "GET_FILE_FILE_NEW";
const GET_FILETYPE_FILE_NEW = "GET_FILETYPE_FILE_NEW";
const GET_DOCUMENT_FILE_NEW = "GET_DOCUMENT_FILE_NEW";
const CLEAR_DATA_FILE_NEW = "CLEAR_DATA_FILE_NEW";

export default function FileDataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NAME_FILE_NEW:
        case GET_DESCRIPTION_FILE_NEW:
        case GET_FILE_FILE_NEW:
        case GET_FILETYPE_FILE_NEW:
        case GET_DOCUMENT_FILE_NEW:
        case CLEAR_DATA_FILE_NEW:
            return action.payload;
        default:
            return state;
    }
}

//guardar dato de nombre de archivo a subir
export const getNameFileDataNewCore = (name) => async (dispatch, getState) => {
    const { filesData } = getState();
    dispatch({
        type: GET_NAME_FILE_NEW,
        payload: { ...filesData, name: name }
    })
}

//guardar dato de descripcion de archivo a subir
export const getDescriptionFileDataNewCore = (descripcion) => async (dispatch, getState) => {
    const { filesData } = getState();
    dispatch({
        type: GET_DESCRIPTION_FILE_NEW,
        payload: { ...filesData, description: descripcion }
    })
}

//guardar dato de file de archivo a subir
export const getFileFileDataNewCore = (file) => async (dispatch, getState) => {
    const { filesData } = getState();
    dispatch({
        type: GET_FILE_FILE_NEW,
        payload: { ...filesData, file: file }
    })
}

//guardar dato del filetype de archivo a subir
export const getFileTypeFileDataNewCore = (fileTypeId) => async (dispatch, getState) => {
    const { filesData } = getState();
    dispatch({
        type: GET_FILETYPE_FILE_NEW,
        payload: { ...filesData, fileTypeId: fileTypeId }
    })
}

//guardar dato del documento de archivo a subir
export const getDocumentFileDataNewCore = (documentId) => async (dispatch, getState) => {
    const { filesData } = getState();
    dispatch({
        type: GET_DOCUMENT_FILE_NEW,
        payload: { ...filesData, documentId: documentId }
    })
}

//limpiar estado de creacion de archivo a subir
export const clearFileDataNewCore = () => async (dispatch, getState) => {
    const { filesData } = getState();
    dispatch({
        type: CLEAR_DATA_FILE_NEW,
        payload: {
            ...filesData,
            id: uuidv4(),
            name: "",
            description: "",
            file: null,
            fileTypeId: "",
            documentId: "",
        }
    })
}