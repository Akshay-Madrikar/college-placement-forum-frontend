import React from 'react';
import Navbar from '../navbar/navbar.component';

import '../../../styles.css';

const Layout = ({ title = 'Title', description = 'Description', className, children }) => {
    return (
        <div>
            <Navbar />
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>
                {children}
            </div>
        </div>
    );
};

export default Layout;