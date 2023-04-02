import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../components/layout'; 
import SectionTitle from '../../../components/sectionTitle';
import { ENTranslation,  VNTranslation } from '../../../components/translation'; 
import { dictionaryList } from '../../../locales';
import { useAppContext } from '../../../contexts/appContext'; 
import showDialogModal from '../../../components/modal/showModal'; 
import { ResultCode } from '../../../utils/enums'; 
import PageLoading from '../../../components/pageLoading'; 
import { useGetSiteSettingsMutation, useUpdateSiteSettingsMutation } from '../../../services/admin';
 
const SiteSettings: React.FC = (): ReactElement => {
    const { locale, setSiteSettings, siteSettings } = useAppContext();
    const [isOpenToWork, setIsOpenToWork] = useState<boolean>(siteSettings != null ? siteSettings?.isOpenToWork: false);
    const [isMultiLanguage, setIsMultiLanguage] = useState<boolean>(siteSettings != null ? siteSettings?.isMultiLanguage : false); 
    const [updateSettings, updateSettingStatus] = useUpdateSiteSettingsMutation();
  
    const [getSetting, getSettingStatus] = useGetSiteSettingsMutation();

    useEffect(() => { 
       if (siteSettings == null) { 
           getSetting(null);
        } 
    }, []);
 
    useEffect(() => {
        if (getSettingStatus.data && getSettingStatus.data.resultCode == ResultCode.Success) {
            setIsOpenToWork(getSettingStatus.data.resource.isOpenToWork);
            setIsMultiLanguage(getSettingStatus.data.resource.isMultiLanguage);
            setSiteSettings(getSettingStatus.data.resource);
        }
    }, [getSettingStatus]); 
 
    useEffect(() => {
        if (updateSettingStatus.data) {
            if (updateSettingStatus.data.resultCode == ResultCode.Success) {
                setSiteSettings({isOpenToWork: isOpenToWork, isMultiLanguage: isMultiLanguage});
                showDialogModal({
                    message: dictionaryList[locale]["updatedSuccessfully"],
                    onClose: () => {

                    }
                });
            } else {
                showDialogModal({
                    message: dictionaryList[locale]["updatedError"],
                    onClose: () => {

                    }
                });
            }
        }
    }, [updateSettingStatus]); 

    const handleOnSubmit = () => { 
        updateSettings({payload: { isOpenToWork: isOpenToWork, isMultiLanguage: isMultiLanguage  }});
    }
 
    return (
        <>
            <Layout isPublic={false}> 
                <section className="bg-white vh-100-fix position-relative">
                    <div className="contact">
                        <SectionTitle>
                            <ENTranslation>
                                <h1>Site settings</h1>
                            </ENTranslation>
                            <VNTranslation>
                                <h1>Site settings</h1>
                            </VNTranslation>
                        </SectionTitle>
                        <div className="content">
                            {getSettingStatus.isLoading && <PageLoading /> }
                            <div className="row">
                                <div className='form-group col-md-6'><label>Open to work</label></div>
                                <div className='form-group col-md-6 text-end'>
                                    <div className="btn-group btn-toggle">
                                        <button className={"btn " + (isOpenToWork ? "btn-primary active" : "btn-default")} onClick={() => { setIsOpenToWork(true); setSiteSettings({isOpenToWork: true, isMultiLanguage: isMultiLanguage}); } }>ON</button>
                                        <button className={"btn " + (!isOpenToWork ? "btn-primary active" : "btn-default")} onClick={() => { setIsOpenToWork(false); setSiteSettings({isOpenToWork: false, isMultiLanguage: isMultiLanguage}); }}>Off</button>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className='form-group col-md-6'><label>Mutil languages</label></div>
                                <div className='form-group col-md-6 text-end'>
                                    <div className="btn-group btn-toggle">
                                        <button className={"btn " + (isMultiLanguage ? "btn-primary active" : "btn-default")} onClick={() => { setIsMultiLanguage(true); setSiteSettings({isOpenToWork: isOpenToWork, isMultiLanguage: true}); }}>ON</button>
                                        <button className={"btn " + (!isMultiLanguage ? "btn-primary active" : "btn-default")} onClick={() => { setIsMultiLanguage(false); setSiteSettings({isOpenToWork: isOpenToWork, isMultiLanguage: false}); }}>Off</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5 mb-5">
                                <div className="col-12 text-center">
                                    <button className="btn btn-primary " style={{ width: '200px' }} type="submit" onClick={()=>{ handleOnSubmit()}}>Update setting</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default SiteSettings;

