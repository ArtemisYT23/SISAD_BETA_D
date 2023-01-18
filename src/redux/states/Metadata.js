import axios from "axios";
import { DocumentServer } from "../../config/axios";

const initialState = {
    MetadataCabinet: [],
    SelectedMetadata: "",
    isLoadingMetadata: false,
    elementError: "",
    MetadataPreviewCreated: [],
    Metadata: [],
    metaDocument: [],
}

const GET_ALL_METADATA_BYCABINET = "GET_ALL_METADATA_BYCABINET";
const GET_ALL_METADATA_BYCABINET_ERRORS = "GET_ALL_METADATA_BYCABINET_ERRORS";
const SET_STATE_SPINNER_METADATA = "SET_STATE_SPINNER_METADATA";
const SELECTED_METADATA_CORE = "SELECTED_METADATA_CORE";
const SELECTED_ERRORS_METADATA = "SELECTED_ERRORS_METADATA";
const CLEAR_SELECTED_METADATA = "CLEAR_SELECTED_METADATA";
const CHANGE_METADATA_PREVIUS_CREATED = "CHANGE_METADATA_PREVIUS_CREATED";
const CLEAR_METADATA_PREVIUS_CREATED = "CLEAR_METADATA_PREVIUS_CREATED";

const GET_ALL_METADATA = "GET_ALL_METADATA";
const GET_ALL_METADATA_ERRORS = "GET_ALL_METADATA_ERRORS";
const SET_FILTER_METADATA_BY_DOCUMENT = "SET_FILTER_METADATA_BY_DOCUMENT";
const CHANGE_METADATA_UPDATE_DATA = "CHANGE_METADATA_UPDATE_DATA";

export default function MetadataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_METADATA_BYCABINET:
        case GET_ALL_METADATA_BYCABINET_ERRORS:
        case SET_STATE_SPINNER_METADATA:
        case SELECTED_METADATA_CORE:
        case SELECTED_ERRORS_METADATA:
        case CLEAR_SELECTED_METADATA:
        case CHANGE_METADATA_PREVIUS_CREATED:
        case CLEAR_METADATA_PREVIUS_CREATED:

        case CHANGE_METADATA_UPDATE_DATA:
        case GET_ALL_METADATA:
        case GET_ALL_METADATA_ERRORS:
        case SET_FILTER_METADATA_BY_DOCUMENT:
            return action.payload;
        default:
            return state;
    }
};

//traer metadata por gabinete
export const getMetadataByCabinet = (cabinetId) => async (dispatch, getState) => {
    const { metaCore, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setSpinnerMetadataByCabinet(true));
    try {
        const response = await axios({
            url: `${DocumentServer}metadatabycabinet/${cabinetId}`,
            headers: {
                Authorization: `Bearer ${TockenUser}`
            }
        });
        console.log(response.status);
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_METADATA_BYCABINET,
                payload: { ...metaCore, MetadataCabinet: response.data }
            });
            dispatch(setMetadataAllDocument());
            dispatch(setSpinnerMetadataByCabinet(false));
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_METADATA_BYCABINET_ERRORS,
            payload: { ...metaCore, MetadataCabinet: [] },
        });
        dispatch(setSpinnerMetadataByCabinet(false));
    }
}

//traer todas las metadatas
export const setMetadataAllDocument = () => async (dispatch, getState) => {
    const { metaCore, sesion } = getState();
    const { TockenUser } = sesion;
    try {
        const response = await axios({
            url: `${DocumentServer}metadata`,
            headers: {
                Authorization: `Bearer ${TockenUser}`
            }
        });
        console.log(response.status);
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_METADATA,
                payload: { ...metaCore, Metadata: response.data }
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_METADATA_ERRORS,
            payload: { ...metaCore, Metadata: [] },
        });
    }
}

//Spinner para traerla con el gabinete (vista consolidada de metadata)
export const setSpinnerMetadataByCabinet = (bool) => async (dispatch, getState) => {
    const { metaCore } = getState();
    dispatch({
        type: SET_STATE_SPINNER_METADATA,
        payload: { ...metaCore, isLoadingMetadata: bool }
    })
}

//filtrar metadata seleccionada 
export const setSelectedMetadataDocument = (documentId) => async (dispatch, getState) => {
    const { metaCore } = getState();
    const { MetadataCabinet } = metaCore;
    const SelectedMetadata = MetadataCabinet.find(MetadataCabinet => MetadataCabinet.documentId == documentId);

    if (SelectedMetadata == undefined) {
        dispatch({
            type: SELECTED_ERRORS_METADATA,
            payload: { ...metaCore, elementError: "El Id no existe" },
        });
        return;
    }

    dispatch({
        type: SELECTED_METADATA_CORE,
        payload: { ...metaCore, SelectedMetadata },
    });
};

//filtrar metadata por codigo de documento para actualizacion
export const setFilterMetadataByDocument = (documentId) => async (dispatch, getState) => {
    const { metaCore } = getState();
    const { Metadata } = metaCore;
    dispatch({
        type: SET_FILTER_METADATA_BY_DOCUMENT,
        payload: { ...metaCore, metaDocument: Metadata.filter(Metadata => Metadata.documentId == documentId) },
    })
}

//limpiar estado de metadata seleccionada
export const setClearMetadataSelected = () => async (dispatch, getState) => {
    const { metaCore } = getState();
    dispatch({
        type: CLEAR_SELECTED_METADATA,
        payload: { ...metaCore, SelectedMetadata: "", metaDocument: [] }
    })
}

//llenar datos previos de creacion de metadata con el listado de datos corespondientes
export const setChangeMetadataCreatedPreview = (metaPreview) => async (dispatch, getState) => {
    const { metaCore } = getState();
    dispatch({
        type: CHANGE_METADATA_PREVIUS_CREATED,
        payload: { ...metaCore, MetadataPreviewCreated: metaPreview }
    })
}

//llenar datos de actualizacion de values para metadata 
export const setChangeMetadataUpdate = (metaPreview) => async (dispatch, getState) => {
    const { metaCore } = getState();
    dispatch({
        type: CHANGE_METADATA_UPDATE_DATA,
        payload: { ...metaCore, metaDocument: metaPreview }
    })
}


//limpiar datos previos de creacion de metadata con el listado de datos corespondientes
export const setClearMetadataCreatedPreview = () => async (dispatch, getState) => {
    const { metaCore } = getState();
    dispatch({
        type: CLEAR_METADATA_PREVIUS_CREATED,
        payload: { ...metaCore, MetadataPreviewCreated: [] }
    })
}