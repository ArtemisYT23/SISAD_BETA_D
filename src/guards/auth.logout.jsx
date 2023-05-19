import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOpenLogoutAlert } from "../redux/states/ActionDocumentary";

export const AuthLogout = ({ sessionTimeout }) => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            // navigate("/");
            dispatch(setOpenLogoutAlert(true))
        }, sessionTimeout);

        return () => clearTimeout(timeoutId);

    }, [navigate, sessionTimeout])

    return null;
}

export default AuthLogout;