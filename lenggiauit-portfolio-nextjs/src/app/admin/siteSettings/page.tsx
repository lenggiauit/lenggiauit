import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../components/layout'; 
import SectionTitle from '../../../components/sectionTitle';
import { ENTranslation,  VNTranslation } from '../../../components/translation'; 
import { dictionaryList } from '../../../locales';
import { useAppContext } from '../../../contexts/appContext'; 
import showDialogModal from '../../../components/modal/showModal';
import { useGetSiteSettingsQuery, useUpdateSettingsMutation } from '../../../services/cloudFunctions';
import { ResultCode } from '../../../utils/enums'; 
import PageLoading from '../../../components/pageLoading'; 
 
interface FormValues {
    accessToken: string
}


const SiteSettings: React.FC = (): ReactElement => {
    const { locale } = useAppContext();
    const [isOpenToWork, setIsOpenToWork] = useState<boolean>(false);
    const [isMultiLanguage, setIsMultiLanguage] = useState<boolean>(false);
    const getSettings = useGetSiteSettingsQuery(null);
    const [updateSettings, updateSettingStatus] = useUpdateSettingsMutation();
 
    const handleOnSubmit = () => {
        updateSettings({payload: { isOpenToWork: isOpenToWork, isMultiLanguage: isMultiLanguage  }});
    }

    useEffect(() => {
        if (updateSettingStatus.data) {
            if (updateSettingStatus.data.resultCode == ResultCode.Success) {
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

    useEffect(() => {
        if (getSettings.data && getSettings.data.resultCode == ResultCode.Success) {
            setIsOpenToWork(getSettings.data.resource.isOpenToWork);
            setIsMultiLanguage(getSettings.data.resource.isMultiLanguage);
        }
    }, [getSettings]); 



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
                            {getSettings.isLoading && <PageLoading /> }
                            <div className="row">
                                <div className='form-group col-md-6'><label>Open to work</label></div>
                                <div className='form-group col-md-6 text-end'>
                                    <div className="btn-group btn-toggle">
                                        <button className={"btn " + (isOpenToWork ? "btn-primary active" : "btn-default")} onClick={() => { setIsOpenToWork(true) }}>ON</button>
                                        <button className={"btn " + (!isOpenToWork ? "btn-primary active" : "btn-default")} onClick={() => { setIsOpenToWork(false) }}>Off</button>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className='form-group col-md-6'><label>Mutil languages</label></div>
                                <div className='form-group col-md-6 text-end'>
                                    <div className="btn-group btn-toggle">
                                        <button className={"btn " + (isMultiLanguage ? "btn-primary active" : "btn-default")} onClick={() => { setIsMultiLanguage(true) }}>ON</button>
                                        <button className={"btn " + (!isMultiLanguage ? "btn-primary active" : "btn-default")} onClick={() => { setIsMultiLanguage(false) }}>Off</button>
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

