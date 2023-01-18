const initialState = {
    nameFile: true,
    descriptionFile: false,
    fileTypeFile: false,
    text: "",
    fileTypeId: [],
};

const GET_NAMEFILE_DATA = "GET_NAMEFILE_DATA";
const GET_DESCRIPTIONFILE_DATA = "GET_DESCRIPTIONFILE_DATA";
const GET_TEXTFILE_DATA = "GET_TEXTFILE_DATA";
const GET_FILETYPE_FILE_DATA = "GET_FILETYPE_FILE_DATA";
const GET_FILETYPE_SELECTED_DATA = "GET_FILETYPE_SELECTED_DATA";
const CLEAR_FILTER_FILE_FILETYPE = "CLEAR_FILTER_FILE_FILETYPE";

export default function FilterReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NAMEFILE_DATA:
        case GET_DESCRIPTIONFILE_DATA:
        case GET_TEXTFILE_DATA:
        case GET_FILETYPE_FILE_DATA:
        case GET_FILETYPE_SELECTED_DATA:
        case CLEAR_FILTER_FILE_FILETYPE:
            return action.payload;
        default:
            return state;
    }
}

//guardar estado booleano para nombre de archivo
export const getStateNameFile = (bool) => async (dispatch, getState) => {
    const { filterData } = getState();
    dispatch({
        type: GET_NAMEFILE_DATA,
        payload: { ...filterData, nameFile: true, descriptionFile: false }
    })
};

//guardar estado booleano para description de archivo
export const getStateDescriptionFile = (bool) => async (dispatch, getState) => {
    const { filterData } = getState();
    dispatch({
        type: GET_DESCRIPTIONFILE_DATA,
        payload: { ...filterData, descriptionFile: true, nameFile: false }
    })
};

export const getFileTypeFile = (bool) => async (dispatch, getState) => {
    const { filterData } = getState();
    dispatch({
        type: GET_FILETYPE_FILE_DATA,
        payload: { ...filterData, fileTypeFile: bool }
    })
}

//guardar texto de referencia de busqueda
export const getTextFileAll = (data) => async (dispatch, getState) => {
    const { filterData } = getState();
    dispatch({
        type: GET_TEXTFILE_DATA,
        payload: { ...filterData, text: data }
    })
}

//guardar array de id de tipos de archivos seleccionados
export const getFileTypeSelectionData = (fileType) => async (dispatch, getState) => {
    const { filterData } = getState();
    dispatch({
        type: GET_FILETYPE_SELECTED_DATA,
        payload: { ...filterData, fileTypeId: fileType }
    })
}

//limpiar estados de busqueda con filtros
export const clearDataFilesFilterFileType = () => async (dispatch, getState) => {
    const { filterData } = getState();
    dispatch({
        type: CLEAR_FILTER_FILE_FILETYPE,
        payload: {
            ...filterData,
            nameFile: false,
            descriptionFile: false,
            text: "",
            fileTypeId: [],
        }
    })
}

