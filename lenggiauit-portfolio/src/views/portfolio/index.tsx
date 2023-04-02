import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { Divider, SmallDivider, SpanDivider } from '../../components/divider';
import SectionTitle from '../../components/sectionTitle';
import { ENTranslation, VNTranslation } from '../../components/translation';
import { useGetProjectListMutation, useGetProjectTypeListMutation } from '../../services/portfolio';
import { AppSetting, Paging } from '../../types/type';
import { Project } from '../../services/models/project';
import { ProjectType } from '../../services/models/projectType';
import { v4 } from 'uuid';
import Pagination from '../../components/pagination';
import PageLoading from '../../components/pageLoading';
import LocalSpinner from '../../components/localSpinner';
let appSetting: AppSetting = require('../../appSetting.json');

const Portfolio: React.FC = (): ReactElement => {
    const [GetProjectList, GetProjectListStatus] = useGetProjectListMutation();
    const [GetProjectTypeList, GetProjectTypeListStatus] = useGetProjectTypeListMutation();
    const [pagingData, setPagingData] = useState<Paging>({ index: 1, size: appSetting.PageSize }); 
    const [isPublish, setIsPublish] = useState<boolean | null>(null);
    const [ProjectList, setProjectList] = useState<Project[]>([]);
    const [totalRows, setTotalRows] = useState(0);
    const [sortBy, setSortBy] = useState<string[]>([]);
    const [ProjectTypeListData, setProjectTypeListData] = useState<ProjectType[]>([]);
    const [Filter, setFilter] = useState<string>("");

    //get project type
    useEffect(() => {
        GetProjectTypeList({ payload: {} });
    }, []);
    //get project type status
    useEffect(() => {
        if (GetProjectTypeListStatus.isSuccess && GetProjectTypeListStatus.data.resource != null) {
            setProjectTypeListData(GetProjectTypeListStatus.data.resource);
        }
    }, [GetProjectTypeListStatus]);

    // get project list
    useEffect(() => {
        GetProjectList({ payload: { projectTypeId: Filter }, metaData: { paging: pagingData, sortBy: sortBy } });
    }, [pagingData, Filter]);
    //get project status
    useEffect(() => {
        if (GetProjectListStatus.isSuccess && GetProjectListStatus.data.resource != null) {
            let data = GetProjectListStatus.data.resource;
            if (data.length > 0) {
                setTotalRows(data[0].totalRows);
            }
            else {
                setTotalRows(0);
            }
            setProjectList(data);
        }
    }, [GetProjectListStatus]);

    const pagingChangeEvent: any = (p: Paging) => {

        let mp: Paging = {
            index: p.index,
            size: p.size 
        }
        setPagingData(mp);
    }

    return (
        <>
            <Layout isPublic={true}>
                <section id="portfolio" className="bg-white" >
                    {/* <!-- Portfolio --> */}
                    <div className="portfolio">
                        <SectionTitle>
                            <ENTranslation>
                                <h1>My Works</h1>
                            </ENTranslation>
                            <VNTranslation>
                                <h1>Sản phẩm</h1>
                            </VNTranslation>
                        </SectionTitle>
                        <div className="content" >
                            {(GetProjectListStatus.isLoading || GetProjectTypeListStatus.isLoading) && <PageLoading /> }
                            <div className="works">
                                <div className="row">
                                    <div className="block-filter tCenter">
                                        <ul id="category" className="filter">
                                            <li><a data-filter="all" href="#" className={Filter == "" ? "active" : ""} onClick={() => { setPagingData({ index: 1, size: appSetting.PageSize }); setFilter(""); }}>All</a></li>
                                            {ProjectTypeListData.map(t => (
                                                <li key={v4()}><a data-filter={t.id} href="#" className={Filter == t.id ? "active" : ""} onClick={() => { setPagingData({ index: 1, size: appSetting.PageSize }); setFilter(t.id); }}>{t.name}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <SmallDivider />
                            </div>
                            <div className="row gap-y">
                                {ProjectList.map(p => (
                                    <div key={v4()} className="col-md-4">
                                        <div className="item web">
                                            <a href={`/portfolio/project/${p.url}`}>
                                                <div className="desc">
                                                    <h3 className="proj-desc">{p.name}
                                                        <SpanDivider />
                                                        <span>{p.projectType.name}</span></h3>
                                                </div>
                                                <img alt={p.name} src={p.image} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <Pagination totalRows={totalRows} pagingData={pagingData} pageChangeEvent={pagingChangeEvent} />
                    </div>
                    <Divider />
                </section>
            </Layout>
        </>
    );
}

export default Portfolio;