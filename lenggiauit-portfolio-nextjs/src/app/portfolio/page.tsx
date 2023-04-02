import React, { ReactElement, useState } from 'react';
import Layout from '../../components/layout';
import { Divider, SmallDivider, SpanDivider } from '../../components/divider';
import SectionTitle from '../../components/sectionTitle';
import { ENTranslation, VNTranslation } from '../../components/translation';

const Portfolio: React.FC = (): ReactElement => {

    return (
        <>
            <Layout isPublic={true}>
                <section id="portfolio" className="bg-white" >
                    {/* <!-- Portfolio --> */}
                    <div className="portfolio">
                        <SectionTitle>
                            <ENTranslation>
                                <h1>My Works</h1>
                            </ENTranslation>
                            <VNTranslation>
                                <h1>Sản phẩm</h1>
                            </VNTranslation>
                        </SectionTitle>
                        <div className="content">
                            <div className="works">
                                <div className="row">
                                    <div className="block-filter tCenter">
                                        <ul id="category" className="filter">
                                            <li><a data-filter="all" href="#" className="active">all</a></li>
                                            <li><a data-filter="web" href="#" className="">Web development</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <SmallDivider />
                            </div>

                            <div className="row">
                             
                                <ul className="work"> 
                                    <li className="col-md-4 "> 
                                        <div className="item web">
                                            <a href="project_single.html">
                                                <div className="desc">
                                                    <h3 className="proj-desc">Project Name
                                                        <SpanDivider /> 
                                                        <span>web design</span></h3>
                                                </div> 
                                                <img alt="" src="assets/images/portfolio/1.jpg" />
                                            </a> 
                                        </div> 
                                    </li> 
                                </ul> 

                            </div>
                        </div>
                    </div>
                    <Divider />
                </section>
            </Layout>
        </>
    );
}

export default Portfolio;