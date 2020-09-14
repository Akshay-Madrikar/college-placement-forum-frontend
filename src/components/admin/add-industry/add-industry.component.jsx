import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Core Components
import Layout from '../../core/layout/layout.component';


// Actions
import { createIndustry } from '../../../redux/industry/industry.actions'; 

const AddIndustry = ({ auth, industry, createIndustry }) => {

    const [name, setName] = useState('');

    const addIndustry = () => {
        createIndustry(name, auth.user._id);
        setName('');
    };
    
    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addIndustry();
    }

    const newIndustryForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={name} 
                    onChange={handleChange} 
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary" onClick={handleSubmit}>Create Industry</button>
        </form>
    );

    // const showSuccess = () => (
    //     <div className="alert alert-info" style={{ display: industry.recent_added_industry !== null && industry.recent_added_industry ? '' : 'none' }}>
    //         <h2>{`${industry.recent_added_industry.name}`} is created!</h2>
    //     </div>
    // );

    const showError = (error) => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>    
    );

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to dashboard
            </Link>
        </div>
    );

    return (
        <Layout
            title="Add a new category"
            description={`G'day ${auth.user.name}, ready to add a new industry`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError(industry.error)}
                    {/* {showSuccess()} */}
                    {newIndustryForm()}
                    {goBack()}
                </div>
            </div> 
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    industry: state.industry
});

const mapDispatchToProps = (dispatch) => ({
    createIndustry: (name, id) => dispatch( createIndustry({ name, id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddIndustry);