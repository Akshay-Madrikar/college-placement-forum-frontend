import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ auth, component: Component, ...rest }) => (
    <Route 
        {...rest}
        render={ props => 
            auth.token ? (
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

export default connect(mapStateToProps)(PrivateRoute);