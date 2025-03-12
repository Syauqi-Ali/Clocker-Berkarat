import React, { createContext, useState, useContext, useEffect } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => {
    return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }) => {
    const [isSidebarActive, setIsSidebarActive] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1200) {
                setIsSidebarActive(false);
            } else {
                setIsSidebarActive(true);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarActive((prevState) => !prevState);
    };

    return (
        <SidebarContext.Provider value={{ isSidebarActive, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};
