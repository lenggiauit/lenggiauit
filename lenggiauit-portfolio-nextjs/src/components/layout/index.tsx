'use client';
import React, { ReactElement, useEffect, useState } from 'react';
import Navigation from '../../components/navigation/'
import { AppProvider } from '../../contexts/appContext';
import { getLoggedUser } from '../../utils/functions';
import SocialList from '../socialList';
import ProfilePicture from '../profile-picture';
import { LanguageSelector } from '../languageSelector';
import { ResultCode } from '../../utils/enums';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from '../../store'; 

type Props = {
    isPublic?: boolean,
    navCssClass?: string,
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ isPublic = false, navCssClass, children }): ReactElement => {

    const currentUser = getLoggedUser();
    // const getSettings = useGetSiteSettingsQuery(null);
    const [isOpenToWork, setIsOpenToWork] = useState<boolean>(false);
    const [isMultiLanguage, setIsMultiLanguage] = useState<boolean>(false);
    // useEffect(() => {
    //     if (getSettings.data && getSettings.data.resultCode == ResultCode.Success) {
    //         setIsOpenToWork(getSettings.data.resource.isOpenToWork);
    //         setIsMultiLanguage(getSettings.data.resource.isMultiLanguage);
    //     }
    // }, [getSettings]); 

    if (!isPublic && currentUser == null) {
        window.location.href = '/login';
        return (
            <></>
        );
    }
    else {
        return (
            <>
                <GoogleOAuthProvider clientId="522351386373-vd9iv3qesca501vuv0ccbhmth4ema178.apps.googleusercontent.com">
                    <Provider store={store} >
                        <AppProvider>
                            <div id="wrapper" className="margLTop  margLBottom">
                                <div className="container">
                                    <div className="row ">
                                        <div className="col-md-3 left-content">
                                            <header id="header">
                                                <div className="main-header">
                                                    <ProfilePicture openToWork={isOpenToWork} />
                                                    <Navigation isPublic={isPublic} currentUser={currentUser} />
                                                </div>
                                                <div className=" bg-white ofsTSmall ofsBSmall tCenter">
                                                    <LanguageSelector multiLanguage={isMultiLanguage} />
                                                </div>
                                                <div className="bottom-header bg-white ofsBSmall tCenter">
                                                    <SocialList />
                                                </div>

                                            </header>
                                        </div>
                                        <div className="col-md-9 right-content">
                                            {children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AppProvider>
                    </Provider>
                </GoogleOAuthProvider>
            </>
        )
    }
};

export default Layout;