import axios from "axios"
import { CoreServer } from "../../config/axios"
import toast, { Toaster } from "react-hot-toast";


const initialState = {
    ResourcePermision: [],
    isLoadingResource: false,
}

const GET_ALL_RESOURCE_PERMISIONS = "GET_ALL_RESOURCE_PERMISIONS";
const GET_PERMISION_ERROR_RESOURCE = "GET_PERMISION_ERROR_RESOURCE";
const SET_ACTIVE_SPINNER_RESOURCE = "SET_ACTIVE_SPINNER_RESOURCE";

export default function ResourceCoreData(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RESOURCE_PERMISIONS:
        case GET_PERMISION_ERROR_RESOURCE:
        case SET_ACTIVE_SPINNER_RESOURCE:
            return action.payload;
        default:
            return state;
    }
}

//listar todos los permisos sobre recursos
export const getAllPermisionResource = () => async (dispatch, getState) => {
    const { resourceCore, sesion } = getState();
    const { TockenUser } = sesion;
    dispatch(setActiveLoadingSpinnerResource(true));
    axios({
        url: `${CoreServer}permissions`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_RESOURCE_PERMISIONS,
                payload: {
                    ...resourceCore, ResourcePermision: response.data
                }
            })
            dispatch(setActiveLoadingSpinnerResource(false));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_PERMISION_ERROR_RESOURCE,
            payload: { ...resourceCore, ResourcePermision: [] }
        })
        dispatch(setActiveLoadingSpinnerResource(false));
    });
}

//Carga de Spinner para permisos de recursos
export const setActiveLoadingSpinnerResource = (bool) => async (dispatch, getState) => {
    const { resourceCore } = getState();
    dispatch({
        type: SET_ACTIVE_SPINNER_RESOURCE,
        payload: { ...resourceCore, isLoadingResource: bool }
    })
}



/*<------------------CRUD DE PERMISOS DE RECURSOS------------------> */
//CREAR NUEVO PERMISOS DE RECURSOS
export const createdPermissionCabinet = (infoResource) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}permissions`,
        method: "PUT",
        data: infoResource,
        headers: {
            'Content-Type': "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        console.log(response.data);
        console.log(response.status);
        if (response.status == 200) {
            toast.success("Accesos de Gabinetes Creado");
            dispatch(getAllPermisionResource());
        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Accesos de Gabinetes No Creado')
    })
}

//Actualizar permisos de Recursos
export const updatePermissionCabinet = (updateData) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}updatepermissions`,
        method: "PUT",
        data: updateData,
        headers: {
            'Content-Type': "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            toast.success("Accesos de Gabinetes Actualizados");
            dispatch(getAllPermisionResource());
        }
    }).catch(function (error) {
        console.log(error)
        toast.error("Accesos de No Actualizados");
    })
}

//Eliminar permisos de Recursos
export const deletePermissionCabinet = (userId) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}permissionsdeletebyuser/${userId}`,
        method: "DELETE",
        headers: {
            'Content-Type': "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        console.log(response.data);
        console.log(response.status);
        if (response.status == 200) {
            dispatch(getAllPermisionResource());
            toast.success("Accesos Eliminados");
        }
    }).catch(function (error) {
        console.log(error)
        toast.error('Accesos No Eliminados')
    })
}

