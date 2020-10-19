import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Core Components
import Layout from '../../core/layout/layout.component';
import ScrollArrow from '../../core/scroll-arrow/scroll-arrow.component';

// Actions
import { deleteCompany, loadCompanies } from '../../../redux/company/company.actions'; 

const ManageCompanies = ({ auth, company, loadCompanies, deleteCompany  }) => {
    
    useEffect(() => {
        loadCompanies();
    }, []);

    return (
        <Layout
            title="Manage Companies"
            description="Perform CRUD on companies"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12 m-2">
                    <ul className="list-group">
                        { company.companies.length > 0 ? company.companies.map((company,index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>{company.name}</strong>
                                <Link to={`/admin/update/company/${company._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span 
                                    className="badge badge-danger badge-pill" 
                                    onClick={() => deleteCompany(company._id, auth.user._id)}
                                    style={{cursor: 'pointer'}}
                                >
                                    Delete
                                </span>
                            </li>
                        )) : <h5 className="text-danger">No companies found!!!</h5>}
                    </ul>
                </div>
            </div>
            <ScrollArrow />
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    company: state.company
});

const mapDispatchToProps = (dispatch) => ({
    loadCompanies: () => dispatch( loadCompanies() ),
    deleteCompany: (companyId, studentId) => dispatch( deleteCompany({ companyId, studentId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageCompanies);