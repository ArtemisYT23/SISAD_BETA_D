import axios from "axios";
import { CoreServer } from "../../config/axios";
import { setChangeSelectView } from "./View";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
    folders: [],
    folderCabinet: [],
    SelectedFolder: "",
    SelectedUpdateFolder: "",
    isLoadingFolder: false,
    elementError: "",
};

const GET_FOLDER_CORE = "GET_FOLDER_CORE";
const GET_FOLDER_ERROR_CORE = "GET_FOLDER_ERROR_CORE";
const SET_FILTER_FOLDERS_CORE = "SET_FILTER_FOLDERS_CORE";
const SELECTED_FOLDER_CORE = "SELECTED_FOLDER_CORE";
const SELECTED_ERRORS_FOLDER_CORE = "SELECTED_ERRORS_FOLDER_CORE";
const SET_ACTIVE_SPINNER_FOLDER = "SET_ACTIVE_SPINNER_FOLDER";

export default function FolderReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FOLDER_CORE:
        case GET_FOLDER_ERROR_CORE:
        case SET_FILTER_FOLDERS_CORE:
        case SELECTED_FOLDER_CORE:
        case SELECTED_ERRORS_FOLDER_CORE:
        case SET_ACTIVE_SPINNER_FOLDER:
            return action.payload;
        default:
            return state;
    }
}

//traer todas las carpetas
export const getAllFoldersCore = () => async (dispatch, getState) => {
    const { folderCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}folder`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser?.token}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_FOLDER_CORE,
                payload: { ...folderCore, folders: response.data },
            });
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_FOLDER_ERROR_CORE,
            payload: { ...folderCore, folders: [], elementError: error }
        })
    })
};

//Carga de Spinner de Carpetas
export const setActiveLoadingSpinnerFolder = (bool) => async (dispatch, getState) => {
    const { folderCore } = getState();
    dispatch({
        type: SET_ACTIVE_SPINNER_FOLDER,
        payload: { ...folderCore, isLoadingFolder: bool }
    })
}

//filtrar carpetas por gabinetes
export const setFilterFoldersCore = (cabinetId) => async (dispatch, getState) => {
    const { folderCore } = getState();
    const { folders } = folderCore;
    dispatch({
        type: SET_FILTER_FOLDERS_CORE,
        payload: {
            ...folderCore, folderCabinet: folders.filter(folders => folders.cabinetId == cabinetId)
        },
    });
};

//Filtrar Carpeta Seleccionada global con cambio de pantalla
export const setSelectedFolderCore = (id) => async (dispatch, getState) => {
    const { folderCore } = getState();
    const { folders } = folderCore;
    const SelectedFolder = folders.find(folders => folders.id == id);

    if (SelectedFolder == undefined) {
        dispatch({
            type: SELECTED_ERRORS_FOLDER_CORE,
            payload: { ...folderCore, elementError: "El Id no existe" },
        });
        return;
    }

    dispatch({
        type: SELECTED_FOLDER_CORE,
        payload: { ...folderCore, SelectedFolder },
    });
    dispatch(setChangeSelectView("folder"));
};

//filtrar carpeta para actualizar
export const setSelectedFolderUpdateCore = (id) => async (dispatch, getState) => {
  const { folderCore } = getState();
  const { folders } = folderCore;
  const SelectedUpdateFolder = folders.find(folders => folders.id == id);

  if (SelectedUpdateFolder == undefined) {
      dispatch({
          type: SELECTED_ERRORS_FOLDER_CORE,
          payload: { ...folderCore, elementError: "El Id no existe" },
      });
      return;
  }

  dispatch({
      type: SELECTED_FOLDER_CORE,
      payload: { ...folderCore, SelectedUpdateFolder },
  });
};

/*<------------FOLDER---------------->*/
//traer todas las carpetas
export const getAllFolders = (cabinetId) => async (dispatch, getState) => {
  const { folderCore, sesion } = getState();
  const { TockenUser } = sesion;
  axios({
      url: `${CoreServer}folder`,
      method: "GET",
      headers: {
          Authorization: `Bearer ${TockenUser?.token}`
      }
  }).then(function (response) {
      if (response.status == 200) {
          dispatch({
              type: GET_FOLDER_CORE,
              payload: { ...folderCore, folders: response.data },
          });
          dispatch(setFilterFoldersCore(cabinetId));
      }
  }).catch(function (error) {
      console.log(error);
      dispatch({
          type: GET_FOLDER_ERROR_CORE,
          payload: { ...folderCore, folders: [], elementError: error }
      })
  })
};

//Guardar nueva carpeta y actualizar estado inicial
export const CreateFolderNew = (newFolder, cabinetId) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    console.log(cabinetId);
    axios({
      url: `${CoreServer}folder`,
      method: "PUT",
      data: newFolder,
      headers: {
        'Content-Type': "Application/json",
        Authorization: `Bearer ${TockenUser?.token}`
      },
    })
      .then(function (response) {
        if (response.status == 200) {
          toast.success('Carpeta Creada.');
          dispatch(getAllFolders(cabinetId));
        };
      }).catch(function (error) {
        console.log(error);
        toast.error('Carpeta no Creada.');
      })
  };
  
  
  
  //Actualizar Carpeta y actualizar estado inicial
  export const UpdateFolderCore = (newFolder, id, cabinetId) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
      url: `${CoreServer}folder/${id}`,
      method: "PUT",
      data: newFolder,
      headers: {
        'Content-Type': "Application/json",
        Authorization: `Bearer ${TockenUser?.token}`
      },
    })
      .then(function (response) {
        if (response.status == 200) {
          toast.success('Carpeta Actualizada.');
          dispatch(getAllFolders(cabinetId));
        };
      }).catch(function (error) {
        console.log(error);
        toast.error('Carpetas no Actualizado.');
      })
  };
  
  //Eliminar Carpeta y actualizar estado inicial
  export const DeleteFolderCore = (newFolder, id, cabinetId) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
      url: `${CoreServer}folder/${id}`,
      method: "DELETE",
      data: newFolder,
      headers: {
        'Content-Type': "Application/json",
        Authorization: `Bearer ${TockenUser?.token}`
      },
    })
      .then(function (response) {
        if (response.status == 200) {
          toast.success('Carpeta Eliminada.');
          dispatch(getAllFolders(cabinetId));
        };
      }).catch(function (error) {
        console.log(error);
        toast.error('Carpeta no Eliminada.');
      })
  };
  