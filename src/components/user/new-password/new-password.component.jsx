import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

//----Components---
import Layout from '../../core/layout/layout.component';

//----Actions----
import { setNewPassword } from '../../../redux/student/student.actions'; 

const NewPassword = ({ setNewPassword, student }) => {
    
    const [values, setValues] = useState({
        password: ''
    });

    const { token } = useParams();
    const history = useHistory();

    const { password } = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setNewPassword( password, token );
        setValues({ ...values, password: '' });
        history.push('/signin');
    };

    const newPasswordForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" value={password} onChange={handleChange('password')}/>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Update Password</button>
        </form>
    );

    const showError = (error) => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    return (
        <Layout 
        title="New Password" 
        description="Set new password for your registered user ID"
        className="container col-md-8 offset-md-2"
        >
            {showError(student.error)}
            {newPasswordForm()}
        </Layout>
    )
};

const mapStateToProps = (state) => ({
  student: state.student
});

const mapDispatchToProps = (dispatch) => ({
    setNewPassword: (password, token) => dispatch( setNewPassword({ password, token }))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);