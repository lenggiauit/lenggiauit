import React, { ReactElement, useEffect, useState } from 'react';
import * as bt from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Navigation from '../../components/navigation/'
import { AppProvider, useAppContext } from '../../contexts/appContext';
import { getLoggedUser } from '../../utils/functions';
import SocialList from '../socialList';
import ProfilePicture from '../profile-picture';
import { LanguageSelector } from '../languageSelector';
import { ResultCode } from '../../utils/enums';
import { useGetSiteSettingsMutation } from '../../services/home';


type Props = {
    isPublic?: boolean,
    navCssClass?: string,
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ isPublic = false, navCssClass, children }): ReactElement => {

    const { authenticateUser, siteSettings, setSiteSettings } = useAppContext();

    const [getSetting, getSettingStatus] = useGetSiteSettingsMutation();

    useEffect(() => {
        setTimeout(() => {
            if (siteSettings == null && isPublic)  {
                getSetting(null);
            }
        }, 1000); 
    }, []);

    const [isOpenToWork, setIsOpenToWork] = useState<boolean>(false);
    const [isMultiLanguage, setIsMultiLanguage] = useState<boolean>(false);

    useEffect(() => {
        if (getSettingStatus.data && getSettingStatus.data.resultCode == ResultCode.Success) {
            setIsOpenToWork(getSettingStatus.data.resource.isOpenToWork);
            setIsMultiLanguage(getSettingStatus.data.resource.isMultiLanguage);
            setSiteSettings(getSettingStatus.data.resource);
        }
    }, [getSettingStatus]);

    if (!isPublic && authenticateUser == null) {
        return (
            <Redirect to='/login' />
        );
    }
    else {
        return (
            <>
                <AppProvider>
                    <div id="wrapper" className="margLTop  margLBottom">
                        <div className="container">
                            <div className="row ">
                                <div className="col-md-3 left-content"> 
                                    <header id="header1" className="bg-white 100-vh">
                                        <div className="main-header1">
                                            <ProfilePicture />
                                            <Navigation isPublic={isPublic} currentUser={authenticateUser} />
                                        </div>
                                        <div className="bg-white mt-4 text-center">
                                            <LanguageSelector />
                                        </div>
                                        <div className="bottom-header bg-white mt-4 pb-4 text-center">
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
            </>
        )
    }
};

export default Layout;