const initialState = {
    UserCreated: false,
    UserUpdate: false,
    UserDelete: false,
    //profile
    ProfileCreated: false,
    ProfileUpdate: false,
    ProfileDelete: false,
    //Recursos
    ResourceCreated: false,
    ResourceCreatedFolder: false,
    ResourceUpdate: false,
    ResourceDelete: false,
    //Reset Password
    TockenResetModal: false,

}

const OPEN_MODAL_CREATED_USER_DOCU = "OPEN_MODAL_CREATED_USER_DOCU";
const OPEN_MODAL_UPDATE_USER_DOCU = "OPEN_MODAL_UPDATE_USER_DOCU";
const OPEN_MODAL_DELETE_USER_DOCU = "OPEN_MODAL_DELETE_USER_DOCU";
//perfiles
const OPEN_MODAL_PROFILE_CREATED = "OPEN_MODAL_PROFILE_CREATED";
const OPEN_MODAL_PROFILE_UPDATE = "OPEN_MODAL_PROFILE_UPDATE";
const OPEN_MODAL_PROFILE_DELETE = "OPEN_MODAL_PROFILE_DELETE";
//recursos
const OPEN_MODAL_RESOURCE_CREATED = "OPEN_MODAL_RESOURCE_CREATED";

const OPEN_MODAL_RESOURCE_UPDATE = "OPEN_MODAL_RESOURCE_UPDATE";
const OPEN_MODAL_RESOURCE_UPDATE_FOLDER = "OPEN_MODAL_RESOURCE_UPDATE_FOLDER";
const OPEN_MODAL_RESOURCE_DELETE = "OPEN_MODAL_RESOURCE_DELETE";
//Reset de password
const OPEN_MODAL_RESET_PASSWORD = "OPEN_MODAL_RESET_PASSWORD";

export default function ModalSecurityReducer(state = initialState, action) {
    switch (action.type) {
        //crud de usuarios
        case OPEN_MODAL_CREATED_USER_DOCU:
        case OPEN_MODAL_UPDATE_USER_DOCU:
        case OPEN_MODAL_DELETE_USER_DOCU:
        //perfiles
        case OPEN_MODAL_PROFILE_CREATED:
        case OPEN_MODAL_PROFILE_UPDATE:
        case OPEN_MODAL_PROFILE_DELETE:
        //recursos
        case OPEN_MODAL_RESOURCE_CREATED:
        case OPEN_MODAL_RESOURCE_UPDATE:
        case OPEN_MODAL_RESOURCE_UPDATE_FOLDER:
        case OPEN_MODAL_RESOURCE_DELETE:
        //reset de password
        case OPEN_MODAL_RESET_PASSWORD:
            return action.payload;
        default:
            return state;
    }
};

/*<-------------CRUD DE USUARIOS--------------->*/
//creacion de usuarios 
export const setOpenModalCreatedUser = (bool) => async (dispatch, getState) => {
    const { modalSecurity } = getState();
    dispatch({
        type: OPEN_MODAL_CREATED_USER_DOCU,
        payload: { ...modalSecurity, UserCreated: bool }
    })
}

//actualizacion de usuarios
export const setOpenModalUpdateUser = (bool) => async (dispatch, getState) => {
    const { modalSecurity } = getState();
    dispatch({
        type: OPEN_MODAL_UPDATE_USER_DOCU,
        payload: { ...modalSecurity, UserUpdate: bool }
    })
}

//eliminacion de usuarios
export const setOpenModalDeleteUser = (bool) => async (dispatch, getState) => {
    const { modalSecurity } = getState();
    dispatch({
        type: OPEN_MODAL_DELETE_USER_DOCU,
        payload: { ...modalSecurity, UserDelete: bool }
    })
}

/*<-----------------CRUD DE PERFILES--------------->*/
//creacion de perfil
export const openModalProfileCreated = (bool) => async (dispatch, getState) => {
    const { modalSecurity } = getState();
    dispatch({
        type: OPEN_MODAL_PROFILE_CREATED,
        payload: { ...modalSecurity, ProfileCreated: bool }
    })
}

//actualizacion de perfiles 
export const setOpenModalProfileUpdate = (bool) => async (dispatch, getState) => {
    const { modalSecurity } = getState();
    dispatch({
        type: OPEN_MODAL_PROFILE_UPDATE,
        payload: { ...modalSecurity, ProfileUpdate: bool }
    })
}

//eliminacion de perfiles
export const setOpenModalProfileDelete = (bool) => async (dispatch, getState) => {
    const { modalSecurity } = getState();
    dispatch({
        type: OPEN_MODAL_PROFILE_DELETE,
        payload: { ...modalSecurity, ProfileDelete: bool }
    })
}

/*<-------------------CRUD DE RECURSOS----------------->*/
//creacion de recursos
export const setOpenModalCreatedResource = (bool) => async (dispatch, getState) => {
    const { modalSecurity } = getState();
    dispatch({
        type: OPEN_MODAL_RESOURCE_CREATED,
        payload: { ...modalSecurity, ResourceCreated: bool }
    })
}

//actualizacion de recursos
export const setOpenModalUpdateResource = (bool) => async (dispatch, getState) => {
    const { modalSecurity } = getState();
    dispatch({
        type: OPEN_MODAL_RESOURCE_UPDATE,
        payload: { ...modalSecurity, ResourceUpdate: bool }
    })
};


//actualizacion de recurso para carpeta
export const setOpenModalUpdateResourceFolder = (bool) => async (dispatch, getState) => {
    const { modalSecurity } = getState();
    dispatch({
        type: OPEN_MODAL_RESOURCE_UPDATE_FOLDER,
        payload: { ...modalSecurity, ResourceUpdateFolder: bool }
    })
};


//eliminacion de recursos
export const setOpenModalDeleteResource = (bool) => async (dispatch, getState) => {
    const { modalSecurity } = getState();
    dispatch({
        type: OPEN_MODAL_RESOURCE_DELETE,
        payload: { ...modalSecurity, ResourceDelete: bool }
    })
}

/*<------------RECUPERACION DE CONTRA-------------->*/

export const setOpenModalRecuperationPassword = (bool) => async (dispatch, getState) => {
    const { modalSecurity } = getState();
    dispatch({
        type: OPEN_MODAL_RESET_PASSWORD,
        payload: { ...modalSecurity, TockenResetModal: bool }
    })
}