import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = ({ auth, component: Component, ...rest }) => (
    <Route 
        {...rest}
        render={ props => 
            auth.token && auth.user.role === 1 ? (
                <Component {...props}/>
            ) : (
                <Redirect 
                    to={{
                        pathname: '/signin',
                        state: {
                            from: props.location
                        }
                    }}
                />
            ) 
        }
    />
);

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);