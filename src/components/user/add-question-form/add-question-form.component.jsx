import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Core Components
import Layout from '../../core/layout/layout.component';

// Actions
import { loadCompanies, addQuestion } from '../../../redux/company/company.actions'; 
 

const AddQuestionForm = ({ auth, company, loadCompanies, addQuestion }) => {

    const [values, setValues] = useState({
        companyName:'',
        body: '',
        createdComment: '',
        formData: {}
    });

    const {
        companyName,
        body,
        formData
    } = values;

    useEffect(() => {
        loadCompanies();
    }, []);

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        formData[name] = value;
        setValues({...values, [name]: value});
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        addQuestion(formData, companyName, auth.user._id);
        setValues({ ...values, companyName: '', body: '' })
    };

    const newForm = () => (  
        <form className="mb-3" >
            <div className="form-group">
                <label className="text-muted">Select Company</label>
                <select 
                    type="text" 
                    className="form-control" 
                    value={companyName} 
                    onChange={handleChange('companyName')}
                >
                    <option>Select company</option>
                    { company.companies && company.companies.map((company, index) => (
                        <option key={index} value={company._id}>{company.name}</option>
                    )) }
                    
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Say Something...</label>
                <textarea 
                    type="text" 
                    cols="30"
                    rows="25"
                    placeholder="Add questions"
                    className="form-control" 
                    value={body} 
                    onChange={handleChange('body')}
                    required
                />
            </div>

            <button className="btn btn-outline-primary" onClick={handleSubmit}>Submit</button>
        </form>
    );

    const showSuccess = (name) => (
        <div className="alert alert-info" style={{ display: name ? '' : 'none' }}>
            <h2>{`${name}`} is created!</h2>
        </div>
    );

    // const showError = (error) => (
    //     <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
    //         {error}
    //     </div>
    // );

    return (
        <Layout
            title="Add company questions"
            description={`G'day ${auth.user.name}, ready to add company questions`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {/* {showError(company.error)} */}
                    {/* {showSuccess(post.createdPost.postedBy.name)} */}
                    {newForm()}
                </div>
            </div> 

        </Layout>
            
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    company: state.company
});

const mapDispatchToProps = (dispatch) => ({
    loadCompanies: () => dispatch( loadCompanies()),
    addQuestion: (formData, companyId, studentId) => dispatch( addQuestion({ formData, companyId, studentId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionForm);