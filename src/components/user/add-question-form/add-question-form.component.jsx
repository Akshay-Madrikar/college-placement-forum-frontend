import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Core Components
import Layout from '../../core/layout/layout.component';

// Actions
import { loadCompanies, addQuestion } from '../../../redux/company/company.actions'; 
 

const AddQuestionForm = ({ auth, company, loadCompanies, addQuestion }) => {

    const [values, setValues] = useState({
        companyName:'',
        body: '',
        createdComment: '',
        success: false,
        formData: {}
    });

    const {
        companyName,
        body,
        success,
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
        setValues({ 
            ...values, 
            companyName: '', 
            body: '', 
            success: true 
        });
    };

    const handleBody = (event, editor) => {
        const data = editor.getData();
        formData.body = data;
        setValues({ ...values, body: data });
    }

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
                <CKEditor
                    editor={ClassicEditor}
                    data={body}
                    onChange={handleBody}
                />
            </div>

            <button className="btn btn-outline-primary" onClick={handleSubmit}>Submit</button>
        </form>
    );

    const showSuccess = (success) => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            <h2>Question added successfully!</h2>
        </div>
    );

    return (
        <Layout
            title="Add company questions"
            description={`G'day ${auth.user.name}, ready to add company questions`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess(success)}
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