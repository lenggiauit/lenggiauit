import React, { ReactElement } from 'react';
import { ENTranslation, Translation, VNTranslation } from '../../components/translation';
import Layout from '../../components/layout';
import SectionTitle from '../../components/sectionTitle';


const NotFoundPage: React.FC = (): ReactElement => {

    return (
        <>
            <Layout isPublic={true}>
                <section className="bg-white vh-100-fix">
                    <div className="contact">
                        <SectionTitle>
                            <ENTranslation>
                                <h1>Page not found</h1>
                            </ENTranslation>
                            <VNTranslation>
                                <h1>Không tìm thấy trang</h1>
                            </VNTranslation>
                        </SectionTitle>
                        <div className="content">
                            <div className="text-center">
                                <a className="btn btn-secondary w-200 mr-6" href="#" onClick={() => { window.history.back() }}><Translation tid="Goback" /></a>
                                &nbsp; &nbsp;
                                <a className="btn btn-secondary w-200" href="/"><Translation tid="ReturnHome" /></a>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default NotFoundPage;