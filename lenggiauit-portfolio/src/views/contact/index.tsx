import React, { ReactElement, useEffect } from 'react';
import Layout from '../../components/layout';
import { Divider } from '../../components/divider';
import SectionTitle from '../../components/sectionTitle';
import { ENTranslation, VNTranslation } from '../../components/translation';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { dictionaryList } from '../../locales';
import { useAppContext } from '../../contexts/appContext';
import * as Yup from "yup";
import showDialogModal from '../../components/modal/showModal';
import { ResultCode } from '../../utils/enums';
import { useSendContactMutation } from '../../services/home';

interface FormValues {
    name: string,
    email: string,
    subject: string,
    message: string
}

const Contact: React.FC = (): ReactElement => {
    const { locale } = useAppContext();
    const [sendContact, sendContactStatus] = useSendContactMutation();

    let initialValues: FormValues =
    {
        name: "",
        email: "",
        subject: "",
        message: ""
    };

    const validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string().required(dictionaryList[locale]["RequiredField"]),
            email: Yup.string().email()
                .required(dictionaryList[locale]["RequiredField"]),
            subject: Yup.string()
                .required(dictionaryList[locale]["RequiredField"]),
            message: Yup.string()
                .required(dictionaryList[locale]["RequiredField"])

        });
    }

    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        sendContact({ payload: { name: values.name, email: values.email, subject: values.subject, message: values.message } });
    }

    useEffect(() => {
        if (sendContactStatus.data) {
            if (sendContactStatus.data.resultCode == ResultCode.Success) {
                showDialogModal({
                    message: dictionaryList[locale]["sendContact_success"]
                });
            } else {
                showDialogModal({
                    message: dictionaryList[locale]["sendContact_error"] 
                });
            }
        }

    }, [sendContactStatus]);


    return (
        <>
            <Layout isPublic={true}>
                <section id="contact" className="bg-white" >
                    {/* <!-- Contact Information --> */}
                    <div className="contact">
                        <SectionTitle>
                            <ENTranslation>
                                <h1>Contact Information</h1>
                            </ENTranslation>
                            <VNTranslation>
                                <h1>Thông tin liên hệ</h1>
                            </VNTranslation>
                        </SectionTitle>
                        <div className="content">
                            <div className="block-info">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="info-holder margTMedium">
                                            <div className="address-info">
                                                <i className="bi bi-geo-alt"></i>
                                                <p>Toronto, Ontario, Canada</p>
                                            </div>
                                            <div className="contact-info tCenter">
                                                <ul>
                                                    <li>
                                                        <div className="ico"><i className="bi bi-envelope-at"></i></div>
                                                        <p>Email:<a href='mailto:lenggiauit@gmail.com'>lenggiauit@gmail.com</a> </p></li>
                                                    <li><div className="ico"><i className="bi bi-telephone"></i></div>
                                                        <p>Tel: <a href='tel:+ 4372687475'>+ 437-268-7475</a></p></li>
                                                    <li><div className="ico"><i className="bi bi-link"></i></div>
                                                        <p>Web: <a href="https://lenggiauit.com">https://lenggiauit.com</a></p></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="send-me-an-email">
                        <SectionTitle>
                            <ENTranslation>
                                <h1>Send me an email</h1>
                            </ENTranslation>
                            <VNTranslation>
                                <h1>Gửi thư cho tôi</h1>
                            </VNTranslation>
                        </SectionTitle>
                        <div className="content">
                            <div className="block-contact margBSSmall">
                                <Formik initialValues={initialValues}
                                    onSubmit={handleOnSubmit}
                                    validationSchema={validationSchema}
                                    validateOnChange={false}  >
                                    {({ values, errors, touched }) => (
                                        <Form className="contact-form row g-2 " autoComplete="off">

                                            <div className="form-group col-md-6 mb-3">
                                                <Field type="text" className={`${(errors.name && touched.name) ? "form-control is-invalid" : "form-control"}`} name="name" placeholder="Name" />
                                                <ErrorMessage
                                                    name="name"
                                                    component="div"
                                                    className="alert alert-field alert-danger"
                                                />
                                            </div>

                                            <div className="form-group col-md-6 mb-3">
                                                <Field type="text" className={`${(errors.email && touched.email) ? "form-control is-invalid" : "form-control"}`} name="email" placeholder="Email" />
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="alert alert-field alert-danger"
                                                />
                                            </div>

                                            <div className="form-group col-md-12 mb-3">
                                                <Field type="text" className={`${(errors.name && touched.name) ? "form-control is-invalid" : "form-control"}`} name="subject" placeholder="Subject" />
                                                <ErrorMessage
                                                    name="subject"
                                                    component="div"
                                                    className="alert alert-field alert-danger"
                                                />
                                            </div>

                                            <div className="form-group col-md-12 mb-3">
                                                <Field type="textarea" as="textarea" style={{ height: 150 }} className={`${(errors.name && touched.name) ? "form-control is-invalid" : "form-control"}`} name="message" placeholder="Message" />
                                                <ErrorMessage
                                                    name="message"
                                                    component="div"
                                                    className="alert alert-field alert-danger"
                                                />
                                            </div>

                                            <div className="col-12 text-center mb-3">
                                                <button className="btn btn-primary " style={{ width: '100%' }} type="submit">Send your email</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>

                        </div>
                    </div>

                    <Divider />
                </section>
            </Layout>
        </>
    );
}

export default Contact; 