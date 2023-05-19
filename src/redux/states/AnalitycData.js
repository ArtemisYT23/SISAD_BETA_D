import { DocumentServer, CoreServer } from "../../config/axios";
import axios from "axios";

const initialState = {
    Documents: [],
    DocumentDetail: [],
    Files: [],
}

const GET_ALL_METADATA_BYCABINET = "GET_ALL_METADATA_BYCABINET";
const GET_ALL_METADATA_BYCABINET_ERRORS = "GET_ALL_METADATA_BYCABINET_ERRORS";
const GET_ALL_DETAIL_DOCUMENTS_DOCU = "GET_ALL_DETAIL_DOCUMENTS_DOCU";
const GET_ALL_DETAIL_DOCUMENTS_ERRORS = "GET_ALL_DETAIL_DOCUMENTS_ERRORS";
const GET_ALL_FILES_CONTENT = "GET_ALL_FILES_CONTENT";
const GET_ALL_FILES_CONTENT_ERRORS = "GET_ALL_FILES_CONTENT_ERRORS";


export default function DataAnalitycReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_METADATA_BYCABINET:
        case GET_ALL_METADATA_BYCABINET_ERRORS:
        case GET_ALL_DETAIL_DOCUMENTS_DOCU:
        case GET_ALL_DETAIL_DOCUMENTS_ERRORS:
        case GET_ALL_FILES_CONTENT:
        case GET_ALL_FILES_CONTENT_ERRORS:
            return action.payload;
        default:
            return state;
    }
}


//Traer todos los documentos
export const getMetadataByCabinet = (folderId, value) => async (dispatch, getState) => {
    const { analitycInfo, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const response = await axios({
            url: `${DocumentServer}metadatalistbyfolder/${folderId}/${value || 0}/20000`,
            headers: {
                Authorization: `Bearer ${TockenUser}`
            }
        });

        if (response.status == 200) {
            console.log(response.data);
            dispatch({
                type: GET_ALL_METADATA_BYCABINET,
                payload: { ...analitycInfo, Documents: response.data }
            });
            dispatch(setDetailByFolderDocument(folderId, value));
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_METADATA_BYCABINET_ERRORS,
            payload: { ...analitycInfo, Documents: [] },
        });
    }
}

//Traer Detalle de documentos fecha creacion y actualizacion y total de archivos
export const setDetailByFolderDocument = (folderId, value) => async (dispatch, getState) => {
    const { analitycInfo, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}datedocmetacountfile/${folderId}/${value || 0}/20000`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`,
        }
    }).then(function (response) {
        if (response.status == 200) {
            console.log(response.data);
            dispatch({
                type: GET_ALL_DETAIL_DOCUMENTS_DOCU,
                payload: { ...analitycInfo, DocumentDetail: response.data },
            });
            dispatch(setFilesByFolderContent(folderId));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_DETAIL_DOCUMENTS_ERRORS,
            payload: { ...analitycInfo, DocumentDetail: [] },
        });
    })
}

//Traer todos los archivos
export const setFilesByFolderContent = (folderId) => async (dispatch, getState) => {
    const { analitycInfo, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}filebyfolder/${folderId}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`,
        }
    }).then(function (response) {
        if (response.status == 200) {
            console.log(response.data);
            dispatch({
                type: GET_ALL_FILES_CONTENT,
                payload: { ...analitycInfo, Files: response.data },
            });
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_FILES_CONTENT_ERRORS,
            payload: { ...analitycInfo, Files: [] },
        });
    })
}