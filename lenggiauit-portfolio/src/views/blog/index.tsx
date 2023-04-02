import React, { ReactElement } from 'react';
import Layout from '../../components/layout';
import SectionTitle from '../../components/sectionTitle';
import { ENTranslation, VNTranslation } from '../../components/translation';

const Blog: React.FC = (): ReactElement => {

    return (
        <>
            <Layout isPublic={true}>
                <section id="blog" className="bg-white" >
                    {/* <!-- Blog --> */}
                    <div className="contact">
                        <SectionTitle>
                            <ENTranslation>
                                <h1>Blog</h1>
                            </ENTranslation>
                            <VNTranslation>
                                <h1>Bài viết</h1>
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

export default Blog;