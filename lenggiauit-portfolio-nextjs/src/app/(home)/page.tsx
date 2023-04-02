import React, { ReactElement } from 'react';
import Layout from '../../components/layout';
import SectionTitle from '../../components/sectionTitle';
import { ENTranslation, VNTranslation } from '../../components/translation';
import { Divider } from '../../components/divider';

const Home: React.FC = (): ReactElement => {

  return (
    <>
      <Layout isPublic={true}>
        <section id="about" className="bg-white" >
          {/* <!-- About --> */}
          <div className="about">
            <SectionTitle>
              <ENTranslation>
                <h1>About me</h1>
              </ENTranslation>
              <VNTranslation>
                <h1>Giới thiệu</h1>
              </VNTranslation>
            </SectionTitle>
            <div className="content">
              <div className="block-content margBSmall">
                <div className=" profile margBSmall">
                  <h1>Giau Le</h1>
                  <h3>Full-stack developer</h3>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <ENTranslation>
                      <p>
                        Over 10 years of experience as a Senior .Net Developer using C#, ASP.Net, MVC, API, Swagger, .Net Core,
                        Entity Framework, Redis, React (Typescript), HTML, CSS (Bootstrap), jQuery, MSSQL, MySQL, Web
                        Service, Jira, Agile Scrum methodologies, Monolithic-tier, Microservice architecture, CI/CD automation,
                        OpenID Connect, JWT, OAuth2, and Azure Cloud Services. Able to work as a full-stack developer.
                      </p>
                    </ENTranslation>
                    <VNTranslation>
                      <p>
                        Hơn 10 năm kinh nghiệm với tư cách là Nhà phát triển .Net cấp cao sử dụng C#, ASP.Net, MVC, API, Swagger, .Net Core,
                        Entity Framework, Redis, React (TypeScript), HTML, CSS (Bootstrap), jQuery, MSSQL, MySQL, Web
                        Dịch vụ, Jira, phương pháp Agile Scrum, Monolithic-tier, kiến ​​trúc Microservice, tự động hóa CI/CD,
                        Dịch vụ OpenID Connect, JWT, OAuth2 và Azure Cloud. Có khả năng làm việc như một full-stack developer.
                      </p>
                    </VNTranslation>
                  </div>
                </div> 
                {/* <SmallDivider /> */}
                <br />
                <div className="row">
                  <div className="col-md-12">
                    <i className="bi bi-linkedin" style={{fontSize:18}}></i> <a href="https://www.linkedin.com/in/lenggiauit/" target="_blank">https://www.linkedin.com/in/lenggiauit</a>
                    <br />
                    <i className="bi bi-github" style={{fontSize:18}}></i> <a href="https://github.com/lenggiauit/" target="_blank">https://github.com/lenggiauit</a>
                    
                  </div>
                </div>

              </div>
            </div>
          </div>
          {/* <!-- Experience --> */}
          <div className="experience">
            <SectionTitle>
              <ENTranslation>
                <h1>Experience</h1>
              </ENTranslation>
              <VNTranslation>
                <h1>Kinh nghiệm làm việc</h1>
              </VNTranslation>
            </SectionTitle>
            <div className="content">
              <div className="timeline experience">
                <div className="row ">
                  <div className="col-md-12">
                    <div className="exp-holder margTop">
                      <div className="exp">
                        <div className="hgroup">
                          <h3>Senior Software Development Engineer (.Net)</h3>
                          <h6><i className="bi bi-calendar"></i>March 2021 - <span className="current">Current</span></h6>
                          <h6><i className="bi-geo-alt"></i>Titan Technology - Ho Chi Minh City, Vietnam (remote)</h6>
                        </div>
                        <ol className="list-inside">
                          <li>Implement new features, conduct unit testing, and maintain and troubleshoot issues in software
                            applications using C#, .Net, .Net Core, React, Redis, Web APIs, Microservice architecture, and
                            Entity Framework.</li>
                          <li>Evaluate and review code pull requests, creating efficient deployment pipelines to various
                            environments.</li>
                          <li>Collaborate with the production team to resolve production challenges for the Auvenir company.</li>
                          <li>Perform comprehensive analysis and design of back-end APIs to ensure optimal performance.</li>
                          <li>Work with Azure cloud services, Microsoft single sign-on, Redis, and CI/CD automation.</li>
                          <li>Follow Agile Scrum methodologies.</li>
                        </ol>
                      </div>

                      <div className="exp">
                        <div className="hgroup">
                          <h3>Senior .Net Developer</h3>
                          <h6><i className="bi bi-calendar"></i>May 2013 - January 2021</h6>
                          <h6><i className="bi-geo-alt"></i>Aperia - Ho Chi Minh City, Vietnam</h6>
                        </div>
                        <ol className="list-inside">
                          <li>Collaborated with BA, UI/UX, and Database development teams to develop web applications and
                            APIs using C#, .Net, .Net Core, React, Redis, Monolithic-tier, and MS SQL.</li>
                          <li>Analyzed and developed web applications and web services.</li>
                          <li>Implemented new features, conducted unit testing, and maintained and troubleshot web applications.</li>
                          <li>Conducted technical analysis of requirements.</li>
                          <li>Deployed release packages to QA and UAT environments.</li>
                          <li>Worked with TFS, GIT source control, and Azure services.</li>
                          <li>Assisted the US team in troubleshooting and fixing issues with clients.</li>
                          <li>Followed both Waterfall and Agile Scrum methodologies.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Technical Projects --> */}
          <div className="technical-projects">
            <SectionTitle>
              <ENTranslation>
                <h1>Technical projects</h1>
              </ENTranslation>
              <VNTranslation>
                <h1>Dự án</h1>
              </VNTranslation>
            </SectionTitle>
            <div className="content">
              <div className="timeline technical-projects">
                <div className="row ">
                  <div className="col-md-12">
                    <div className="exp-holder margTop">
                      <div className="exp">
                        <div className="hgroup">
                          <h3>Levvia Project</h3>
                        </div>
                        <ol className="list-inside">
                          <li>Constructed a Smart Audit processing system utilizing a microservice architecture, enabling
                            seamless integration and scalability.</li>
                          <li>Transformed Deloitte's data into actionable working papers.</li>
                          <li>Designed and implemented back-end web APIs using cutting-edge technologies, including C#, .Net
                            Core, Entity Framework, MSSQL, and Redis.</li>
                          <li>Maximized the power of Azure Cloud Services, leveraging Service Bus for communication between
                            services and Azure Blob Storage for efficient user engagement file processing.</li>
                          <li>Developed engaging and intuitive front-end web applications using ReactJs, CSS, Bootstrap, and
                            HTML5.</li>
                          <li>Secured the system with Microsoft Single sign-on authentication for user authentication and access
                            control.</li>
                        </ol>
                      </div>

                      <div className="exp">
                        <div className="hgroup">
                          <h3>GBS Case Management, FDC, Visionweb Project</h3>
                        </div>
                        <ol className="list-inside">
                          <li>Developed a case management system for card processing, merchant acquiring systems, and SaaS
                            using a monolithic-tier architecture.</li>
                          <li>Developed back-end web APIs using C#, .Net Core, ASP.NET, ASP MVC, ASP WebForm,
                            MSSQL, and Redis.</li>
                          <li>Implemented front-end web applications using ReactJs, CSS, Bootstrap, and HTML5.</li>
                          <li>Designed and implemented database structure, procedures, and functions.</li>
                        </ol>
                      </div>

                      <div className="exp">
                        <div className="hgroup">
                          <h3>Na’s Stories</h3>
                          <h6><i className="bi bi-github"></i><a href="https://github.com/lenggiauit/NaStories" target="_blank">https://github.com/lenggiauit/NaStories</a></h6>
                          <h6><i className="bi bi-link"></i><a href="https://nastories.com/" target="_blank">https://nastories.com</a></h6>
                        </div>
                        <ol className="list-inside">
                          <li>Built a website that allows users to register for events, personal blogs, share documents, and chat,...</li>
                          <li>Technologies: .Net Core, .Net API, MS SQL Server, React Typescript, SinalR, Redux Toolkit - RTK
                            Query, React Bootstrap.</li>
                        </ol>
                      </div>

                      <div className="exp">
                        <div className="hgroup">
                          <h3>COVID-19-Tracking</h3>
                          <h6><i className="bi bi-github"></i><a href="https://github.com/lenggiauit/COVID-19-Tracking" target="_blank">https://github.com/lenggiauit/COVID-19-Tracking</a></h6>
                          <h6><i className="bi bi-link"></i><a href="https://covid.nagistar.com/" target="_blank">https://covid.nagistar.com/</a></h6>
                        </div>
                        <ol className="list-inside">
                          <li>Built a web application to track the Covid-19 situation by getting data from WHO API.</li>
                          <li>Technologies: Technologies: .Net Core 3x, React TypeScript, Redux Toolkit - RTK Query, React
                            Bootstrap.</li>
                        </ol>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider />
        </section>

      </Layout>
    </>
  );
}

export default Home;