import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as authService from '../../services/authService';

class LogoutContainer extends Component {
    componentWillMount() {
        this.props.actions.logout();
    }

    render() {
        return null;
    }
}

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, authService), dispatch)
});

export default connect(null, mapDispatchToProps)(LogoutContainer)