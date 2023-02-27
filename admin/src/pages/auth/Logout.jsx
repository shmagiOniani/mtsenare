import React, {useState, useEffect, useContext} from "react";
import { UserContext } from '../../components/contexts/UserContext';

export default function Logout() {
    const context = useContext(UserContext);

    const [logout, setLogout] = useState(false);

    useEffect(() => {
        // context.resetUser();
        setLogout(true);
        //DROEBIT
        // window. location. reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    if(logout) return window.location.replace("/login");

    return (
        <>
         Logout...
        </>
    );
}