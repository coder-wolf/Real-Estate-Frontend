import { createContext } from "react";
import ApiProvider from "./ApiProvider";
import AuthProvider from "./AuthProvider";


export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
    const appInfo = {};

    return (
        <AppContext.Provider value={appInfo}>
            <ApiProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </ApiProvider>
        </AppContext.Provider>
    );
}

export default AppProvider;
