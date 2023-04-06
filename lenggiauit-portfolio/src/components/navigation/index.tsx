import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import * as bt from 'react-bootstrap';
import { Translation } from '../../components/translation/'
import { LanguageSelector } from '../languageSelector';
import { AppProvider, useAppContext } from '../../contexts/appContext';
import { getLoggedUser, hasPermission, logout } from '../../utils/functions';
import { AnimationLogo } from '../animationLogo';
import { User } from '../../services/models/user';
import { PermissionKeys } from '../../utils/constants';


type Props = {
    isPublic: boolean,
    navCssclassName?: string,
    currentUser: User | null
}

const Navigation: React.FC<Props> = ({ isPublic, navCssclassName, currentUser }) => {
    const location = useLocation();
    const { authenticateUser } = useAppContext(); 
    
    return (
        <>
            <nav id="main-nav" className="main-nav clearfix tabbed">
                <ul>
                    <li >
                        <a href="/" className={`${(location.pathname == '/') ? "active" : ""}`}><i className="bi bi-house"></i>
                            <Translation tid={"nav_home"} />
                        </a>
                    </li>
                    <li >
                        <a href="/resume" className={`${(location.pathname == '/resume') ? "active" : ""}`}><i className="bi bi-file-person-fill"></i>
                            <Translation tid={"nav_resume"} />
                        </a>
                    </li>
                    <li>
                        <a href="/portfolio" className={`${(location.pathname == '/portfolio') ? "active" : ""}`}><i className="bi bi-stack"></i>
                            <Translation tid={"nav_portfolio"} />
                        </a>
                    </li>
                    {/* <li>
                        <a href="/blog" className={`${(location.pathname == '/blog') ? "active" : ""}`}><i className="bi bi-braces-asterisk"></i>
                            <Translation tid={"nav_blog"} />
                        </a>
                    </li> */}
                    <li>
                        <a href="/contact" className={`${(location.pathname == '/contact') ? "active" : ""}`}><i className="bi bi-telephone"></i>
                            <Translation tid={"nav_contact"} />
                        </a>
                    </li>
                    {/* <li>
                        <a href="/chatwithme" className={`${(location.pathname == '/chatwithme') ? "active" : ""}`}><i className="bi bi-chat-dots"></i>
                            <Translation tid={"nav_chatwithme"} />
                        </a>
                    </li> */}
                    {authenticateUser != null && (hasPermission()) &&
                        <>
                            <li className="nav-item dropright">

                                <a className="dropdown-toggle"
                                    role="button" data-bs-toggle="dropdown" data-toggle="dropdown" aria-expanded="false"
                                    href="#">
                                    <i className="bi bi-gear-fill" style={{ fontSize: 24 }}></i>
                                    Admin
                                </a>
                               
                                <div className="dropdown-menu nav-dropdown-menu">
                                    <a className="dropdown-item" href="/admin/siteSettings">Site settings</a>
                                    <a className="dropdown-item" href="/admin/projecttype">Project type</a> 
                                    <a className="dropdown-item" href="/admin/project">Project</a>  
                                    <a className="dropdown-item" href="/admin/contactlist">Contact List</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#" onClick={()=>{ logout(); window.location.href = "/";}}>Logout</a>
                                </div>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </>
    )
};

export default Navigation;