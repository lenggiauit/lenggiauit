import React, { ReactElement, useEffect, useState } from 'react';
import DataTable, { SortOrder, TableColumn } from 'react-data-table-component';
import Layout from '../../../../components/layout';
import SectionTitle from '../../../../components/sectionTitle';
import { ENTranslation, Translation, VNTranslation } from '../../../../components/translation';
import { useAppContext } from '../../../../contexts/appContext';
import { AppSetting, Paging } from '../../../../types/type';
import AddEditProjectModal from './modal/addEditProject';
import { useGetProjectListMutation, useGetProjectTypeListMutation } from '../../../../services/admin';
import { Project } from '../../../../services/models/admin/project';
import { ProjectType } from '../../../../services/models/admin/projectType';
import { v4 } from 'uuid';
let appSetting: AppSetting = require('../../../../appSetting.json');


const Portfolio_Project: React.FC = (): ReactElement => {
    const { locale } = useAppContext();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [GetProjectList, GetProjectListStatus] = useGetProjectListMutation();
    const [GetProjectTypeList, GetProjectTypeListStatus] = useGetProjectTypeListMutation();
    const [pagingData, setPagingData] = useState<Paging>({ index: 1, size: appSetting.PageSize });
    const [projectTypeId, setProjectTypeId] = useState<any | null>(null);
    const [isPublish, setIsPublish] = useState<boolean | null>(null);
    const [ProjectList, setProjectList] = useState<Project[]>([]);
    const [totalRows, setTotalRows] = useState(0);
    const [sortBy, setSortBy] = useState<string[]>([]);
    const [ProjectTypeListData, setProjectTypeListData] = useState<ProjectType[]>([]);

    //get project type
    useEffect(() => {
        GetProjectTypeList({ payload: { isActive: true } });
    }, []);
    //get project type status
    useEffect(() => {
        if (GetProjectTypeListStatus.isSuccess && GetProjectTypeListStatus.data.resource != null) {
            setProjectTypeListData(GetProjectTypeListStatus.data.resource);
        }
    }, [GetProjectTypeListStatus]);

    // get project list
    useEffect(() => {
        GetProjectList({ payload: { projectTypeId: projectTypeId, isPublish: isPublish }, metaData: { paging: pagingData, sortBy: sortBy } });
    }, [pagingData, projectTypeId]);
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
    // open modal project 
    const onAddNewHandler = (dataModel?: Project) => {
        setSelectedProject(null);
        setIsShowModal(true);
    }
    // close modal project 
    const onCloseHandler = (dataModel?: Project) => {
        setIsShowModal(false);
        if (dataModel != null) {
            GetProjectList({ payload: { projectTypeId: projectTypeId, isPublish: isPublish }, metaData: { paging: pagingData, sortBy: sortBy } });
        }
    }
    // Data grid columns
    const columns = [
        {
            id: "Name",
            name: 'Project Name',
            selector: (row: any) => row.name,
            sortable: true,
        },
        {
            id: "ProjectTypeName",
            name: 'Project Type',
            selector: (row: any) => row.projectType.name,
            sortable: false,
        },
        {
            id: "Public",
            name: 'Public',
            selector: (row: any) => row.isPublic,
            cell: (row: any) => (row.isPublic ? "true" : "false"),
            sortable: false,
        },
        {
            name: 'Edit',
            button: true,
            cell: (row: any) => (<button className='btn btn-primary btn-sm' onClick={() => { setSelectedProject(ProjectList.find(p => p.id == row.id) ?? null); setIsShowModal(true); }}>Edit</button>
            )
        },
    ];

    // page changing
    const handlePageChange = (page: number) => {
        let mp: Paging = {
            index: page,
            size: pagingData.size
        }
        setPagingData(mp);
    };

    // page size changing
    const handlePerRowsChange = async (newPerPage: number, page: any) => {

        let mp: Paging = {
            index: page,
            size: newPerPage
        }
        setPagingData(mp);
    };
    // sorting
    const handleSort = (selectedColumn: TableColumn<any>, sortDirection: SortOrder, sortedRows: any[]) => {
        setSortBy([`${selectedColumn.id} ${sortDirection}`])
    };


    return (
        <>
            <Layout isPublic={false}>
                <section className="bg-white vh-100-fix">
                    <div className="portfolio-project">
                        <SectionTitle>
                            <ENTranslation>
                                <h1>Portfolio</h1>
                            </ENTranslation>
                            <VNTranslation>
                                <h1>Portfolio</h1>
                            </VNTranslation>
                        </SectionTitle>
                        <div className="content">
                            {isShowModal && <AddEditProjectModal dataModel={{ project: selectedProject, projectType: ProjectTypeListData }} onClose={onCloseHandler} />}
                            <div className="input-controls text-end"> 
                                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                    <button type="button" className="btn btn-primary" onClick={() => { onAddNewHandler() }}>Add New Project</button>

                                    <div className="btn-group" role="group">
                                        <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Filter
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                            <a className="dropdown-item" onClick={() => { setProjectTypeId('') }} href="#">All</a>
                                            {ProjectTypeListData.map(pt =>
                                                <a key={v4()} className="dropdown-item" onClick={() => { setProjectTypeId(pt.id) }} href="#">{pt.name}</a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <DataTable
                                title="Projects"
                                columns={columns}
                                data={ProjectList}
                                onSort={handleSort}
                                pagination
                                paginationServer
                                paginationTotalRows={totalRows}
                                onChangeRowsPerPage={handlePerRowsChange}
                                onChangePage={handlePageChange}
                            /> 
                        </div>
                    </div> 
                </section>
            </Layout>
        </>
    );
}

export default Portfolio_Project;

