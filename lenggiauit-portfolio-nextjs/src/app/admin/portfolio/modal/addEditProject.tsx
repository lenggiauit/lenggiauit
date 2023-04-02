import { ErrorMessage, Field, Form, Formik, FormikHelpers, useFormik, useFormikContext } from "formik";
import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../../../contexts/appContext"; 
import * as Yup from "yup";
import { dictionaryList } from "../../../../locales";
import { AppSetting } from "../../../../types/type";
import { ResultCode } from "../../../../utils/enums"; 
import * as uuid from "uuid";  
import { getLoggedUser } from "../../../../utils/functions";
import { Translation } from "../../../../components/translation";
import PageLoading from "../../../../components/pageLoading";
import { Project } from "../../../../services/models/project";
import { useCreateEditProjectMutation } from "../../../../services/cloudFunctions";
import { GlobalKeys } from "../../../../utils/constants";

let appSetting: AppSetting = require('../../../../appSetting.json');

interface FormValues {
    id: string,
    name: string, 
    image: string,
    url: any,
    description: string,
    isArchived: boolean
}

type Props = {
    dataModel?: Project,
    onClose: (dataModel?: Project) => void,
}

const AddEditProjectModal: React.FC<Props> = ({ dataModel, onClose }) => {

    const { locale } = useAppContext();
    const formikProps = useFormikContext();
    const [project, setProject] = useState<Project | undefined>(dataModel);
    const [createEditProject, createEditProjectStatus] = useCreateEditProjectMutation();
    const [isArchived, setIsArchived] = useState<boolean>(dataModel != null ? dataModel.isArchived : false); 
   // const [uploadFile, uploadData] = useUploadImageMutation();
    const [currentThumbnail, setCurrentThumbnail] = useState<string>(dataModel?.image ?? GlobalKeys.NoThumbnailUrl);
    const onCancelHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onClose();
    }

    const onCloseHandler: any = () => {
        onClose();
    }

    let initialValues: FormValues =
    {
        id: (dataModel == null ? uuid.NIL : dataModel.id),
        name: (dataModel != null ? dataModel?.name : ""),
        description: (dataModel != null ? dataModel?.description : ""),
        image: (dataModel != null ? dataModel?.image : ""),
        url: (dataModel != null ? dataModel?.url : ""),
        isArchived: (dataModel != null ? dataModel.isArchived : false),
    };

    const validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string().required(dictionaryList[locale]["RequiredField"]).max(50),
            image: Yup.string().required(dictionaryList[locale]["RequiredField"]),
            url: Yup.string().required(dictionaryList[locale]["RequiredField"]),
            description: Yup.string().required(dictionaryList[locale]["RequiredField"]).max(5000), 
        });
    }
 
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => { 
        createEditProject({
            payload: {
                id: values.id,
                name: values.name,
                image: values.image,
                url: values.url,
                description: values.description,
                isArchived: isArchived
            }
        }); 
    }

    useEffect(() => {
        if (createEditProjectStatus.isSuccess && createEditProjectStatus.data.resultCode == ResultCode.Success) {
            onClose(createEditProjectStatus.data.resource);
        }
    }, [createEditProjectStatus])

    const handleArchivedClick: React.MouseEventHandler<HTMLLabelElement> = (e) => {
        setIsArchived(!isArchived);
    }

    const inputFileUploadRef = useRef<HTMLInputElement>(null);

    const handleSelectFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let file = e.target.files?.item(0);
        if (file) {
            const formData = new FormData();
            formData.append("file", file!);
            //uploadFile(formData);
        }
    }
 
    const uploadCallback = async (file: any) => {
        return new Promise((resolve, reject) => {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const currentUser = getLoggedUser();
                const headers: HeadersInit = {
                    // 'Content-Type': 'multipart/form-data',
                    'X-Request-Id': uuid.v4().toString(),
                    'Authorization': `Bearer ${currentUser?.accessToken}`
                };
                const opts: RequestInit = {
                    method: 'POST',
                    headers,
                    body: formData
                };
                fetch(appSetting.BaseUrl + "file/uploadImage", opts)
                    .then(response => response.json())
                    .then((json) => {
                        if (json.resultCode == ResultCode.Success)
                            resolve({ data: { link: json.resource.url } });
                        else
                            reject();
                    }).catch(() => {
                        reject();
                    })
            }
        });
    }

    // useEffect(() => {
    //     if (uploadData.data && uploadData.data.resultCode == ResultCode.Success) {
    //         setCurrentThumbnail(uploadData.data.resource.url);
    //     }
    // }, [uploadData.data]);
     
    // 
    return (<>
        {createEditProjectStatus.isLoading && <PageLoading />}
        
        <div className="modal fade show" role="dialog" aria-labelledby="addEditCategoryModalLabel" aria-modal="true"  >
            <div className="modal-dialog modal-lg" style={{maxWidth: 800}} role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h6 className="modal-title" id="createEditProjectModalLabel">
                            {!dataModel && "Add new project"}
                            {dataModel &&  "Edit project"}
                        </h6>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCloseHandler} >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body pb-0 pt-5">
                        <Formik initialValues={initialValues}
                            onSubmit={handleOnSubmit}
                            validationSchema={validationSchema}
                            validateOnChange={false}  >
                            {({ values, errors, touched }) => (
                                <Form autoComplete="off">
                                    <div className="form-group align-items-center text-center">
                                        <img src={currentThumbnail} alt={"Thumbnail"} className="thumbnail-upload-img" width="350" />
                                        <div className="profile-avatar-edit-link-container mt-4">
                                            <input type="file" name="image" ref={inputFileUploadRef} onChange={handleSelectFile} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <Field type="hidden" name="id" />
                                        <Field type="text" className="form-control" name="name" placeholder="name" />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Field type="textarea" as="textarea" row={7} className="form-control" name="description" placeholder="description" />
                                        <ErrorMessage
                                            name="description"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
                                     
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <Field type="checkbox" className="custom-control-input" name="isArchived" checked={isArchived} />
                                            <label className="custom-control-label" onClick={handleArchivedClick} ><Translation tid="archived" /></label>
                                        </div>
                                    </div>
                                    <div className="modal-footer border-0 pr-0 pl-0">
                                        <button type="button" className="btn btn-secondary" onClick={onCancelHandler} data-dismiss="modal"><Translation tid="btnClose" /></button>
                                        <button type="submit" className="btn btn-primary" >
                                            {dataModel && <Translation tid="btnSave" />}
                                            {!dataModel && <Translation tid="btnCreate" />}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default AddEditProjectModal;