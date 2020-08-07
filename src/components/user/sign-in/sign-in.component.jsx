import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//----Components---
import Layout from '../../core/layout/layout.component';

//----Actions----
import { signIn, loadUser } from '../../../redux/reducers/auth/auth.actions'; 

const SignIn = ({ signIn, auth, loadUser }) => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        errorMessage: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, errorMessage, loading, redirectToReferrer} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, loading:true});
        signIn(email, password );
        console.log(loadUser());
        setValues({
          ...values, 
          email: '',
          password: '',
          error: '',
          redirectToReferrer: true,
          loading:false
        });
    };

    const signInForm = () => (
        <form>
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

    const redirectuser = () => {
        if(redirectToReferrer) {
            if(auth.user && auth.user.role === 1) {
                return <Redirect to="/admin/dashboard"/>
            } else {
                return <Redirect to="/user/dashboard"/>
            }
        }

        if(auth.token) {
            return <Redirect to="/"/>
        }
    }

    return (
        <Layout 
        title="SignIn" 
        description="Sign in Page"
        className="container col-md-8 offset-md-2"
        >
            {showError()}
            {showLoading()}
            {signInForm()}
            {redirectuser()}
        </Layout>
    )
};

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  signIn: (email, password) => dispatch( signIn({ email, password })),
  loadUser: () => dispatch( loadUser() )
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);