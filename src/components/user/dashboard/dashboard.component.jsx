import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

// Core Components
import Layout from '../../core/layout/layout.component';

const UserDashboard = ({ auth }) => {

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/user/company/add-questions">Add Company Questions</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${auth.user._id}`}>Update profile</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
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
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(UserDashboard);