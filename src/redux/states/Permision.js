import axios from "axios";
import { SecurityServer } from "../../config/axios";
import toast, { Toaster } from "react-hot-toast";
import { setfilterProfileSelected } from "./Profile";
import { setOpenModalProfileUpdate, setOpenModalProfileDelete } from "./ActionSecurity";

const initialState = {
    permissions: [
        {
            "id": "b3ef0c9a-36b2-4321-bcab-1e1baab84c62",
            "name": "Agregar Gabinete",
            "type": "Cabinet"
        },
        {
            "id": "c68199a3-ac02-4e48-a450-267b88305d29",
            "name": "Consultar Gabinete",
            "type": "Cabinet"
        },
        {
            "id": "cbe06d40-a3b3-4fcd-9911-a77ed49f2bef",
            "name": "Editar Gabinete",
            "type": "Cabinet"
        },
        {
            "id": "ec787f45-252d-4283-8925-495e95637da4",
            "name": "Eliminar Gabinete",
            "type": "Cabinet"
        },
        {
            "id": "7101bf53-836f-4d7a-9612-319b5b7d8f6f",
            "name": "Restaurar Gabinete",
            "type": "Cabinet"
        },
        {
            "id": "6f1d53b6-bb62-4ffd-9374-f17412fc186c",
            "name": "Agregar Carpeta",
            "type": "Folder"
        },
        {
            "id": "004d42be-67c8-48a4-9898-2778a6d89e4b",
            "name": "Consultar Carpeta",
            "type": "Folder"
        },
        {
            "id": "64de8e7a-f2f7-426f-832a-3806e7e2435a",
            "name": "Editar Carpeta",
            "type": "Folder"
        },
        {
            "id": "9d2e1137-e005-4918-928e-908853e89eb7",
            "name": "Eliminar Carpeta",
            "type": "Folder"
        },
        {
            "id": "ccd4035a-bea2-4c41-bcea-0e3781060383",
            "name": "Restaurar Carpeta",
            "type": "Folder"
        },
        {
            "id": "5a44e136-37a2-465c-9bbe-567cec11ed3b",
            "name": "Agregar Grupo Gabinete",
            "type": "Group"
        },
        {
            "id": "64f30c99-a08a-4b11-8213-6dc922d96d04",
            "name": "Consultar Grupo Gabinete",
            "type": "Group"
        },
        {
            "id": "03668f1b-e4bc-4c93-88d7-e1dd1708bea8",
            "name": "Editar Grupo Gabinete",
            "type": "Group"
        },
        {
            "id": "e212cfd6-99ae-414b-b260-c6d5b54bc2c7",
            "name": "Eliminar Grupo Gabinete",
            "type": "Group"
        },
        {
            "id": "237b8300-40a1-430d-ab94-9498d713ebbc",
            "name": "Restaurar Grupo Gabinete",
            "type": "Group"
        },
        {
            "id": "c62526bb-f697-4653-bc48-bcab99f0e161",
            "name": "Agregar Indices - Gabinete",
            "type": "Indexes"
        },
        {
            "id": "e8b52098-1b05-4fef-a4b5-a0834a2dea23",
            "name": "Consultar Indices - Gabinete",
            "type": "Indexes"
        },
        {
            "id": "596b7e0b-0257-4fb7-9b8f-207f1762f5fb",
            "name": "Editar Indices - Gabinete",
            "type": "Indexes"
        },
        {
            "id": "91c77238-9ecb-4e9d-a751-673639b2c18b",
            "name": "Eliminar Indices - Gabinete",
            "type": "Indexes"
        },
        {
            "id": "fb2b9bce-2cee-4b1c-bee8-676fc6ca12db",
            "name": "Restaurar Indices - Gabinete",
            "type": "Indexes"
        },
        {
            "id": "39c31170-f6f5-4810-81b1-913c33effca5",
            "name": "Agregar Listas",
            "type": "List"
        },
        {
            "id": "9de2cf76-74f4-4c2d-93f3-6fbe35dd95cc",
            "name": "Consultar Listas",
            "type": "List"
        },
        {
            "id": "24bab419-54c6-4812-a5e8-61570a11da23",
            "name": "Editar Listas",
            "type": "List"
        },
        {
            "id": "9e5eade8-b703-4a82-ac54-9bfde9740e84",
            "name": "Eliminar Listas",
            "type": "List"
        },
        {
            "id": "50dbaa2e-c93b-4042-92fd-f3cdc554c375",
            "name": "Restaurar Listas",
            "type": "List"
        },
        {
            "id": "1cd73134-053a-4579-81d1-2a50a38fb421",
            "name": "Agregar Tipos Archivos",
            "type": "FileType"
        },
        {
            "id": "67b6f8a4-dd04-4cca-873f-25441780bdda",
            "name": "Consultar Tipos Archivos",
            "type": "FileType"
        },
        {
            "id": "298bf7f5-834c-4656-8148-a23553d0d6aa",
            "name": "Editar Tipos Archivos",
            "type": "FileType"
        },
        {
            "id": "c898e691-fc3b-4439-88eb-3db1ea74e5a7",
            "name": "Eliminar Tipos Archivos",
            "type": "FileType"
        },
        {
            "id": "6c84f982-2da7-41bd-96f6-432de58c58fa",
            "name": "Restaurar Tipos Archivos",
            "type": "FileType"
        },
        {
            "id": "aa9e7942-c7f5-47b7-b06b-55577152ada8",
            "name": "Agregar Tipo de Dato",
            "type": "DataType"
        },
        {
            "id": "cf58404f-c1f6-4126-b0e1-00027e2376c6",
            "name": "Consultar Tipo de Dato",
            "type": "DataType"
        },
        {
            "id": "579d9cc6-4577-41c0-8185-3d4fdd07f085",
            "name": "Editar Tipo de Dato",
            "type": "DataType"
        },
        {
            "id": "2591b91b-7514-445c-a0b9-b4406807dc73",
            "name": "Eliminar Tipo de Dato",
            "type": "DataType"
        },
        {
            "id": "7789b7b0-96e0-4ceb-abe2-41b18e07ef35",
            "name": "Restaurar Tipo de Dato",
            "type": "DataType"
        },
        {
            "id": "d39e43f9-655f-4a10-aba4-270c3b2a417f",
            "name": "Agregar Documento",
            "type": "Documents"
        },
        {
            "id": "e15f4888-a4e4-40d7-bd87-fee72b3c9fbd",
            "name": "Consultar Documento",
            "type": "Documents"
        },
        {
            "id": "45eb67f4-07e3-42d0-bf51-41247513ba12",
            "name": "Editar Documento",
            "type": "Documents"
        },
        {
            "id": "f8ba2113-8982-4003-bd52-29dafdd87ff7",
            "name": "Eliminar Documento",
            "type": "Documents"
        },
        {
            "id": "dc3cad16-3b05-48b7-8290-01337535bab9",
            "name": "Restaurar Documento",
            "type": "Documents"
        },
        {
            "id": "bd8bf623-1ab7-42ce-bfb6-c29031659628",
            "name": "Agregar Archivo",
            "type": "Files"
        },
        {
            "id": "a9b2abb9-7eda-4245-a344-0ee9ad3e43d9",
            "name": "Consultar Archivo",
            "type": "Files"
        },
        {
            "id": "32c9bf18-20a2-421e-af8c-b76c4d37bcaf",
            "name": "Editar Archivo",
            "type": "Files"
        },
        {
            "id": "ae074d7e-e2d2-4156-8bae-53bb957ae30f",
            "name": "Eliminar Archivo",
            "type": "Files"
        },
        {
            "id": "f295aff0-69ee-4e6a-9ad3-c7d35787d41c",
            "name": "Restaurar Archivo",
            "type": "Files"
        }

    ],
    PermisionCabinet: [
        {
            "id": "b3ef0c9a-36b2-4321-bcab-1e1baab84c62",
            "name": "Agregar Gabinete",
            "type": "Cabinet"
        },
        {
            "id": "c68199a3-ac02-4e48-a450-267b88305d29",
            "name": "Consultar Gabinete",
            "type": "Cabinet"
        },
        {
            "id": "cbe06d40-a3b3-4fcd-9911-a77ed49f2bef",
            "name": "Editar Gabinete",
            "type": "Cabinet"
        },
        {
            "id": "ec787f45-252d-4283-8925-495e95637da4",
            "name": "Eliminar Gabinete",
            "type": "Cabinet"
        },
        {
            "id": "7101bf53-836f-4d7a-9612-319b5b7d8f6f",
            "name": "Restaurar Gabinete",
            "type": "Cabinet"
        },
    ],
    PermisionFolder: [
        {
            "id": "6f1d53b6-bb62-4ffd-9374-f17412fc186c",
            "name": "Agregar Carpeta",
            "type": "Folder"
        },
        {
            "id": "004d42be-67c8-48a4-9898-2778a6d89e4b",
            "name": "Consultar Carpeta",
            "type": "Folder"
        },
        {
            "id": "64de8e7a-f2f7-426f-832a-3806e7e2435a",
            "name": "Editar Carpeta",
            "type": "Folder"
        },
        {
            "id": "9d2e1137-e005-4918-928e-908853e89eb7",
            "name": "Eliminar Carpeta",
            "type": "Folder"
        },
        {
            "id": "ccd4035a-bea2-4c41-bcea-0e3781060383",
            "name": "Restaurar Carpeta",
            "type": "Folder"
        }
    ],
    PermisionGroup: [
        {
            "id": "5a44e136-37a2-465c-9bbe-567cec11ed3b",
            "name": "Agregar Grupo Gabinete",
            "type": "Group"
        },
        {
            "id": "64f30c99-a08a-4b11-8213-6dc922d96d04",
            "name": "Consultar Grupo Gabinete",
            "type": "Group"
        },
        {
            "id": "03668f1b-e4bc-4c93-88d7-e1dd1708bea8",
            "name": "Editar Grupo Gabinete",
            "type": "Group"
        },
        {
            "id": "e212cfd6-99ae-414b-b260-c6d5b54bc2c7",
            "name": "Eliminar Grupo Gabinete",
            "type": "Group"
        },
        {
            "id": "237b8300-40a1-430d-ab94-9498d713ebbc",
            "name": "Restaurar Grupo Gabinete",
            "type": "Group"
        }
    ],
    PermisionIndex: [
        {
            "id": "c62526bb-f697-4653-bc48-bcab99f0e161",
            "name": "Agregar Indices - Gabinete",
            "type": "Indexes"
        },
        {
            "id": "e8b52098-1b05-4fef-a4b5-a0834a2dea23",
            "name": "Consultar Indices - Gabinete",
            "type": "Indexes"
        },
        {
            "id": "596b7e0b-0257-4fb7-9b8f-207f1762f5fb",
            "name": "Editar Indices - Gabinete",
            "type": "Indexes"
        },
        {
            "id": "91c77238-9ecb-4e9d-a751-673639b2c18b",
            "name": "Eliminar Indices - Gabinete",
            "type": "Indexes"
        },
        {
            "id": "fb2b9bce-2cee-4b1c-bee8-676fc6ca12db",
            "name": "Restaurar Indices - Gabinete",
            "type": "Indexes"
        }
    ],
    PermisionList: [
        {
            "id": "39c31170-f6f5-4810-81b1-913c33effca5",
            "name": "Agregar Listas",
            "type": "List"
        },
        {
            "id": "9de2cf76-74f4-4c2d-93f3-6fbe35dd95cc",
            "name": "Consultar Listas",
            "type": "List"
        },
        {
            "id": "24bab419-54c6-4812-a5e8-61570a11da23",
            "name": "Editar Listas",
            "type": "List"
        },
        {
            "id": "9e5eade8-b703-4a82-ac54-9bfde9740e84",
            "name": "Eliminar Listas",
            "type": "List"
        },
        {
            "id": "50dbaa2e-c93b-4042-92fd-f3cdc554c375",
            "name": "Restaurar Listas",
            "type": "List"
        }
    ],
    PermisionTypeFile: [
        {
            "id": "1cd73134-053a-4579-81d1-2a50a38fb421",
            "name": "Agregar Tipos Archivos",
            "type": "FileType"
        },
        {
            "id": "67b6f8a4-dd04-4cca-873f-25441780bdda",
            "name": "Consultar Tipos Archivos",
            "type": "FileType"
        },
        {
            "id": "298bf7f5-834c-4656-8148-a23553d0d6aa",
            "name": "Editar Tipos Archivos",
            "type": "FileType"
        },
        {
            "id": "c898e691-fc3b-4439-88eb-3db1ea74e5a7",
            "name": "Eliminar Tipos Archivos",
            "type": "FileType"
        },
        {
            "id": "6c84f982-2da7-41bd-96f6-432de58c58fa",
            "name": "Restaurar Tipos Archivos",
            "type": "FileType"
        }
    ],
    PermisionDataType: [
        {
            "id": "aa9e7942-c7f5-47b7-b06b-55577152ada8",
            "name": "Agregar Tipo de Dato",
            "type": "DataType"
        },
        {
            "id": "cf58404f-c1f6-4126-b0e1-00027e2376c6",
            "name": "Consultar Tipo de Dato",
            "type": "DataType"
        },
        {
            "id": "579d9cc6-4577-41c0-8185-3d4fdd07f085",
            "name": "Editar Tipo de Dato",
            "type": "DataType"
        },
        {
            "id": "2591b91b-7514-445c-a0b9-b4406807dc73",
            "name": "Eliminar Tipo de Dato",
            "type": "DataType"
        },
        {
            "id": "7789b7b0-96e0-4ceb-abe2-41b18e07ef35",
            "name": "Restaurar Tipo de Dato",
            "type": "DataType"
        }
    ],
    PermisionDocument: [
        {
            "id": "d39e43f9-655f-4a10-aba4-270c3b2a417f",
            "name": "Agregar Documento",
            "type": "Documents"
        },
        {
            "id": "e15f4888-a4e4-40d7-bd87-fee72b3c9fbd",
            "name": "Consultar Documento",
            "type": "Documents"
        },
        {
            "id": "45eb67f4-07e3-42d0-bf51-41247513ba12",
            "name": "Editar Documento",
            "type": "Documents"
        },
        {
            "id": "f8ba2113-8982-4003-bd52-29dafdd87ff7",
            "name": "Eliminar Documento",
            "type": "Documents"
        },
        {
            "id": "dc3cad16-3b05-48b7-8290-01337535bab9",
            "name": "Restaurar Documento",
            "type": "Documents"
        }
    ],
    PermisionArchive: [
        {
            "id": "bd8bf623-1ab7-42ce-bfb6-c29031659628",
            "name": "Agregar Archivo",
            "type": "Files"
        },
        {
            "id": "a9b2abb9-7eda-4245-a344-0ee9ad3e43d9",
            "name": "Consultar Archivo",
            "type": "Files"
        },
        {
            "id": "32c9bf18-20a2-421e-af8c-b76c4d37bcaf",
            "name": "Editar Archivo",
            "type": "Files"
        },
        {
            "id": "ae074d7e-e2d2-4156-8bae-53bb957ae30f",
            "name": "Eliminar Archivo",
            "type": "Files"
        },
        {
            "id": "f295aff0-69ee-4e6a-9ad3-c7d35787d41c",
            "name": "Restaurar Archivo",
            "type": "Files"
        }
    ],
    PermisionFilter: [],
    PermisionProfile: [],
    ActionUserSelected: [],
    elementError: ""
}

const GET_FILTER_PERMISION_RESOURCE = "GET_FILTER_PERMISION_RESOURCE";
const CLEAR_DATA_PERMISION = "CLEAR_DATA_PERMISION";
const GET_DATA_PERMISION_PROFILE = "GET_DATA_PERMISION_PROFILE";
const GET_DATA_PERMISION_PROFILE_ERROR = "GET_DATA_PERMISION_PROFILE_ERROR";

export default function PermisionReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FILTER_PERMISION_RESOURCE:
        case CLEAR_DATA_PERMISION:
        case GET_DATA_PERMISION_PROFILE:
        case GET_DATA_PERMISION_PROFILE_ERROR:
            return action.payload;
        default:
            return state;
    }
};

//filtrar opciones de modal de permisos por referencia de nombre
export const setFilterPermision = (type) => async (dispatch, getState) => {
    const { permisionCore } = getState();
    const { permissions } = permisionCore;
    dispatch({
        type: GET_FILTER_PERMISION_RESOURCE,
        payload: {
            ...permisionCore, PermisionFilter: permissions.filter(permisions => permisions.type == type)
        },
    });
};


//traer permisos existentes para actualizar (Checkbox)
export const getProfilePermisionCore = (id) => async (dispatch, getState) => {
    const { permisionCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${SecurityServer}profile/permisions/${id}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_DATA_PERMISION_PROFILE,
                payload: { ...permisionCore, PermisionProfile: response.data },
            });
            dispatch(setfilterProfileSelected(id));
            dispatch(setOpenModalProfileUpdate(true));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_DATA_PERMISION_PROFILE_ERROR,
            payload: { ...permisionCore, PermisionProfile: [] }
        })
    })
};

//traer permisos existentes para actualizar (Checkbox)
export const getProfilePermisionCoreDelete = (id) => async (dispatch, getState) => {
    const { permisionCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${SecurityServer}profile/permisions/${id}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_DATA_PERMISION_PROFILE,
                payload: { ...permisionCore, PermisionProfile: response.data },
            });
            dispatch(setfilterProfileSelected(id));
            dispatch(setOpenModalProfileDelete(true));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_DATA_PERMISION_PROFILE_ERROR,
            payload: { ...permisionCore, PermisionProfile: [] }
        })
    })
};

//limpiar estado de opciones de permisos
export const clearPermisionCore = () => async (dispatch, getState) => {
    const { permisionCore } = getState();
    dispatch({
        type: CLEAR_DATA_PERMISION,
        payload: { ...permisionCore, PermisionFilter: [] }
    })
}