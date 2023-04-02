import React, { ReactElement, useEffect, useState } from 'react'; 
import DataTable, { SortOrder, TableColumn } from 'react-data-table-component'; 
import Layout from '../../../../components/layout'; 
import SectionTitle from '../../../../components/sectionTitle';
import { ENTranslation, Translation, VNTranslation } from '../../../../components/translation'; 
import { useAppContext } from '../../../../contexts/appContext'; 
import { AppSetting, Paging } from '../../../../types/type'; 
import AddEditProjectTypeModal from './modal/addEditProjectType';
import { useGetProjectListMutation, useGetProjectTypeListMutation } from '../../../../services/admin';
import { Project } from '../../../../services/models/admin/project';
import { ProjectType } from '../../../../services/models/admin/projectType';
import { v4 } from 'uuid';
let appSetting: AppSetting = require('../../../../appSetting.json');


const Portfolio_ProjectType: React.FC = (): ReactElement => {
    const { locale } = useAppContext();
    const [selectedProjectType, setSelectedProjectType] = useState<ProjectType | null>(null);
    const [isShowModal, setIsShowModal] = useState<boolean>(false); 
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
        GetProjectTypeList({ payload: {  isActive: null} });
    }, []);
    //get project type status
    useEffect(() => {
        if (GetProjectTypeListStatus.isSuccess && GetProjectTypeListStatus.data.resource != null) {
            setProjectTypeListData(GetProjectTypeListStatus.data.resource);
        }
    }, [GetProjectTypeListStatus]);

    // open modal project 
    const onAddNewHandler = (dataModel?: ProjectType) => {
        setIsShowModal(true);
        setSelectedProjectType(null);
    }
    // close modal project 
    const onCloseHandler = (dataModel?: ProjectType) => {
        setIsShowModal(false);
        if(dataModel != null){
            GetProjectTypeList({ payload: {  isActive: null} });
        } 
    }
    // Data grid columns
    const columns = [ 
        {
            id: "Name",
            name: 'Name',
            selector: (row: any) => row.name,
            sortable: true,
        }, 
        {
            id: "Active",
            name: 'Active',
            selector: (row: any) => row.isActive,
            cell: (row: any) => (row.isActive ? "true" : "false"),
            sortable: false,
        }, 
        {
            name: 'Edit',
            button: true,
            cell: (row: any) => (<button className='btn btn-primary btn-sm' onClick={() => { setSelectedProjectType(ProjectTypeListData.find(p => p.id == row.id)?? null); setIsShowModal(true); }}>Edit</button>
            )
        },
         
    ];  
    return (
        <>
            <Layout isPublic={false}>
                <section className="bg-white vh-100-fix">
                    <div className="portfolio-project-type">
                        <SectionTitle>
                            <ENTranslation>
                                <h1>Portfolio</h1>
                            </ENTranslation>
                            <VNTranslation>
                                <h1>Portfolio</h1>
                            </VNTranslation>
                        </SectionTitle>
                        <div className="content">
                            {isShowModal && <AddEditProjectTypeModal dataModel={selectedProjectType} onClose={onCloseHandler} />}
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
                                title="Project type"
                                columns={columns}
                                data={ProjectTypeListData} 
                                pagination 
                                paginationTotalRows={totalRows} 
                            /> 
                        </div>
                    </div> 
                </section>
            </Layout>
        </>
    );
}

export default Portfolio_ProjectType;

