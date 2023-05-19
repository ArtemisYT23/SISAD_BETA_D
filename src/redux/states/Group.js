import axios from "axios";
import { CoreServer } from "../../config/axios";
import toast, { Toaster } from "react-hot-toast";
import { setChangeSelectView } from "./View";
import { getNameGlobalChange } from "./Name";
import { getAllDeleteGroupRestored } from "../formData/ResourceData";

const initialState = {
  groups: [],
  GroupsCabinet: [],
  SelectedGroup: null,
  isLoadingGroup: false,
  elementError: "",
};

const GET_GROUP_CORE = "GET_GROUP_CORE";
const GET_GROUP_ERROR_CORE = "GET_GROUP_ERROR_CORE";
const SET_FILTER_GROUPS_CORE = "SET_FILTER_GROUPS_CORE";
const SELECTED_GROUP_CORE = "SELECTED_GROUP_CORE";
const SELECTED_ERRORS_GROUP_CORE = "SELECTED_ERRORS_GROUP_CORE";
const SET_CLEAR_MEMORY_DATA_GROUPCORE = "SET_CLEAR_MEMORY_DATA_GROUPCORE";
const SET_ACTIVE_SPINNER_GROUP = "SET_ACTIVE_SPINNER_GROUP";
const ORDER_GROUP_BY_ASC_CORE = "ORDER_GROUP_BY_ASC_CORE";
const SELECTED_ERRORS_GROUP_UPDATE_CORE = "SELECTED_ERRORS_GROUP_UPDATE_CORE";
const SELECTED_GROUP_UPDATE_CORE = "SELECTED_GROUP_UPDATE_CORE";

export default function GroupReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GROUP_CORE:
    case GET_GROUP_ERROR_CORE:
    case SET_FILTER_GROUPS_CORE:
    case SELECTED_GROUP_CORE:
    case SELECTED_ERRORS_GROUP_CORE:
    case SET_CLEAR_MEMORY_DATA_GROUPCORE:
    case SELECTED_ERRORS_GROUP_UPDATE_CORE:
    case SELECTED_GROUP_UPDATE_CORE:
    case SET_ACTIVE_SPINNER_GROUP:
    case ORDER_GROUP_BY_ASC_CORE:
      return action.payload;
    default:
      return state;
  }
}

//traer todos los grupos 
export const getAllGroupsCore = () => async (dispatch, getState) => {
  const { groupCore, sesion } = getState();
  const { TockenUser } = sesion;
  dispatch(setActiveLoadingSpinnerGroup(true));
  axios({
    url: `${CoreServer}group`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${TockenUser}`
    }
  }).then(function (response) {
    if (response.status == 200) {
      dispatch({
        type: GET_GROUP_CORE,
        payload: { ...groupCore, groups: response.data },
      });
      dispatch(setActiveLoadingSpinnerGroup(false));
    }
  }).catch(function (error) {
    console.log(error);
    dispatch({
      type: GET_GROUP_ERROR_CORE,
      payload: { ...groupCore, groups: [], elementError: error },
    });
  })
};

//Filtrar gabinetes por grupo
export const setFilterGroupsCore = (id, name) => async (dispatch, getState) => {
  const { groupCore, cabinetCore } = getState();
  const { cabinets } = cabinetCore;
  dispatch(getNameGlobalChange(name));
  dispatch({
    type: SET_FILTER_GROUPS_CORE,
    payload: {
      ...groupCore, GroupsCabinet: cabinets.filter(cabinets => cabinets.groupId == id)
    },
  });
};

//Filtrar Grupo Seleccionado con cambio de pantalla
export const setSelectedGroupCore = id => async (dispatch, getState) => {
  const { groupCore } = getState();
  const { groups } = groupCore;
  const SelectedGroup = groups.find(groups => groups.id == id);

  if (SelectedGroup == undefined) {
    dispatch({
      type: SELECTED_ERRORS_GROUP_CORE,
      payload: { ...groupCore, elementError: "El Id no existe" },
    });
    return;
  }

  dispatch({
    type: SELECTED_GROUP_CORE,
    payload: { ...groupCore, SelectedGroup },
  });
  dispatch(setChangeSelectView("group"));
};

//Filtrar Grupo sin cambio de pantalla
export const setSelectedGroupNotSelectedCore = id => async (dispatch, getState) => {
  const { groupCore } = getState();
  const { groups } = groupCore;
  const SelectedGroup = groups.find(groups => groups.id == id);

  if (SelectedGroup == undefined) {
    dispatch({
      type: SELECTED_ERRORS_GROUP_CORE,
      payload: { ...groupCore, elementError: "El Id no existe" },
    });
    return;
  }

  dispatch({
    type: SELECTED_GROUP_CORE,
    payload: { ...groupCore, SelectedGroup },
  });
};

//Filtrar Grupo sin cambio de pantalla
export const setSelectedGroupCoreUpdate = id => async (dispatch, getState) => {
  const { groupCore } = getState();
  const { groups } = groupCore;
  const UpdateSelectedGroup = groups.find(groups => groups.id == id);

  if (UpdateSelectedGroup == undefined) {
    dispatch({
      type: SELECTED_ERRORS_GROUP_UPDATE_CORE,
      payload: { ...groupCore, elementError: "El Id no existe" },
    });
    return;
  }

  dispatch({
    type: SELECTED_GROUP_UPDATE_CORE,
    payload: { ...groupCore, UpdateSelectedGroup },
  });
};

//Ordenar gabinetes en orden ascendente
export const orderGroupByAscCore = () => async (dispatch, getState) => {
  const { groupCore } = getState();
  const { groups } = groupCore;
  dispatch({
    type: ORDER_GROUP_BY_ASC_CORE,
    payload: {
      ...groupCore, groups: groups.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
      })
    }
  })
}

//GUARDADO Y ACTUALIZACION DE ESTADOS
/*<----------------------GRUPOS------------------------> */
export const CreateGroupNew = (newGroup) =>
  (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
      url: `${CoreServer}Group`,
      method: "PUT",
      data: newGroup,
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${TockenUser}`
      },
    })
      .then(function (response) {
        if (response.status == 200) {
          toast.success('Grupo Creado.');
          dispatch(getAllGroupsCore());
        };
      }).catch(function (error) {
        console.log(error);
        toast.error('Grupo no Creado.');
      })
  };

//Actualizar un grupo
export const UpdateGroupNew = (UpdateGroup, id) =>
  (dispatch, getState) => {
    console.log(UpdateGroup);
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
      url: `${CoreServer}Group/${id}`,
      method: "PUT",
      data: UpdateGroup,
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${TockenUser}`
      },
    })
      .then(function (response) {
        if (response.status == 200) {
          toast.success('Grupo Actualizado');
          dispatch(getAllGroupsCore());
        };
      }).catch(function (error) {
        console.log(error);
        toast.error('Grupo No Actualizado');
      })
  };

//eliminar un grupo
export const DeleteGroupNew = (DeleteGroup, id) =>
  (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
      url: `${CoreServer}Group/${id}`,
      method: "DELETE",
      data: DeleteGroup,
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${TockenUser}`
      },
    })
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          toast.success('Grupo Eliminado');
          dispatch(getAllGroupsCore());
          dispatch(getAllDeleteGroupRestored());
        };
      }).catch(function (error) {
        console.log(error);
        toast.error('Gabinete no Eliminado.');
      })
  };

//Carga de Spinner de Group
export const setActiveLoadingSpinnerGroup = (bool) => async (dispatch, getState) => {
  const { groupCore } = getState();
  dispatch({
    type: SET_ACTIVE_SPINNER_GROUP,
    payload: { ...groupCore, isLoadingGroup: bool }
  })
}

//limpiar estado del groupcore cierre de sesion 
export const setClearMemoryDataGroupCore = () => async (dispatch, getState) => {
  const { groupCore } = getState();
  dispatch({
    type: SET_CLEAR_MEMORY_DATA_GROUPCORE,
    payload: {
      ...groupCore,
      groups: [],
      GroupsCabinet: [],
      SelectedGroup: null,
      isLoadingGroup: false,
      elementError: "",
    }
  })
}