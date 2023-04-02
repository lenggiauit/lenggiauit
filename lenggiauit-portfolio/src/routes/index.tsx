import React, { ReactElement, Suspense, lazy } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import GlobalSpinner from "../components/globalSpinner";
import NagistarLoading from "../components/nagistarLoading";
 
import history from "../utils/history";
var delayTime = 500;

const Home = lazy(() => {
    return Promise.all([
        import("../views/home"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Resume = lazy(() => {
    return Promise.all([
        import("../views/resume"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Portfolio = lazy(() => {
    return Promise.all([
        import("../views/portfolio"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});
 
const Blog = lazy(() => {
    return Promise.all([
        import("../views/blog"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Contact = lazy(() => {
    return Promise.all([
        import("../views/contact"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const ChatWithMe = lazy(() => {
    return Promise.all([
        import("../views/chatwithme"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Login = lazy(() => {
    return Promise.all([
        import("../views/login"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const ProjectDetail = lazy(() => {
    return Promise.all([
        import("../views/portfolio/project"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Page404 = lazy(() => {
    return Promise.all([
        import("../views/pageNotFound"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
});
 
// Admin 

const AdminSiteSettings = lazy(() => {
    return Promise.all([
        import("../views/admin/siteSettings"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
}); 

const AdminProjectType = lazy(() => {
    return Promise.all([
        import("../views/admin/portfolio/projectType"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
}); 

const AdminProject = lazy(() => {
    return Promise.all([
        import("../views/admin/portfolio/project"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
}); 

const AdminContactList = lazy(() => {
    return Promise.all([
        import("../views/admin/contact"),
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
        .then(([moduleExports]) => moduleExports);
}); 


const IndexRouter: React.FC = (): ReactElement => {
    return (
        <>
            <Router history={history}>
                <Suspense fallback={<NagistarLoading />}>
                    <Switch>
                        <Route path="/" exact component={Home} />  
                        <Route path="/resume" exact component={Resume} />  
                        <Route path="/portfolio" exact component={Portfolio} />  
                        <Route path="/portfolio/project/:id" exact component={ProjectDetail} />  
                        <Route path="/blog" exact component={Blog} /> 
                        <Route path="/contact" exact component={Contact} /> 
                        <Route path="/chatwithme" exact component={ChatWithMe} /> 
                        <Route path="/login" exact component={Login} />   

                        <Route path="/admin/siteSettings" exact component={AdminSiteSettings} /> 
                        <Route path="/admin/projecttype" exact component={AdminProjectType} /> 
                        <Route path="/admin/project" exact component={AdminProject} /> 
                        <Route path="/admin/contactlist" exact component={AdminContactList} />  
                        {/* 404 */}
                        <Route path="/404" component={Page404} />
                        <Redirect to="/404" />
                    </Switch>
                </Suspense>
            </Router>
            <GlobalSpinner />
        </>
    );
};

export default IndexRouter;