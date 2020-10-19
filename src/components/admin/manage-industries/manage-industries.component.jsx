import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Core Components
import Layout from '../../core/layout/layout.component';
import ScrollArrow from '../../core/scroll-arrow/scroll-arrow.component';

// Actions
import { deleteIndustry, loadIndustries } from '../../../redux/industry/industry.actions'; 

const ManageIndustries = ({ auth, industry, loadIndustries, deleteIndustry  }) => {

    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        loadIndustries();
    }, []);

    const showSuccess = (success) => (
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
            <h2>Deleted successfully!</h2>
        </div>
    );

    return (
        <Layout
            title="Manage Companies"
            description="Perform CRUD on companies"
            className="container-fluid"
        >
            { showSuccess(success) }
            <div className="row">
                <div className="col-12 m-2">
                    <ul className="list-group">
                        { industry.industries.length > 0 ? industry.industries.map((industry,index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>{industry.name}</strong>
                                <Link to={`/admin/update/company/${industry._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span 
                                    className="badge badge-danger badge-pill" 
                                    onClick={() => {
                                        deleteIndustry(industry._id, auth.user._id);
                                        setSuccess(true);
                                    }}
                                    style={{cursor: 'pointer'}}
                                >
                                    Delete
                                </span>
                            </li>
                        )) : <h5 className="text-danger">No industries found!!!</h5>}
                    </ul>
                </div>
            </div>
            <ScrollArrow />
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    industry: state.industry
});

const mapDispatchToProps = (dispatch) => ({
    loadIndustries: () => dispatch( loadIndustries() ),
    deleteIndustry: (industryId, studentId) => dispatch( deleteIndustry({ industryId, studentId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageIndustries);