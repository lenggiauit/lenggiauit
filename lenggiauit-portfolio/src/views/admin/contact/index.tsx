import React, { ReactElement, useEffect, useState } from 'react';
import DataTable, { SortOrder, TableColumn } from 'react-data-table-component';
 
import { v4 } from 'uuid'; 
import { useAppContext } from '../../../contexts/appContext';
import { AppSetting, Paging } from '../../../types/type';
import Layout from '../../../components/layout';
import SectionTitle from '../../../components/sectionTitle';
import { ENTranslation, VNTranslation } from '../../../components/translation';
import { Contact } from '../../../services/models/admin/contact';
import { useArchiveContactMutation, useGetContactListMutation } from '../../../services/admin';
import { ResultCode } from '../../../utils/enums';
let appSetting: AppSetting = require('../../../appSetting.json');



const AdminContact: React.FC = (): ReactElement => {
    const { locale } = useAppContext();
    const [pagingData, setPagingData] = useState<Paging>({ index: 1, size: appSetting.PageSize });  
    const [totalRows, setTotalRows] = useState(0);
    const [sortBy, setSortBy] = useState<string[]>([]);
    const [contactList, setContactList] = useState<Contact[]>([]);
    const [GetContactList, GetContactListStatus] = useGetContactListMutation();
    const [ArchiveContact, ArchiveContactStatus] = useArchiveContactMutation();
    const [IsArchived, setIsArchived] = useState<boolean>(false);

     //get contact list 
     useEffect(() => {
        GetContactList({ payload: { isArchived: IsArchived }, metaData: { paging: pagingData, sortBy: sortBy } });
    }, [pagingData, sortBy]);

    //get contact list status
    useEffect(() => {
        if (GetContactListStatus.isSuccess && GetContactListStatus.data.resource != null) {
            setContactList(GetContactListStatus.data.resource);
        }
    }, [GetContactListStatus]);

    useEffect(() => {
        if (ArchiveContactStatus.isSuccess && ArchiveContactStatus.data.resultCode == ResultCode.Success) {
            GetContactList({ payload: { isArchived: IsArchived }, metaData: { paging: pagingData, sortBy: sortBy } });
        }
    }, [ArchiveContactStatus]);
  
    // Data grid columns
    const columns = [
        {
            id: "Name",
            name: 'Name',
            selector: (row: any) => row.name,
            sortable: true,
        },
        {
            id: "Email",
            name: 'Email',
            selector: (row: any) => row.email,
            sortable: true,
        },
        {
            id: "Subject",
            name: 'Subject',
            selector: (row: any) => row.subject, 
            sortable: false,
        },
        {
            id: "Message",
            name: 'Message',
            selector: (row: any) => row.message, 
            sortable: false,
        },
        {
            name: 'Edit',
            button: true,
            cell: (row: any) => (<button className='btn btn-primary btn-sm' onClick={() => {  ArchiveContact({payload : row.id}) }}>Archive</button>
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
                    <div className="admin-contact">
                        <SectionTitle>
                            <ENTranslation>
                                <h1>Contact list</h1>
                            </ENTranslation>
                            <VNTranslation>
                                <h1>Contact list</h1>
                            </VNTranslation>
                        </SectionTitle>
                        <div className="content">  
                            <DataTable 
                                columns={columns}
                                data={contactList}
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

export default AdminContact;

