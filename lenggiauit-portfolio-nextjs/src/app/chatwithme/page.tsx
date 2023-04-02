import React, { ReactElement, useState } from 'react'; 
import Layout from '../../components/layout';  
import SectionTitle from '../../components/sectionTitle';
import { ENTranslation, VNTranslation } from '../../components/translation';
  
const ChatWithMe: React.FC = (): ReactElement => {
      
    return (
        <>
            <Layout isPublic={true}>
            <section id="chat-with-me" className="bg-white" >
                    {/* <!-- Chat with me --> */}
                    <div className="contact">
                        <SectionTitle>
                            <ENTranslation>
                                <h1>Chat with me</h1>
                            </ENTranslation>
                            <VNTranslation>
                                <h1>Trò chuyện</h1>
                            </VNTranslation>
                        </SectionTitle>
                        <div className="content">
                            Under development
                        </div>
                    </div>
                </section>
            </Layout> 
        </>
    );
}

export default ChatWithMe;