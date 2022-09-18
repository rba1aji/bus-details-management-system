import React from "react";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [getRefresh, setGetRefresh] = useState(0);
    return (
        <AppContext.Provider
            value={{
                getRefresh,
                setGetRefresh
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

export const AppState = () => {
    return useContext(AppContext);
}