import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

//----Components---
import Layout from '../../core/layout/layout.component';

//----Actions----
import { resetPassword } from '../../../redux/student/student.actions'; 

const ResetPassword = ({ resetPassword, student }) => {
    
    const [values, setValues] = useState({
        email: ''
    });

    const history = useHistory();

    const { email } = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        resetPassword( email );
        setValues({ ...values, email: '' });
        //history.push('/signin');
    };

    const resetPasswordForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" value={email} onChange={handleChange('email')}/>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    );

    const showError = (error) => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showMessage = (message) => (
        <div className="alert alert-info" style={{display: message ? '' : 'none'}}>
            {message}
        </div>
    );

    return (
        <Layout 
        title="Reset Password" 
        description="Reset your password in few clicks :)"
        className="container col-md-8 offset-md-2"
        >
            {showError(student.error)}
            {showMessage(student.message)}
            {resetPasswordForm()}
        </Layout>
    )
};

const mapStateToProps = (state) => ({
  student: state.student
});

const mapDispatchToProps = (dispatch) => ({
    resetPassword: (email) => dispatch( resetPassword({ email }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);