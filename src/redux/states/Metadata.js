import axios from "axios";
import { DocumentServer } from "../../config/axios";

const initialState = {
    MetadataCabinet: [],
    SelectedMetadata: "",
    isLoadingMetadata: false,
    elementError: "",
}

const GET_ALL_METADATA_BYCABINET = "GET_ALL_METADATA_BYCABINET";
const GET_ALL_METADATA_BYCABINET_ERRORS = "GET_ALL_METADATA_BYCABINET_ERRORS";
const SET_STATE_SPINNER_METADATA = "SET_STATE_SPINNER_METADATA";
const SELECTED_METADATA_CORE = "SELECTED_METADATA_CORE";
const SELECTED_ERRORS_METADATA = "SELECTED_ERRORS_METADATA";
const CLEAR_SELECTED_METADATA = "CLEAR_SELECTED_METADATA";

export default function MetadataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_METADATA_BYCABINET:
        case GET_ALL_METADATA_BYCABINET_ERRORS:
        case SET_STATE_SPINNER_METADATA:
        case SELECTED_METADATA_CORE:
        case SELECTED_ERRORS_METADATA:
        case CLEAR_SELECTED_METADATA:
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
                Authorization: `Bearer ${TockenUser?.token}`
            }
        });
        console.log(response.status);
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_METADATA_BYCABINET,
                payload: { ...metaCore, MetadataCabinet: response.data }
            });
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

//limpiar estado de metadata seleccionada
export const setClearMetadataSelected = () => async (dispatch, getState) => {
    const { metaCore } = getState();
    dispatch({
        type: CLEAR_SELECTED_METADATA,
        payload: { ...metaCore, SelectedMetadata: "" }
    })
}