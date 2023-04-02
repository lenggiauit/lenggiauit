import React, { ReactElement, useState } from 'react';
import Layout from '../../components/layout';
import SectionTitle from '../../components/sectionTitle';
import { ENTranslation, VNTranslation } from '../../components/translation';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const ChatWithMe: React.FC = (): ReactElement => {
    const loginWithGoogle = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
      });

      
      
    return (
        <>
            <Layout isPublic={true}>
                <section id="chat-with-me" className="bg-white" >
                    {/* <!-- Chat with me --> */}
                    <div className="contact">
                        <SectionTitle>
                            <div className='row'>
                                <div className='col-12'><h1>Chat with me</h1></div>
                                {/* <div className='col-6 text-end mb-2'><a href="#" style={{fontSize: 14, marginRight: 10}} onClick={() =>{googleLogout(); alert(); }}>Logout</a></div> */}
                            </div>

                        </SectionTitle>
                        <div className="content 100-vh" style={{ position: 'relative' }}>
                            <div className="message-container" style={{ display: 'block', minHeight: '672px' }}>
                                <div className="login-panel text-center " >
                                    <p>To chat with me, please login with your google account</p>
                                    <button className="btn btn-block btn-danger" onClick={() => { loginWithGoogle(); }}> Login with Google </button>
                                     
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default ChatWithMe;