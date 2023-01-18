
const initialState = {
    options: [{
        "id": "423d4c69-0109-43eb-8c32-9f8872b917c2",
        "name": "Lista de datos"
    },
    {
        "id": "5674b607-2230-4700-b68e-d11c22f2c59c",
        "name": "Tipos de Archivos"
    },
    {
        "id": "80a3fae4-adaf-45aa-b5e8-ebd945e934ca",
        "name": "Indices"
    },
    {
        "id": "58e25fac-a7b7-44a2-b931-5c074bb0ce97",
        "name": "Tipos de datos"
    }
    ],
    optionsSecurity: [{
        "id": "423d4c69-0109-43eb-8c32-9f8872b917c2",
        "name": "Información de Usuario"
    },
    {
        "id": "5674b607-2230-4700-b68e-d11c22f2c59c",
        "name": "Panel de perfiles"
    },
    {
        "id": "434b89ec-cfa8-42e1-b20d-cb7d7281c38a",
        "name": "Panel de Recursos"
    },
    {
        "id": "80a3fae4-adaf-45aa-b5e8-ebd945e934ca",
        "name": "Gestion de Usuarios"
    },
    {
        "id": "58e25fac-a7b7-44a2-b931-5c074bb0ce97",
        "name": "Historial de Acciones"
    }
    ],
    optionsSecurityRead: [{
        "id": "423d4c69-0109-43eb-8c32-9f8872b917c2",
        "name": "Información de Usuario"
    }],
    SelectedOptionSecurity: "",
    elementError: ""
}


const SELECTED_OPTIONS_SECURITY_CONFIG = "SELECTED_OPTIONS_SECURITY_CONFIG";
const OPTIONS_SECURITY_ERRORS_CONFIG = "OPTIONS_SECURITY_ERRORS_CONFIG";
const CLEAR_OPTIONS_SECURITY_CONFIG = "CLEAR_OPTIONS_SECURITY_CONFIG";

export default function MenuOptionsReducer(state = initialState, action) {
    switch (action.type) {
        case SELECTED_OPTIONS_SECURITY_CONFIG:
        case OPTIONS_SECURITY_ERRORS_CONFIG:
        case CLEAR_OPTIONS_SECURITY_CONFIG:
            return action.payload;
        default:
            return state;
    }
};


//Filtrar y guardar dato seleccionado para panel de seguridad
export const setSelectedOptionsSecurityConfig = (id) => async (dispatch, getState) => {
    const { menuOptions } = getState();
    const { optionsSecurity } = menuOptions;
    const SelectedOptionSecurity = optionsSecurity.find(optionsSecurity => optionsSecurity.id == id);

    if (SelectedOptionSecurity == undefined) {
        dispatch({
            type: OPTIONS_SECURITY_ERRORS_CONFIG,
            payload: { ...menuOptions, elementError: "El Id no existe" },
        });
        return;
    }

    dispatch({
        type: SELECTED_OPTIONS_SECURITY_CONFIG,
        payload: { ...menuOptions, SelectedOptionSecurity }
    })
}

//limpiar estados iniciales de seleccion 
export const clearSelectionOptions = () => async (dispatch, getState) => {
    const { menuOptions } = getState();
    dispatch({
        type: CLEAR_OPTIONS_SECURITY_CONFIG,
        payload: {
            ...menuOptions,
            SelectedOptionSecurity: "",
        }
    })
}