import axios from "axios";
import { CoreServer } from "../../config/axios";
import { setChangeSelectView } from "./View";
import { setFilterGroupsCore } from "./Group";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  cabinets: [],
  isLoadingCabinet: false,
  SelectedCabinet: "",
  UpdateSelectedCabinet: "",
  elementError: ""
};

//Traer Gabinetes
const GET_CABINET_CORE = "GET_CABINET_CORE";
const GET_CABINET_ERROR_CORE = "GET_CABINET_ERROR_CORE";
const SET_ACTIVE_SPINNER_CABINET = "SET_ACTIVE_SPINNER_CABINET";
const ORDER_CABINET_BY_ASC_CORE = "ORDER_CABINET_BY_ASC_CORE";
const SELECTED_CABINET_CORE = "SELECTED_CABINET_CORE";
const SELECTED_ERRORS_CABINET_CORE = "SELECTED_ERRORS_CABINET_CORE";
const CLEAR_DATA_CABINET_CORE = "CLEAR_DATA_CABINET_CORE";

export default function CabinetReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CABINET_CORE:
    case GET_CABINET_ERROR_CORE:
    case SET_ACTIVE_SPINNER_CABINET:
    case ORDER_CABINET_BY_ASC_CORE:
    case SELECTED_CABINET_CORE:
    case SELECTED_ERRORS_CABINET_CORE:
    case CLEAR_DATA_CABINET_CORE:
      return action.payload;
    default:
      return state;
  }
}

//Traer todos los gabinetes
export const getAllCabinetsCore = () => async (dispatch, getState) => {
  const { cabinetCore, sesion } = getState();
  const { TockenUser } = sesion;
  dispatch(setActiveLoadingSpinnerCabinet(true));
  axios({
    url: `${CoreServer}cabinet`,
    headers: {
      Authorization: `Bearer ${TockenUser?.token}`
    }
  }).then(function (response) {
    if (response.status == 200) {
      dispatch({
        type: GET_CABINET_CORE,
        payload: { ...cabinetCore, cabinets: response.data },
      });
      dispatch(setActiveLoadingSpinnerCabinet(false));
    }
  }).catch(function (error) {
    console.log(error);
    dispatch({
      type: GET_CABINET_ERROR_CORE,
      payload: { ...cabinetCore, cabinets: [], elementError: error }
    })
  })
};

//filtrar gabinete seleccionado global
export const setSelectedCabinetCore = id => async (dispatch, getState) => {
  const { cabinetCore } = getState();
  const { cabinets } = cabinetCore;
  const SelectedCabinet = cabinets.find(cabinets => cabinets.id == id);

  if (SelectedCabinet == undefined) {
    dispatch({
      type: SELECTED_ERRORS_CABINET_CORE,
      payload: { ...cabinetCore, elementError: "El Id no existe" },
    });
    return;
  }

  dispatch({
    type: SELECTED_CABINET_CORE,
    payload: { ...cabinetCore, SelectedCabinet },
  });
  dispatch(setChangeSelectView("cabinet"));
};

//filtrar gabinete seleccionado para actualizar
export const setSelectedCabinetUpdateCore = id => async (dispatch, getState) => {
  const { cabinetCore } = getState();
  const { cabinets } = cabinetCore;
  const UpdateSelectedCabinet = cabinets.find(cabinets => cabinets.id == id);

  if (UpdateSelectedCabinet == undefined) {
    s
    dispatch({
      type: SELECTED_ERRORS_CABINET_CORE,
      payload: { ...cabinetCore, elementError: "El Id no existe" },
    });
    return;
  }

  dispatch({
    type: SELECTED_CABINET_CORE,
    payload: { ...cabinetCore, UpdateSelectedCabinet },
  });
};

//Ordenar gabinetes en orden ascendente
export const orderCabinetByAscCore = () => async (dispatch, getState) => {
  const { cabinetCore } = getState();
  const { cabinets } = cabinetCore;
  dispatch({
    type: ORDER_CABINET_BY_ASC_CORE,
    payload: {
      ...cabinetCore, cabinets: cabinets.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
      })
    }
  })
}


//Carga de Spinner de Gabinetes
export const setActiveLoadingSpinnerCabinet = (bool) => async (dispatch, getState) => {
  const { cabinetCore } = getState();
  dispatch({
    type: SET_ACTIVE_SPINNER_CABINET,
    payload: { ...cabinetCore, isLoadingCabinet: bool }
  })
}

/*<------------GABINETES--------------->*/
//Guardar nuevo Gabinete y actualizar estado
export const CreateCabinetNew = (newCabinet) =>
  (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
      url: `${CoreServer}Cabinet`,
      method: "PUT",
      data: newCabinet,
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${TockenUser?.token}`
      },
    })
      .then(function (response) {
        if (response.status == 200) {
          toast.success('Gabinete Creado.');
          dispatch(getAllCabinetsCore());
        };
      }).catch(function (error) {
        console.log(error);
        toast.error('Gabinete no Creado.');
      })
  };

//Actualizar Gabinete y Actualizar estado inicial
export const UpdateCabinetCore = (newGabi, id, groupId) => (dispatch, getState) => {
  const { sesion } = getState();
  const { TockenUser } = sesion;
  axios({
    url: `${CoreServer}Cabinet/${id}`,
    method: "PUT",
    data: newGabi,
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${TockenUser?.token}`
    },
  })
    .then(function (response) {
      if (response.status == 200) {
        toast.success('Gabinete Actualizado');
        dispatch(getAllCabinetsCore());
        {
          groupId != "" && (
            dispatch(setFilterGroupsCore(groupId))
          )
        }
      };
    }).catch(function (error) {
      console.log(error);
      toast.error('Gabinete no Actualizado.');
    })
};

//Eliminar Gabinete y Actualizar estado inicial
export const DeleteCabinetCore = (newGabi, id, groupId) => (dispatch, getState) => {
  const { sesion } = getState();
  const { TockenUser } = sesion;
  axios({
    url: `${CoreServer}Cabinet/${id}`,
    method: "DELETE",
    data: newGabi,
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${TockenUser?.token}`
    },
  })
    .then(function (response) {
      if (response.status == 200) {
        toast.success('Gabinete Eliminado');
        dispatch(getAllCabinetsCore());
        {
          groupId != "" && (
            dispatch(setFilterGroupsCore(groupId))
          )
        }
      }
    }).catch(function (error) {
      console.log(error);
      toast.error('Gabinete no Eliminado.');
    })
};

//limpiar estado global de cabinet
export const setClearDataCabinetCore = () => async (dispatch, getState) => {
  const { cabinetCore } = getState();
  dispatch({
    type: CLEAR_DATA_CABINET_CORE,
    payload: {
      ...cabinetCore,
      cabinets: [],
      isLoadingCabinet: false,
      SelectedCabinet: "",
      UpdateSelectedCabinet: "",
      elementError: ""
    }
  })
}