import axios from "axios";
import { DocumentServer } from "../../config/axios";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
    documents: [],
    DocumentFolder: [],
    SelectedDocument: null,
    elementError: "",
}

const GET_ALL_DOCUMENTS_DOCU = "GET_ALL_DOCUMENTS_DOCU";
const GET_ALL_DOCUMENTS_ERROR_DOCU = "GET_ALL_DOCUMENTS_ERROR_DOCU";
const SET_FILTER_DOCUMENTS_DOCU = "SET_FILTER_DOCUMENTS_DOCU";
const SET_SELECTED_DOCUMENT_DOCU = "SET_SELECTED_DOCUMENT_DOCU";
const SET_SELECTED_DOCUMENT_ERROR = "SET_SELECTED_DOCUMENT_ERROR";

export default function DocumentaryReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DOCUMENTS_DOCU:
        case GET_ALL_DOCUMENTS_ERROR_DOCU:
        case SET_FILTER_DOCUMENTS_DOCU:
        case SET_SELECTED_DOCUMENT_DOCU:
        case SET_SELECTED_DOCUMENT_ERROR:
            return action.payload;
        default:
            return state;
    }
};

//Traer todos los documentos
export const getAllDocumentDocu = () => async (dispatch, getState) => {
    const { documentary, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}document`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser?.token}`,
        }
    }).then(function (response) {
        dispatch({
            type: GET_ALL_DOCUMENTS_DOCU,
            payload: { ...documentary, documents: response.data },
        });
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_DOCUMENTS_ERROR_DOCU,
            payload: { ...documentary, documents: [] },
        });
    })
};

//filtrar documentos por carpeta
export const setFilterDocumentDocu = FolderId => async (dispatch, getState) => {
    const { documentary } = getState();
    const { documents } = documentary;
    dispatch({
        type: SET_FILTER_DOCUMENTS_DOCU,
        payload: {
            ...documentary, DocumentFolder: documents.filter(documents => documents.folderId == FolderId)
        },
    });
};

//Filtrar documento Seleccionado
export const setSelectedDocumentDocu = (id) => async (dispatch, getState) => {
    const { documentary } = getState();
    const { documents } = documentary;
    const SelectedDocument = documents.find(documents => documents.id == id);

    if (SelectedDocument == undefined) {
        dispatch({
            type: SET_SELECTED_DOCUMENT_ERROR,
            payload: { ...documentary, elementError: "El id no existe" },
        });
        return;
    }
    dispatch({
        type: SET_SELECTED_DOCUMENT_DOCU,
        payload: { ...documentary, SelectedDocument },
    });
};