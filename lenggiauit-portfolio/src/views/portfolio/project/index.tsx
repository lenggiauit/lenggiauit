import React, { ReactElement, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { AppSetting } from '../../../types/type';
import Layout from '../../../components/layout';
import SectionTitle from '../../../components/sectionTitle';
import { ENTranslation, VNTranslation } from '../../../components/translation';
import { Divider } from '../../../components/divider';
import { matchPath, useParams, useRouteMatch } from 'react-router-dom';
import { useGetProjectDetailQuery } from '../../../services/portfolio';
import PageLoading from '../../../components/pageLoading';
import { ResultCode } from '../../../utils/enums';
let appSetting: AppSetting = require('../../../appSetting.json');

const ProjectDetail: React.FC = (): ReactElement => {
    const route = useRouteMatch();
    const { id }: any = useParams();
    const match = matchPath(route.url, {
        path: "/portfolio/project/:id",
        exact: true,
        strict: false
    });

    useEffect(() => {
        if (match == null) {
            window.location.href = "/notfound";
        }
    }, [])

    const getProjectDetail = useGetProjectDetailQuery({ payload: id });

    return (
        <>
            <Layout isPublic={true}>
                <section id="project-detail" className="bg-white" >
                    <div className="project-detail">
                        <SectionTitle>
                           
                                 <i className="bi bi-chevron-left"></i> <a href="/portfolio"> Portfolio </a> 
                            
                        </SectionTitle>
                        <div className="content">
                            {getProjectDetail.isLoading && < PageLoading />}
                            {getProjectDetail.data && getProjectDetail.data.resource != null && getProjectDetail.data?.resultCode == ResultCode.Success &&
                                <>
                                    <div className="col-md-12">
                                        <h1 className="large-title mb-4">Project
                                            <br />{getProjectDetail.data.resource.name}</h1>
                                        <ul>
                                            <li><strong>Project Type</strong>: {getProjectDetail.data.resource.projectType.name}</li>
                                            <li><strong>Technologies </strong>: {getProjectDetail.data.resource.technologies}</li>
                                            <li> <strong>Link</strong>: {getProjectDetail.data.resource.link}</li>
                                        </ul>
                                        <div className=" mt-4 text-center">
                                            <img className="mx-auto d-block" src={getProjectDetail.data.resource.image} alt={getProjectDetail.data.resource.name} />
                                        </div> 
                                        <div className="mt-4"> 
                                            <div className="mb-4"  dangerouslySetInnerHTML={{ __html: getProjectDetail.data.resource.description }}></div>
                                        </div>

                                    </div> 
                                </>
                            }
                        </div>
                    </div>
                    <Divider />
                </section>
            </Layout>
        </>
    );
}

export default ProjectDetail;