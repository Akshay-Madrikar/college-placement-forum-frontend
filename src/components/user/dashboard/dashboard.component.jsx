import React from 'react';
import { connect } from 'react-redux';

// Core Components
import Layout from '../../core/layout/layout.component';

const UserDashboard = ({ auth }) => {

    const { name } = auth;
    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}`}
            className="container-fluid"
        >
            <div className="row">
                User Dashboard
            </div> 

           
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(UserDashboard);
