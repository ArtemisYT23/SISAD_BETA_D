const initialState = {
    OptionCabinet: [
        {
            "optionId": "314E90CC-7F66-4D13-80ED-509C0B82283C",
            "optionName": "Create Cabinet"
        },
        {
            "optionId": "773D4ABB-5E1B-46A7-9320-0DDD164E1EF2",
            "optionName": "Get Cabinets"
        },
        {
            "optionId": "1F69E2C7-D7AB-42C5-90AC-40A541B8C9F3",
            "optionName": "Update Cabinet"
        },
        {
            "optionId": "F9DB0E9E-E89E-4B5E-A83E-2B638CEED35C",
            "optionName": "Delete Cabinet"
        },
        {
            "optionId": "7A474A4A-00D7-4CC6-AAA4-D2DE8E7D6392",
            "optionName": "Get By Id Cabinet"
        },
        {
            "optionId": "62AD8455-81AC-4FB4-81FE-CE1566201308",
            "optionName": "Restore Cabinet"
        },
        {
            "optionId": "8f561a2d-e93d-452a-a70a-fae7f657ca19",
            "optionName": "Get Deleted Cabinets"
        },
        {
            "optionId": "67429712-7657-4518-a43d-71ffb5d5f917",
            "optionName": "Get By Name Cabinet"
        },
        {
            "optionId": "354064af-efdc-4898-8980-f371ca0b2222",
            "optionName": "Get By Text Cabinet"
        }
    ],
    OptionFolder: [
        {
            "optionId": "fe8a04d3-3439-4253-81c2-17aec2474db0",
            "optionName": "Create Folder"
        },
        {
            "optionId": "a40befed-ea85-4ea9-8e5d-2f6cbb6836f2",
            "optionName": "Get Folders"
        },
        {
            "optionId": "d450654d-f61b-4896-a1c2-0c66897af0e8",
            "optionName": "Get By Text Folder"
        },
        {
            "optionId": "9fa510d8-0822-4a73-92b3-84d4248fe686",
            "optionName": "Get By User Folders"
        },
        {
            "optionId": "fef99dcc-72bc-4fbb-830e-8ed50569e77d",
            "optionName": "Get By Cabinet Folders"
        },
        {
            "optionId": "39489517-d6c9-4229-a1cb-ec574d40d963",
            "optionName": "Get By Id Folder"
        },
        {
            "optionId": "08D51E45-9699-4955-BD8C-C111BAC8A0F4",
            "optionName": "Update Folder"
        },
        {
            "optionId": "0959912c-700e-484a-beab-147de142448f",
            "optionName": "Delete Folder"
        },
        {
            "optionId": "e3cb7b38-4ff1-4ad9-9fe6-2279009c1dd1",
            "optionName": "Restore Folder"
        },
        {
            "optionId": "b01bd69a-65b7-447f-a4a9-577f20876cc9",
            "optionName": "Get Deleted Folders"
        }
    ],
    userSelected: "",
    cabinetSelected: "",
    CabinetFolder: [],
    elementError: ""
}

const SET_USER_SELECTED_RESOURCE = "SET_USER_SELECTED_RESOURCE";
const SET_USER_SELECTED_RESOURCE_ERROR = "SET_USER_SELECTED_RESOURCE_ERROR";
const SET_CABINET_SELECTED_RESOURCE = "SET_CABINET_SELECTED_RESOURCE";
const SET_CABINET_SELECTED_RESOURCE_ERROR = "SET_CABINET_SELECTED_RESOURCE_ERROR";
const SET_FILTER_FOLDERS_RESOURCE = "SET_FILTER_FOLDERS_RESOURCE";
const CLEAR_DATA_SESION_CLOSE = "CLEAR_DATA_SESION_CLOSE";


export default function OptionResourceReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_SELECTED_RESOURCE:
        case SET_USER_SELECTED_RESOURCE_ERROR:
        case SET_CABINET_SELECTED_RESOURCE:
        case SET_CABINET_SELECTED_RESOURCE_ERROR:
        case SET_FILTER_FOLDERS_RESOURCE:
        case CLEAR_DATA_SESION_CLOSE:
            return action.payload;
        default:
            return state;
    }
};


//filtrar usuario Seleccionado para asignacion de Recursos
export const setUserSelectedResource = (id) => async (dispatch, getState) => {
    const { optionCore, userCore } = getState();
    const { UserList } = userCore;
    const userSelected = UserList.find(UserList => UserList.id == id);

    if (userSelected == undefined) {
        dispatch({
            type: SET_USER_SELECTED_RESOURCE_ERROR,
            payload: { ...optionCore, elementError: "El id no existe" }
        });
        return;
    }

    dispatch({
        type: SET_USER_SELECTED_RESOURCE,
        payload: { ...optionCore, userSelected }
    })
}

//filtrar gabinete seleccionado para asignacion de recursos
export const setCabinetSelectedResource = (id) => async (dispatch, getState) => {
    const { optionCore, cabinetCore } = getState();
    const { cabinets } = cabinetCore;
    const cabinetSelected = cabinets.find(cabinets => cabinets.id == id);

    if (cabinetSelected == undefined) {
        dispatch({
            type: SET_CABINET_SELECTED_RESOURCE_ERROR,
            payload: { ...optionCore, elementError: "El id no existe"}
        });
        return;
    }

    dispatch({
        type: SET_CABINET_SELECTED_RESOURCE,
        payload: { ...optionCore, cabinetSelected }
    })
    dispatch(setFilterFoldersResource(id));
}

//filtrar carpetas por gabinetes
export const setFilterFoldersResource = (cabinetId) => async (dispatch, getState) => {
    const { optionCore, folderCore } = getState();
    const { folders } = folderCore;
    dispatch({
      type: SET_FILTER_FOLDERS_RESOURCE,
      payload: {
        ...optionCore, CabinetFolder: folders.filter(folders => folders.cabinetId == cabinetId)
      },
    });
  };



//limpiar estados de Resource
export const clearInitialStateReducer = () => async (dispatch, getState) => {
    const { optionCore } = getState();
    dispatch({
        type: CLEAR_DATA_SESION_CLOSE,
        payload: { ...optionCore, elementError: "" }
    })
}