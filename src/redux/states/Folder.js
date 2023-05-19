import axios from "axios";
import { CoreServer } from "../../config/axios";
import { setChangeSelectView } from "./View";
import { getAllDeleteFolderRestored } from "../formData/ResourceData";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  folders: [],
  folderCabinet: [],
  folderByFolder: [],
  SelectedFolder: "",
  SelectedFolderChild: "",
  SelectedFolderMeta: "",
  SelectedUpdateFolder: "",
  isLoadingFolder: false,
  SearchFolder: [],
  isLoadingSearchFolder: false,
  elementError: "",
};

const GET_FOLDER_CORE = "GET_FOLDER_CORE";
const GET_FOLDER_ERROR_CORE = "GET_FOLDER_ERROR_CORE";
const SET_FILTER_FOLDERS_CORE = "SET_FILTER_FOLDERS_CORE";
const SET_FILTER_FOLDERS_CHILD_CORE = "SET_FILTER_FOLDERS_CHILD_CORE";
const SELECTED_FOLDER_CORE = "SELECTED_FOLDER_CORE";
const SELECTED_ERRORS_FOLDER_CORE = "SELECTED_ERRORS_FOLDER_CORE";
const SET_ACTIVE_SPINNER_FOLDER = "SET_ACTIVE_SPINNER_FOLDER";
const GET_ALL_FOLDERS_NAME_DATA_CORE = "GET_ALL_FOLDERS_NAME_DATA_CORE";
const GET_ALL_FOLDERS_NAME_DATA_ERRORS_CORE = "GET_ALL_FOLDERS_NAME_DATA_ERRORS_CORE";
const SET_ACTIVE_SPINNER_SEARCH_FOLDER = "SET_ACTIVE_SPINNER_SEARCH_FOLDER";
const CLEAR_DATA_FOLDER_SESION = "CLEAR_DATA_FOLDER_SESION";
const CLEAR_SELECTED_FOLDER_META = "CLEAR_SELECTED_FOLDER_META";
const CLEAR_SELECTED_FOLDER_CABINET = "CLEAR_SELECTED_FOLDER_CABINET";
const ORDER_FOLDER_BY_ASC_CORE = "ORDER_FOLDER_BY_ASC_CORE";
const GET_FOLDER_CHILD_CORE = "GET_FOLDER_CHILD_CORE";
const GET_FOLDER_CHILD_ERROR_CORE = "GET_FOLDER_CHILD_ERROR_CORE";
const SELECTED_FOLDER_CHILD_CORE = "SELECTED_FOLDER_CHILD_CORE";
const SELECTED_ERRORS_FOLDER_CHILD_CORE = "SELECTED_ERRORS_FOLDER_CHILD_CORE";
const CLEAR_DATA_FOLDER_CHILDREN = "CLEAR_DATA_FOLDER_CHILDREN";

export default function FolderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOLDER_CORE:
    case GET_FOLDER_ERROR_CORE:
    case SET_FILTER_FOLDERS_CORE:
    case SET_FILTER_FOLDERS_CHILD_CORE:
    case SELECTED_FOLDER_CORE:
    case SELECTED_ERRORS_FOLDER_CORE:
    case SET_ACTIVE_SPINNER_FOLDER:
    case GET_ALL_FOLDERS_NAME_DATA_CORE:
    case GET_ALL_FOLDERS_NAME_DATA_ERRORS_CORE:
    case SET_ACTIVE_SPINNER_SEARCH_FOLDER:
    case CLEAR_DATA_FOLDER_SESION:
    case CLEAR_SELECTED_FOLDER_META:
    case CLEAR_SELECTED_FOLDER_CABINET:
    case ORDER_FOLDER_BY_ASC_CORE:
    case GET_FOLDER_CHILD_CORE:
    case GET_FOLDER_CHILD_ERROR_CORE:
    case SELECTED_FOLDER_CHILD_CORE:
    case SELECTED_ERRORS_FOLDER_CHILD_CORE:
    case CLEAR_DATA_FOLDER_CHILDREN:
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
      Authorization: `Bearer ${TockenUser}`
    }
  }).then(function (response) {
    if (response.status == 200) {
      dispatch({
        type: GET_FOLDER_CORE,
        payload: { ...folderCore, folders: response.data },
      });
      dispatch(orderFolderByAscCore());
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

  const folderValidate = folders.filter(folder => folder.folderId == null);
  const folderFinal = folderValidate.filter(folders => folders.cabinetId == cabinetId)
  dispatch({
    type: SET_FILTER_FOLDERS_CORE,
    payload: {
      ...folderCore, folderCabinet: folderFinal
    },
  });
};

//filtrar carpetas por gabinetes
export const setFilterFoldersCoreCabinet = (cabinetId,) => async (dispatch, getState) => {

  const { folderCore } = getState();
  const { folders } = folderCore;

  const folderValidate = folders.filter(folder => folder.folderId == null);
  const folderFinal = folderValidate.filter(folders => folders.cabinetId == cabinetId)
  dispatch({
    type: SET_FILTER_FOLDERS_CORE,
    payload: {
      ...folderCore, folderCabinet: folderFinal
    },
  });
};

//filtrar carpetas hijas por carpetas padre 
export const setFilterFoldersFatherCore = (folderId) => async (dispatch, getState) => {
  const { folderCore } = getState();
  const { folders } = folderCore;
  dispatch({
    type: SET_FILTER_FOLDERS_CHILD_CORE,
    payload: {
      ...folderCore, folderByFolder: folders.filter(folders => folders.folderId == folderId)
    },
  });
  dispatch(orderFolderByAscCore());
};

//Filtrar Carpeta Seleccionada global con cambio de pantalla
export const setSelectedFolderPrimaryCore = (id) => async (dispatch, getState) => {
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
  dispatch(setChangeSelectView("folderChild"));
};

//Filtrar Carpeta hija Seleccionada con cambio de pantalla
export const setSelectedFolderChildCore = (id) => async (dispatch, getState) => {
  const { folderCore } = getState();
  const { folders } = folderCore;
  const SelectedFolderChild = folders.find(folders => folders.id == id);

  if (SelectedFolderChild == undefined) {
    dispatch({
      type: SELECTED_ERRORS_FOLDER_CHILD_CORE,
      payload: { ...folderCore, elementError: "El Id no existe" },
    });
    return;
  }

  dispatch({
    type: SELECTED_FOLDER_CHILD_CORE,
    payload: { ...folderCore, SelectedFolderChild },
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


//filtrar carpeta desde metadata para creacion y tipos de archivos
export const setSelectedFolderMetadataCore = (id) => async (dispatch, getState) => {
  const { folderCore } = getState();
  const { folders } = folderCore;
  const SelectedFolderMeta = folders.find(folders => folders.id == id);

  if (SelectedFolderMeta == undefined) {
    dispatch({
      type: SELECTED_ERRORS_FOLDER_CORE,
      payload: { ...folderCore, elementError: "El Id no existe" },
    });
    return;
  }

  dispatch({
    type: SELECTED_FOLDER_CORE,
    payload: { ...folderCore, SelectedFolderMeta },
  });
};

//limpiar carpeta seleccionada desde  metadata
export const clearFolderMetaSelected = () => async (dispatch, getState) => {
  const { folderCore } = getState();
  dispatch({
    type: CLEAR_SELECTED_FOLDER_META,
    payload: { ...folderCore, SelectedFolderMeta: "" }
  })
}

//limpiar carpeta seleccionada desde  metadata
export const clearFolderCabinet = () => async (dispatch, getState) => {
  const { folderCore } = getState();
  dispatch({
    type: CLEAR_SELECTED_FOLDER_CABINET,
    payload: { ...folderCore, folderCabinet: [] }
  })
}

//Eliminar Carpetas hijas Seleccionada
export const setFolderChildCore = () => async (dispatch, getState) => {
  const { folderCore } = getState();
  dispatch({
    type: CLEAR_DATA_FOLDER_CHILDREN,
    payload: { ...folderCore, folderByFolder: [] }
  })
}

//filtrar a nivel de carpetas global
export const setFilterFoldersByName = (name) => async (dispatch, getState) => {
  const { folderCore, sesion } = getState();
  const { TockenUser } = sesion;
  dispatch(setActiveLoadingSpinnerFolderSearch(true));
  try {
    const response = await axios({
      url: `${CoreServer}folderbytext/${name}`,
      headers: {
        Authorization: `Bearer ${TockenUser}`
      }
    });
    if (response.status == 200) {
      dispatch({
        type: GET_ALL_FOLDERS_NAME_DATA_CORE,
        payload: { ...folderCore, SearchFolder: response.data },
      });
      dispatch(setChangeSelectView("search"));
      dispatch(setActiveLoadingSpinnerFolderSearch(false));
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ALL_FOLDERS_NAME_DATA_ERRORS_CORE,
      payload: { ...folderCore, SearchFolder: [] }
    });
  }
}

//carga de spinner de carpetas para busqueda
export const setActiveLoadingSpinnerFolderSearch = (bool) => async (dispatch, getState) => {
  const { folderCore } = getState();
  dispatch({
    type: SET_ACTIVE_SPINNER_SEARCH_FOLDER,
    payload: { ...folderCore, isLoadingSearchFolder: bool }
  })
}

//Ordenar carpetas en orden ascendente
export const orderFolderByAscCore = () => async (dispatch, getState) => {
  const { folderCore } = getState();
  const { folderByFolder } = folderCore;
  dispatch({
    type: ORDER_FOLDER_BY_ASC_CORE,
    payload: {
      ...folderCore, folderByFolder: folderByFolder.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
      })
    }
  })
}

//Ordenar gabinetes en orden descendente
export const orderFolderByDesCore = () => async (dispatch, getState) => {
  const { folderCore } = getState();
  const { folderByFolder } = folderCore;
  dispatch({
    type: ORDER_FOLDER_BY_ASC_CORE,
    payload: {
      ...folderCore, folderByFolder: folderByFolder.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        }
      })
    }
  })
}

/*<------------FOLDER---------------->*/
//traer todas las carpetas
export const getAllFolders = (cabinetId, folderId) => async (dispatch, getState) => {
  const { folderCore, sesion } = getState();
  const { TockenUser } = sesion;
  axios({
    url: `${CoreServer}folder`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${TockenUser}`
    }
  }).then(function (response) {
    if (response.status == 200) {
      dispatch({
        type: GET_FOLDER_CORE,
        payload: { ...folderCore, folders: response.data },
      });
      dispatch(setFilterFoldersCoreCabinet(cabinetId));
    }
  }).catch(function (error) {
    console.log(error);
    dispatch({
      type: GET_FOLDER_ERROR_CORE,
      payload: { ...folderCore, folders: [], elementError: error }
    })
  })
};


//traer todas las carpetas
export const getAllFolderChild = (folderId) => async (dispatch, getState) => {
  const { folderCore, sesion } = getState();
  const { TockenUser } = sesion;
  axios({
    url: `${CoreServer}folder`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${TockenUser}`
    }
  }).then(function (response) {
    if (response.status == 200) {
      dispatch({
        type: GET_FOLDER_CHILD_CORE,
        payload: { ...folderCore, folders: response.data },
      });
      dispatch(setFilterFoldersFatherCore(folderId));
    }
  }).catch(function (error) {
    console.log(error);
    dispatch({
      type: GET_FOLDER_CHILD_ERROR_CORE,
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
      Authorization: `Bearer ${TockenUser}`
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

//Guardar nueva carpeta y actualizar estado inicial
export const CreateFolderChildNew = (newFolder, folderId) => async (dispatch, getState) => {
  const { sesion } = getState();
  const { TockenUser } = sesion;
  axios({
    url: `${CoreServer}folder`,
    method: "PUT",
    data: newFolder,
    headers: {
      'Content-Type': "Application/json",
      Authorization: `Bearer ${TockenUser}`
    },
  })
    .then(function (response) {
      if (response.status == 200) {
        toast.success('Carpeta Creada.');
        dispatch(getAllFolderChild(folderId));
      };
    }).catch(function (error) {
      console.log(error);
      toast.error('Carpeta no Creada.');
    })
};

//Actualizar Carpeta y actualizar estado inicial
export const UpdateFolderChildCore = (newFolder, id, folderId) => async (dispatch, getState) => {
  const { sesion } = getState();
  const { TockenUser } = sesion;
  axios({
    url: `${CoreServer}folder/${id}`,
    method: "PUT",
    data: newFolder,
    headers: {
      'Content-Type': "Application/json",
      Authorization: `Bearer ${TockenUser}`
    },
  })
    .then(function (response) {
      if (response.status == 200) {
        toast.success('Carpeta Actualizada.');
        dispatch(getAllFolderChild(folderId));
      };
    }).catch(function (error) {
      console.log(error);
      toast.error('Carpetas no Actualizado.');
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
      Authorization: `Bearer ${TockenUser}`
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
      Authorization: `Bearer ${TockenUser}`
    },
  })
    .then(function (response) {
      if (response.status == 200) {
        toast.success('Carpeta Eliminada.');
        dispatch(getAllFolders(cabinetId));
        dispatch(getAllDeleteFolderRestored());
      };
    }).catch(function (error) {
      console.log(error);
      toast.error('Carpeta no Eliminada.');
    })
};

//limpiar estados de folder 
export const clearDataFolder = () => async (dispatch, getState) => {
  const { folderCore } = getState();
  dispatch({
    type: CLEAR_DATA_FOLDER_SESION,
    payload: {
      ...folderCore,
      folders: [],
      folderCabinet: [],
      folderByFolder: [],
      SelectedFolder: "",
      SelectedFolderChild: "",
      SelectedFolderMeta: "",
      SelectedUpdateFolder: "",
      isLoadingFolder: false,
      SearchFolder: [],
      isLoadingSearchFolder: false,
      elementError: "",
    }
  })
}