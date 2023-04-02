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
import { useCreateEditProjectMutation, useCreateEditProjectTypeMutation } from "../../../../../services/admin";
import PageLoading from "../../../../../components/pageLoading";
import { Project } from "../../../../../services/models/admin/project";
import { ProjectType } from "../../../../../services/models/admin/projectType"; 

interface FormValues {
    id: string,
    name: string,
    isActive: boolean
}

type Props = {
    dataModel?: ProjectType | null,
    onClose: (dataModel?: ProjectType) => void,
}

const AddEditProjectTypeModal: React.FC<Props> = ({ dataModel, onClose }) => {

    const { locale } = useAppContext();  
    const [createEditProjectType, createEditProjectTypeStatus] = useCreateEditProjectTypeMutation();
    const [isActive, setIsActive] = useState<boolean>( dataModel?.isActive?? false);  
    
    const onCancelHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onClose();
    }

    const onCloseHandler: any = () => {
        onClose();
    }

    let initialValues: FormValues =
    {
        id: dataModel?.id ??  uuid.NIL,
        name: dataModel?.name?? "",  
        isActive: dataModel?.isActive?? false
    };

    const validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string().required(dictionaryList[locale]["RequiredField"]).max(50) 
        });
    }
 
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {  
        createEditProjectType({
            payload: {
                id: values.id,
                name: values.name, 
                isActive: isActive
            }
        }); 
    }

    useEffect(() => {
        if (createEditProjectTypeStatus.isSuccess && createEditProjectTypeStatus.data.resultCode == ResultCode.Success) {
            onClose(createEditProjectTypeStatus.data.resource);
        }
    }, [createEditProjectTypeStatus])

    const handleIsActiveClick: React.MouseEventHandler<HTMLLabelElement> = (e) => {
        setIsActive(!isActive);
    }
 
    // 
    return (<>
        {createEditProjectTypeStatus.isLoading && <PageLoading />}
        
        <div className="modal fade show" role="dialog" aria-labelledby="addEditCategoryModalLabel" aria-modal="true"  >
            <div className="modal-dialog modal-lg" style={{maxWidth: 800}} role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h6 className="modal-title" id="createEditProjectModalLabel">
                            {!dataModel && "Add new project type"}
                            {dataModel &&  "Edit project type"}
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
                                        <Field type="checkbox" className="form-check-input" id="isActive" name="isActive" checked={isActive} />
                                        <label className="form-check-label" htmlFor="isActive" 
                                        onClick={handleIsActiveClick} ><Translation tid="Active" /></label>  
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

export default AddEditProjectTypeModal;