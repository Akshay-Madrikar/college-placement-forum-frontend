import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

// Core Components
import Layout from '../../core/layout/layout.component';

const AdminDashboard = ({ auth }) => {

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/industry">Add Industry</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/company">Add Company</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">View Orders</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/products">Manage Companies</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Admin Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{auth.user.name}</li>
                    <li className="list-group-item">{auth.user.email}</li>
                    <li className="list-group-item">{auth.user.role === 1 ? 'Admin' : 'Registered User'}</li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`G'day admin ${auth.user.name}`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">
                    {adminLinks()}
                </div>
                <div className="col-9">
                    {adminInfo()}
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AdminDashboard);
