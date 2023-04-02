import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { Divider, SmallDivider, SpanDivider } from '../../../components/divider';
import SectionTitle from '../../../components/sectionTitle';
import { ENTranslation, Translation, VNTranslation } from '../../../components/translation';
import { ErrorMessage, Field, Form, Formik, FormikHelpers, useFormik, useFormikContext } from "formik";
import { dictionaryList } from '../../../locales';
import { useAppContext } from '../../../contexts/appContext';
import * as Yup from "yup";
import { ResultCode } from '../../../utils/enums';
import { AppSetting } from '../../../types/type';
import { Project } from '../../../services/models/project';
import AddEditCategoryModal from './modal/addEditProject';
import AddEditProjectModal from './modal/addEditProject';
let appSetting: AppSetting = require('../../../appSetting.json');

interface FormValues {
    accessToken: string
}


const Portfolio: React.FC = (): ReactElement => {
    const { locale } = useAppContext();
    const [loginGoogleResponseResult, setLoginGoogleResponseResult] = useState<ResultCode | null>(null);
    const [selecttedProject, setSelecttedProject] = useState<Project>();
    const [isShowModal, setIsShowModal] = useState<boolean>(false);


    useEffect(() => {


    }, []);

    const onAddNewHandler = (dataModel?: Project) => {
        setIsShowModal(true);
    }
    const onCloseHandler = (tempType?: Project) => {
        setIsShowModal(false);
       
    }

    return (
        <>
            <Layout isPublic={false}>
                <section className="bg-white vh-100-fix">
                    <div className="contact">
                        <SectionTitle>
                            <ENTranslation>
                                <h1>Portfolio</h1>
                            </ENTranslation>
                            <VNTranslation>
                                <h1>Portfolio</h1>
                            </VNTranslation>
                        </SectionTitle>
                        <div className="content">
                        {isShowModal && <AddEditProjectModal dataModel={selecttedProject} onClose={onCloseHandler} />}
                            <div className="input-controls text-end">

                                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                    <button type="button" className="btn btn-primary" onClick={() =>{ onAddNewHandler() }}>Add New Project</button>

                                    <div className="btn-group" role="group">
                                        <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Filter
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                            <a className="dropdown-item" href="#">Dropdown link</a>
                                            <a className="dropdown-item" href="#">Dropdown link</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default Portfolio;

