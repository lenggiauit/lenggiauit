'use client';
import React, { ReactElement } from 'react'; 
import Navigation from '../../components/navigation/'
import { AppProvider } from '../../contexts/appContext';
import { getLoggedUser } from '../../utils/functions';

interface Props {
    children: React.ReactNode;
  }
const AdminLayout: React.FC<Props> = ({ children }): ReactElement => {

    const currentUser = getLoggedUser();

    if (currentUser == null) {
        window.location.href = "/login";
         return(<></>)
    }
    else {
        return (
            <>
                <AppProvider>
                    <div className="nav-container">
                        <div className='row'>
                            <Navigation isPublic={true} currentUser={currentUser} />
                        </div>
                    </div>
                    {children}
                </AppProvider>
            </>
        )
    }
};

export default AdminLayout;