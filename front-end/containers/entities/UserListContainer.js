import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as crudAction from '../../actions/crudAction';

// Import custom components
import UserList from '../../components/users/UserList';

class UserContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.fetchAll('users');
    }

    render() {
        return (
            <UserList users={this.props.users} />
        )
    }
}

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
    users: state.entities.users.data
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, crudAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)