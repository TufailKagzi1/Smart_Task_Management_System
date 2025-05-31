import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = (props) => {

    const [user, setUser] = useState({
        username: '',
        email: '',
        name: '',
        role: '',
    });

    const clearContext = () => {
        const blankUser = {
            username: '',
            email: '',
            name: '',
            role: '',
        };
        setUser(blankUser);
    }

    return (
        <UserContext.Provider value={{ user, setUser, clearContext }}>
            {props.children}
        </UserContext.Provider>
    )
}