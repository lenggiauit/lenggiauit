import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { Divider, SmallDivider, SpanDivider } from '../../components/divider';
import SectionTitle from '../../components/sectionTitle';
import { ENTranslation, Translation, VNTranslation } from '../../components/translation';
import { ErrorMessage, Field, Form, Formik, FormikHelpers, useFormik, useFormikContext } from "formik";
import { dictionaryList } from '../../locales';
import { useAppContext } from '../../contexts/appContext';
import * as Yup from "yup";
import showDialogModal from '../../components/modal/showModal';
import { useSendContactMutation } from '../../services/cloudFunctions';
import { ResultCode } from '../../utils/enums';
import { ApiRequest, AppSetting } from '../../types/type';
import { logout, setLoggedUser } from '../../utils/functions';
import { useGoogleLogin } from '@react-oauth/google';
let appSetting: AppSetting = require('../../appSetting.json');

interface FormValues {
    accessToken: string
}


const Login: React.FC = (): ReactElement => {
    const { locale } = useAppContext();
    logout();
    const [loginGoogleResponseResult, setLoginGoogleResponseResult] = useState<ResultCode | null>(null);
    const loginGoogle = useGoogleLogin({
        onSuccess: tokenResponse => {
            const access_token = tokenResponse.access_token;
            fetch(appSetting.BaseUrl + "/authenticationV1",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({ payload: { accessToken: access_token } })
                })
                .then(response => response.json())
                .then((jsonData) => {
                    setLoginGoogleResponseResult(jsonData.resultCode);
                    if (jsonData.resultCode == ResultCode.Success) {
                        setLoggedUser(jsonData.resource);
                        window.location.href = "/";
                    }
                }).catch(() => {
                    setLoginGoogleResponseResult(ResultCode.Error);
                    console.log('Error');
                })
        }
    });

    useEffect(() => {


    }, []);


    return (
        <>
            <Layout isPublic={true}>
                <section className="bg-white vh-100-fix">
                    <div className="contact">
                        <SectionTitle>
                            <ENTranslation>
                                <h1>Login</h1>
                            </ENTranslation>
                            <VNTranslation>
                                <h1>Đăng nhập</h1>
                            </VNTranslation>
                        </SectionTitle>
                        <div className="content">
                            <div className="text-center">
                                <button className="btn btn-block btn-danger" onClick={() => { loginGoogle(); }}> 
                                <ENTranslation>
                                        Login with Google
                                    </ENTranslation>
                                    <VNTranslation>
                                        Đăng nhập với Google
                                    </VNTranslation>
                                </button>
                            </div>
                            {loginGoogleResponseResult && loginGoogleResponseResult == ResultCode.Error.valueOf() && <>
                                <hr className="w-30" />
                                <div className="alert alert-danger" role="alert">
                                    <ENTranslation>
                                        Login error, please try again after 1 minute. Thank.
                                    </ENTranslation>
                                    <VNTranslation>
                                        Lỗi, Vui lòng thử lại sau 1 phút. Cảm ơn.
                                    </VNTranslation>
                                </div>
                            </>}
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default Login;

