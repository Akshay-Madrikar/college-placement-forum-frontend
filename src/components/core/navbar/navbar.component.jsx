import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import { signOut } from '../../../redux/auth/auth.actions'

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return { color: '#ff9900' }
    } else {
        return { color: '#ffffff' }
    }
};

const Menu = ({ history, auth, signOut }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/disocver')} to="/discover">Discover</Link>
                </li>

                {auth.token && auth.user.role === 1 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                    </li>
                )}

                {auth.token && auth.user.role === 0 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                    </li>
                )}

                { auth.token ? (
                    <>
                        <li className="nav-item">
                            <span className="nav-link" style={{cursor: 'pointer', color: '#ffffff'}} onClick={() => signOut()}>Signout</span>
                        </li> 
                    </> 
                ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">SignIn</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">SignUp</Link>
                        </li> 
                    </>
                )} 
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch( signOut() )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu));