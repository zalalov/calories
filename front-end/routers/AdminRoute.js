import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {connect} from "react-redux";
import {ROLE_ADMIN} from "../constants/roles";


const AdminRoute = (props) => {
    let {component: Component, role, ...rest} = props;
    const isAdmin = role === ROLE_ADMIN;

    return (
        <Route {...rest} render={props => (
            isAdmin ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    );
};

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
    role: state.auth.role,
});

export default connect(mapStateToProps, null)(AdminRoute)