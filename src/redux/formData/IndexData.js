import { v4 as uuidv4 } from "uuid";

const initialState = {
    //creacion
    id: uuidv4(),
    name: "",
    description: "",
    cabinetName: "",
    dataTypeName: null,
    listName: null,
    required: false,
    unique: false,
    minValue: 0,
    maxValue: 0,
    xmlReference: null,
    //actualizacion 
    idUpdate: "",
    nameUpdate: "",
    descriptionUpdate: "",
    position: "",
    dataTypeIdUpdate: "",
    listIdUpdate: "",
    requiredUpdate: false,
    uniqueUpdate: false,
    minValueUpdate: "",
    maxValueUpdate: "",
    xmlReferenceUpdate: ""
};

const GET_NAME_INDEX_DATA = "GET_NAME_INDEX_DATA";
const GET_DESCRIPTION_INDEX_DATA = "GET_DESCRIPTION_INDEX_DATA";
const GET_CABINETNAME_INDEX_DATA = "GET_CABINETNAME_INDEX_DATA";
const GET_DATATYPE_INDEX_NEW = "GET_DATATYPE_INDEX_NEW";
const GET_DATATYPE_NULL_CABINET_DATA = "GET_DATATYPE_NULL_CABINET_DATA";
const GET_LISTNAME_INDEX_NEW = "GET_LISTNAME_INDEX_NEW";
const GET_LISTNAME_NULL_CABINET_DATA = "GET_LISTNAME_NULL_CABINET_DATA";
const GET_REQUIRED_INDEX_NEW = "GET_REQUIRED_INDEX_NEW";
const GET_UNIQUE_INDEX_NEW = "GET_UNIQUE_INDEX_NEW";
const GET_MINVALUE_INDEX_NEW = "GET_MINVALUE_INDEX_NEW";
const GET_MAXVALUE_INDEX_NEW = "GET_MAXVALUE_INDEX_NEW";
const GET_REFERENCE_INDEX_NEW = "GET_REFERENCE_INDEX_NEW";
const SET_CLEARDATA_INDEX_NEW = "SET_CLEARDATA_INDEX_NEW";
//actualizacion de datos para indice 
const ID_UPDATE_DATA_INDEX = "ID_UPDATE_DATA_INDEX";
const NAME_UPDATE_DATA_INDEX = "NAME_UPDATE_DATA_INDEX";
const DESCRIPTION_UPDATE_DATA_INDEX = "DESCRIPTION_UPDATE_DATA_INDEX";
const POSITION_UPDATE_DATA_INDEX = "POSITION_UPDATE_DATA_INDEX";
const DATATYPEID_UPDATE_DATA_INDEX = "DATATYPEID_UPDATE_DATA_INDEX";
const LISTID_UPDATE_DATA_INDEX = "LISTID_UPDATE_DATA_INDEX";
const REQUIRED_UPDATE_DATA_INDEX = "REQUIRED_UPDATE_DATA_INDEX";
const UNIQUE_UPDATE_DATA_INDEX = "UNIQUE_UPDATE_DATA_INDEX";
const MINVALUE_UPDATE_DATA_INDEX = "MINVALUE_UPDATE_DATA_INDEX";
const MAXVALUE_UPDATE_DATA_INDEX = "MAXVALUE_UPDATE_DATA_INDEX";
const XMLREFERENCE_UPDATE_DATA_INDEX = "XMLREFERENCE_UPDATE_DATA_INDEX";
const CLEAR_UPDATE_DATA_INDEX = "CLEAR_UPDATE_DATA_INDEX";

export default function IndexDataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NAME_INDEX_DATA:
        case GET_DESCRIPTION_INDEX_DATA:
        case GET_CABINETNAME_INDEX_DATA:
        case GET_DATATYPE_INDEX_NEW:
        case GET_DATATYPE_NULL_CABINET_DATA:
        case GET_LISTNAME_INDEX_NEW:
        case GET_LISTNAME_NULL_CABINET_DATA:
        case GET_REQUIRED_INDEX_NEW:
        case GET_UNIQUE_INDEX_NEW:
        case GET_MINVALUE_INDEX_NEW:
        case GET_MAXVALUE_INDEX_NEW:
        case GET_REFERENCE_INDEX_NEW:
        case SET_CLEARDATA_INDEX_NEW:
        //actualizacion de gabinete
        case ID_UPDATE_DATA_INDEX:
        case NAME_UPDATE_DATA_INDEX:
        case DESCRIPTION_UPDATE_DATA_INDEX:
        case POSITION_UPDATE_DATA_INDEX:
        case DATATYPEID_UPDATE_DATA_INDEX:
        case LISTID_UPDATE_DATA_INDEX:
        case REQUIRED_UPDATE_DATA_INDEX:
        case UNIQUE_UPDATE_DATA_INDEX:
        case MINVALUE_UPDATE_DATA_INDEX:
        case MAXVALUE_UPDATE_DATA_INDEX:
        case XMLREFERENCE_UPDATE_DATA_INDEX:
        case CLEAR_UPDATE_DATA_INDEX:
            return action.payload;
        default:
            return state;
    }
}

//guardar nombre de el nuevo indice
export const getNameIndexNew = (name) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: GET_NAME_INDEX_DATA,
        payload: { ...indexData, name: name }
    })
}

//guardar descripcion de nuevo indice
export const getDescriptionIndexNew = (description) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: GET_DESCRIPTION_INDEX_DATA,
        payload: { ...indexData, description: description }
    })
}

//guardar nombre de gabinete para nuevo indice
export const getNameCabinetIndexNew = (cabinetName) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: GET_CABINETNAME_INDEX_DATA,
        payload: { ...indexData, cabinetName: cabinetName }
    })
}

//guardar tipo de dato de nuevo indice
export const getDataTypeNameIndexNew = (dataTypeName) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: GET_DATATYPE_INDEX_NEW,
        payload: { ...indexData, dataTypeName: dataTypeName }
    })
}

//guardar tipo de dato null
export const getDataTypeNullCabinetNew = () => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: GET_DATATYPE_NULL_CABINET_DATA,
        payload: { ...indexData, dataTypeName: null }
    })
};

//guardar lista de dato de nuevo indice
export const getlistNameIndexNew = (listName) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: GET_LISTNAME_INDEX_NEW,
        payload: { ...indexData, listName: listName }
    })
}

//guardar lista de dato null
export const getListNameNullCabinetNew = () => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: GET_LISTNAME_NULL_CABINET_DATA,
        payload: { ...indexData, listName: null }
    })
};

//guardar si es requerido o no un indice
export const getRequiredIndexNew = (bool) => async (dispatch, getState) => {
    const { indexData } = getState();
    if (bool == "activo") {
        dispatch({
            type: GET_REQUIRED_INDEX_NEW,
            payload: { ...indexData, required: true }
        })
    }
    if (bool != "activo") {
        dispatch({
            type: GET_REQUIRED_INDEX_NEW,
            payload: { ...indexData, required: false }
        })
    }
}

//guardar si es unico o no el indice
export const getUniqueIndexNew = (bool) => async (dispatch, getState) => {
    const { indexData } = getState();
    if (bool == "activo") {
        dispatch({
            type: GET_UNIQUE_INDEX_NEW,
            payload: { ...indexData, unique: true }
        })
    }

    if (bool != "activo") {
        dispatch({
            type: GET_UNIQUE_INDEX_NEW,
            payload: { ...indexData, unique: false }
        })
    }
}

//guardar valor minimo de indice nuevo
export const getMinValueIndexNew = (minValue) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: GET_MINVALUE_INDEX_NEW,
        payload: { ...indexData, minValue: minValue }
    })
}

//guardar valor maxValue maximo de indice nuevo
export const getMaxValueIndexNew = (maxValue) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: GET_MAXVALUE_INDEX_NEW,
        payload: { ...indexData, maxValue: maxValue }
    })
};

//guardar referencia xml de indice nuevo
export const getReferenceIndexNew = (xmlReference) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: GET_REFERENCE_INDEX_NEW,
        payload: { ...indexData, xmlReference: xmlReference }
    })
}

//limpiar estado de indice nuevo creacion 
export const setClearIndexDataNew = () => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: SET_CLEARDATA_INDEX_NEW,
        payload: {
            ...indexData,
            id: uuidv4(),
            name: "",
            description: "",
            cabinetName: "",
            dataTypeName: "",
            listName: null,
            required: false,
            unique: false,
            minValue: 0,
            maxValue: 0,
            xmlReference: null
        }
    })
}



/*<--------------------ACTUALIZACION------------------------> */
//guardar id de indice a actualizar
export const setIdUpdateIndex = (id) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: ID_UPDATE_DATA_INDEX,
        payload: { ...indexData, idUpdate: id }
    })
}

//guardar name de indice a actualizar
export const setNameUpdateIndex = (name) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: NAME_UPDATE_DATA_INDEX,
        payload: { ...indexData, nameUpdate: name }
    })
}

//guardar descripcion de indice a actualizar
export const setDescriptionUpdateIndex = (description) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: DESCRIPTION_UPDATE_DATA_INDEX,
        payload: { ...indexData, descriptionUpdate: description }
    })
}

//guardar position de indice a actualizar
export const setPositionUpdateIndex = (position) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: POSITION_UPDATE_DATA_INDEX,
        payload: { ...indexData, position: position }
    })
}

//guardar dataTypeName de indice a actualizar
export const setDataTypeIdUpdateIndex = (dataTypeId) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: DATATYPEID_UPDATE_DATA_INDEX,
        payload: { ...indexData, dataTypeIdUpdate: dataTypeId }
    })
}

//guardar listName de indice a actualizar
export const setListIdUpdateIndex = (listId) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: LISTID_UPDATE_DATA_INDEX,
        payload: { ...indexData, listIdUpdate: listId }
    })
}

//guardar requiredUpdate de indice a actualizar
export const setRequiredUpdateIndexData = (bool) => async (dispatch, getState) => {
    const { indexData } = getState();
        dispatch({
            type: REQUIRED_UPDATE_DATA_INDEX,
            payload: { ...indexData, requiredUpdate: bool }
        })
}

//guardar requiredUpdate de indice a actualizar
export const setRequiredUpdateIndex = (bool) => async (dispatch, getState) => {
    const { indexData } = getState();
    if (bool == "activo" || bool == true) {
        dispatch({
            type: REQUIRED_UPDATE_DATA_INDEX,
            payload: { ...indexData, requiredUpdate: true }
        })
    }

    if (bool != "activo" || bool == false) {
        dispatch({
            type: REQUIRED_UPDATE_DATA_INDEX,
            payload: { ...indexData, requiredUpdate: false }
        })
    }
}

//guardar uniqueUpdate de indice a actualizar
export const setUniqueUpdateIndexData = (bool) => async (dispatch, getState) => {
    const { indexData } = getState();
        dispatch({
            type: UNIQUE_UPDATE_DATA_INDEX,
            payload: { ...indexData, uniqueUpdate: bool }
        })
}

//guardar uniqueUpdate de indice a actualizar
export const setUniqueUpdateIndex = (bool) => async (dispatch, getState) => {
    const { indexData } = getState();
    if (bool == "activo" || bool == true) {
        dispatch({
            type: UNIQUE_UPDATE_DATA_INDEX,
            payload: { ...indexData, uniqueUpdate: true }
        })
    }
    if (bool != "activo" || bool == false) {
        dispatch({
            type: UNIQUE_UPDATE_DATA_INDEX,
            payload: { ...indexData, uniqueUpdate: false }
        })
    }
}

//guardar minValueUpdate de indice a actualizar 
export const setMinValueUpdateIndex = (minValue) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: MINVALUE_UPDATE_DATA_INDEX,
        payload: { ...indexData, minValueUpdate: minValue }
    })
}

//guardar maxValueUpdate de indice a actualizar
export const setMaxValueUpdateIndex = (maxValue) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: MAXVALUE_UPDATE_DATA_INDEX,
        payload: { ...indexData, maxValueUpdate: maxValue }
    })
}

//guardar xmlReferenceUpdate de indice a actualizar
export const setXmlReferenceUpdateIndex = (xmlReference) => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: XMLREFERENCE_UPDATE_DATA_INDEX,
        payload: { ...indexData, xmlReferenceUpdate: xmlReference }
    })
}

//limpiar estados de actualizacion de indices
export const setClearUpdateIndex = () => async (dispatch, getState) => {
    const { indexData } = getState();
    dispatch({
        type: CLEAR_UPDATE_DATA_INDEX,
        payload: {
            ...indexData,
            idUpdate: "",
            nameUpdate: "",
            descriptionUpdate: "",
            position: "",
            dataTypeIdUpdate: "",
            listIdUpdate: "",
            requiredUpdate: false,
            uniqueUpdate: false,
            minValueUpdate: "",
            maxValueUpdate: "",
            xmlReferenceUpdate: ""
        }
    })
}
