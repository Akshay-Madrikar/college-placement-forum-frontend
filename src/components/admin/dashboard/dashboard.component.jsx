import React from 'react';
import { connect } from 'react-redux';

// Core Components
import Layout from '../../core/layout/layout.component';

const AdminDashboard = ({ auth }) => {

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${auth.user.name}`}
            className="container-fluid"
        >
            <div className="row">
                Admin Dashboard
            </div> 

           
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AdminDashboard);
