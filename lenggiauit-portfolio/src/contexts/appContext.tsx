import React, { useState, createContext, useContext } from 'react';
import { AppSetting } from '../types/type';
import { GlobalKeys } from '../utils/constants';
import { SiteSetting } from '../services/communication/response/siteSetting';
import { User } from '../services/models/user';
import { getLoggedUser, getSiteSetting, setLoggedUser, setSiteSetting } from '../utils/functions';
import { Cookies } from 'react-cookie'; 

let appSetting: AppSetting = require('../appSetting.json');
var cookies = new Cookies();

export type AppContextType = {
    locale: string;
    setLocale: (string: string) => void;
    appSetting: AppSetting;
    siteSettings: SiteSetting | null;
    setSiteSettings: (setting: SiteSetting) => void;
    authenticateUser: User | null;
    setAuthenticateUser: (user: User) => void;
    logout: ()=> void;
}

export const AppContext = createContext<AppContextType>({
    locale: 'EN',
    setLocale: locale => console.warn('No locale provider'),
    appSetting: appSetting, 
    siteSettings: getSiteSetting(),
    setSiteSettings: setting => setSiteSetting(setting),
    authenticateUser: getLoggedUser(),
    setAuthenticateUser: user => { setLoggedUser(user)},
    logout: () => {  
        cookies.remove(GlobalKeys.LoggedUserKey);
        localStorage.clear();  
    },
});

export const useAppContext = () => useContext(AppContext);

interface Props {
    children: React.ReactNode;
}

export const AppProvider: React.FC<Props> = ({ children }) => {
    const defaultLocale = window.localStorage.getItem(GlobalKeys.LanguageSelectedKey);
    const [locale, setLocale] = useState<string>(defaultLocale || 'EN');
    const cookieSiteSettings = getSiteSetting(); 
    const siteSettings = getSiteSetting();
    const setSiteSettings = (s: SiteSetting) => setSiteSetting(s);
    const authenticateUser = getLoggedUser();
    const setAuthenticateUser = (user: User) => { setLoggedUser(user)};   
    const logout = () => {
        cookies.remove(GlobalKeys.LoggedUserKey);
        localStorage.clear();
    } 
    const provider = {
        locale,
        setLocale,
        appSetting,
        siteSettings,
        setSiteSettings,
        authenticateUser,
        setAuthenticateUser,
        logout
    };
    return (
        <>
            <AppContext.Provider value={provider}>
                {children}
            </AppContext.Provider>
        </>
    );
};



