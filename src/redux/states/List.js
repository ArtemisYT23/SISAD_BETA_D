import axios from "axios";
import { CoreServer } from "../../config/axios";
import { setChangeSelectView } from "./View";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
    ListData: [],
}

const GET_ALL_LISTDATA_CONFIG = "GET_ALL_LISTDATA_CONFIG";
const GET_ALL_LISTDATA_ERROR_CONFIG = "GET_ALL_LISTDATA_ERROR_CONFIG";

export default function ListReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_LISTDATA_CONFIG:
        case GET_ALL_LISTDATA_ERROR_CONFIG:
            return action.payload;
        default:
            return state;
    }
}

//traer todas las listas de datos
export const getListDataConfig = () => async (dispatch, getState) => {
    const { listCore, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${CoreServer}list`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser?.token}`
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_LISTDATA_CONFIG,
                payload: { ...listCore, ListData: response.data },
            });
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_LISTDATA_ERROR_CONFIG,
            payload: { ...listCore, ListData: [] }
        })
    })
};