'use client';
import React, { useContext, MouseEvent } from 'react';
import { localeOptions } from '../../locales';
import { useAppContext } from '../../contexts/appContext'; 
import { GlobalKeys } from '../../utils/constants';

type Props  = {
    multiLanguage: boolean
} 
export const LanguageSelector: React.FC<Props> = ({multiLanguage}) => {
    const { locale, setLocale } = useAppContext();
    const handleLanguageChange: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        var selectLang = (e.target as HTMLAnchorElement).id;
        if (selectLang) {
            window.localStorage.setItem(GlobalKeys.LanguageSelectedKey, selectLang);
            setLocale(selectLang); 
        }
    }
    if(multiLanguage){
    return (
        <>
            <div className="btn-group btn-toggle">
                <button id="EN" className={"btn " + (locale == "EN" ? "btn-primary active" : "btn-default")} onClick={handleLanguageChange}>{localeOptions["EN"]}</button>
                <button id="VN" className={"btn " + (locale == "VN" ? "btn-primary active" : "btn-default")} onClick={handleLanguageChange}>{localeOptions["VN"]}</button>
            </div>
        </>
    );
    }
    else{
        return <></>
    }
};