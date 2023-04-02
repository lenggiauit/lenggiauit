import { ErrorMessage, Field, Form, Formik, FormikHelpers, useFormikContext } from "formik";
import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../../../../contexts/appContext"; 
import * as Yup from "yup";
import { dictionaryList } from "../../../../../locales"; 
import { ResultCode } from "../../../../../utils/enums"; 
import * as uuid from "uuid";   
import { Translation } from "../../../../../components/translation";  
import { GlobalKeys } from "../../../../../utils/constants";
import { useUploadImageMutation } from "../../../../../services/fileService";
import { useCreateEditProjectMutation } from "../../../../../services/admin";
import PageLoading from "../../../../../components/pageLoading";
import { Project } from "../../../../../services/models/admin/project";
import { ProjectType } from "../../../../../services/models/admin/projectType"; 
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertFromHTML, EditorProps, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";  
import htmlToDraft from 'html-to-draftjs';  
import { AppSetting } from "../../../../../types/type";
import { stateToHTML } from 'draft-js-export-html'; 
let appSetting: AppSetting = require('../../../../../appSetting.json');

interface FormValues {
    id: string,
    name: string, 
    image: string,
    link: any,
    description: string,
    isPublic: boolean,
    projectTypeId: any,
    technologies: any
}

type Props = {
    dataModel?: {project?: Project | null, projectType: ProjectType[]},
    onClose: (dataModel?: Project) => void,
}

const AddEditProjectModal: React.FC<Props> = ({ dataModel, onClose }) => {

    const { locale, authenticateUser } = useAppContext(); 
    const [project, setProject] = useState<Project | null>(dataModel?.project?? null);
    const [createEditProject, createEditProjectStatus] = useCreateEditProjectMutation();
    const [isPublic, setIsPublic] = useState<boolean>( dataModel?.project?.isPublic?? false); 
    const [CurrentProjectTypeID, setCurrentProjectTypeID] = useState<any>( dataModel?.project?.projectType.id?? ""); 
    const [uploadFile, uploadData] = useUploadImageMutation();
    const [currentThumbnail, setCurrentThumbnail] = useState<string>(dataModel?.project?.image != null ? dataModel?.project?.image : GlobalKeys.ProjectNoThumbnailUrl);
    const blocksFromHTML = htmlToDraft(dataModel?.project?.description != null? dataModel?.project?.description.replace(/(<\/?)figure((?:\s+.*?)?>)/g, '$1div$2'): "");
     
    const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks);
    const [editorState, setEditorState] = React.useState(
        EditorState.createWithContent(contentState) );
    const [editorContent, setEditorContent] = useState<any>();

    const onCancelHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onClose();
    }

    const onCloseHandler: any = () => {
        onClose();
    }

    let initialValues: FormValues =
    {
        id: dataModel?.project?.id ??  uuid.NIL,
        name: dataModel?.project?.name?? "",
        description: dataModel?.project?.description?? "",
        image: dataModel?.project?.image?? "",
        link: dataModel?.project?.link?? "",
        isPublic: dataModel?.project?.isPublic?? false,
        projectTypeId: dataModel?.project?.projectType.id?? uuid.NIL,
        technologies: dataModel?.project?.technologies?? "",
    };

    const validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string().required(dictionaryList[locale]["RequiredField"]).max(50), 
            // link: Yup.string().required(dictionaryList[locale]["RequiredField"]),
            //description: Yup.string().required(dictionaryList[locale]["RequiredField"]).max(5000), 
            projectTypeId: Yup.string().required(dictionaryList[locale]["RequiredField"]),
            technologies: Yup.string().required(dictionaryList[locale]["RequiredField"]),
        });
    }
 
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {  
        createEditProject({
            payload: {
                id: values.id,
                name: values.name,
                image: currentThumbnail,
                link: values.link,
                description: editorContent,
                isPublic: isPublic,
                projectTypeId: values.projectTypeId,
                technologies: values.technologies,
            }
        }); 
    }

    useEffect(() => {
        if (createEditProjectStatus.isSuccess && createEditProjectStatus.data.resultCode == ResultCode.Success) {
            onClose(createEditProjectStatus.data.resource);
        }
    }, [createEditProjectStatus])

    const handleIsPublicClick: React.MouseEventHandler<HTMLLabelElement> = (e) => {
        setIsPublic(!isPublic);
    }

    const inputFileUploadRef = useRef<HTMLInputElement>(null);

    const handleSelectFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let file = e.target.files?.item(0);
        if (file) {
            const formData = new FormData();
            formData.append("file", file!);
            uploadFile(formData);
        }
    }
  
    useEffect(() => {
        if (uploadData.data && uploadData.data.resultCode == ResultCode.Success) {
            setCurrentThumbnail(uploadData.data.resource.url);
        }
    }, [uploadData.data]);

    const uploadCallback = async (file: any) => {
        return new Promise((resolve, reject) => {
            if (file) {
                const formData = new FormData();
                formData.append("file", file); 
                const headers: HeadersInit = { 
                    'X-Request-Id': uuid.v4().toString(),
                    'Authorization': `Bearer ${authenticateUser?.accessToken}`
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
     
    useEffect(() => {
        setEditorContent(stateToHTML(editorState.getCurrentContent()));

    }, [editorState]);
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
                                        <Field as="select" type="select" name="projectTypeId"
                                            className="form-control" placeholder="Project type" 
                                            > 
                                             <option value="" label="Select a Project type">Select a Project type</option>
                                            {dataModel?.projectType.map((type) => (
                                                <option key={uuid.v4()} value={type.id} >{type.name}</option>
                                            ))}
                                            
                                        </Field>
                                        <ErrorMessage
                                            name="projectTypeId"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
                                    <div className="form-group"> 
                                        <Field type="text" className="form-control" name="link" placeholder="link" />
                                        <ErrorMessage
                                            name="link"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
                                    <div className="form-group"> 
                                        <Field type="text" className="form-control" name="technologies" placeholder="technologies" />
                                        <ErrorMessage
                                            name="technologies"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <div className="border" style={{ height: 255, overflow: 'auto' }}>
                                            <Editor wrapperClassName="nsEditorClassName"
                                                editorState={editorState} toolbar={{ image: { uploadEnabled: true, uploadCallback: uploadCallback, previewImage: true } }}
                                                onEditorStateChange={setEditorState}
                                            />
                                        </div> 
                                        <ErrorMessage
                                            name="description"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />  
                                    </div>
                                     
                                    <div className="form-group"> 
                                        <Field type="checkbox" className="form-check-input" id="isPublic" name="isPublic" checked={isPublic} />
                                        <label className="form-check-label" htmlFor="isPublic" 
                                        onClick={handleIsPublicClick} ><Translation tid="Public" /></label>  
                                    </div>
                                    <div className="modal-footer border-0 pr-0 pl-0">
                                        <button type="button" className="btn btn-secondary" onClick={onCancelHandler} data-dismiss="modal"><Translation tid="btnClose" /></button>
                                        <button type="submit" className="btn btn-primary" >
                                            {dataModel?.project && <Translation tid="btnSave" />}
                                            {!dataModel?.project && <Translation tid="btnCreate" />}
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

 