import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//----Components---
import Layout from '../../core/layout/layout.component';

//----Actions----
import { signUp } from '../../../redux/reducers/auth/auth.actions'; 

const SignUp = ({ signUp, auth }) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        errorMessage: '',
        loading: false,
        success: false
    });

    const { name, email, password, errorMessage, loading, success} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, loading:true});
        signUp(name, email, password );

        setValues({
          ...values,
          name: '', 
          email: '',
          password: '',
          error: '',
          loading:false,
          success: true
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="email" className="form-control" value={name} onChange={handleChange('name')}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" value={email} onChange={handleChange('email')}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" value={password} onChange={handleChange('password')}/>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display: errorMessage ? '' : 'none'}}>
            {errorMessage}
        </div>
    );
        
    const showLoading = () => (
        loading && (
        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>
        )
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New account is created. Please <Link to='/signin'>signin</Link>
        </div>
    );

    return (
        <Layout 
        title="SignUp" 
        description="Sign Up Page"
        className="container col-md-8 offset-md-2"
        >
            {showError()}
            {showLoading()}
            {showSuccess()}
            {signUpForm()}
        </Layout>
    )
};

const mapDispatchToProps = (dispatch) => ({
  signUp: (name, email, password) => dispatch( signUp({ name, email, password }))
});

export default connect(null, mapDispatchToProps)(SignUp);