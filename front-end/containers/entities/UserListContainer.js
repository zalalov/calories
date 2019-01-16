import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as crudAction from '../../actions/crudAction';

// Import custom components
import UserList from '../../components/users/UserList';
import FloatingAddButton from '../../components/common/button/FloatingAddButton';
import {USERS} from "../../constants/entity";

class UserContainer extends Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    componentWillMount() {
        this.props.actions.fetchAll(USERS);
    }

    onDelete(id) {
        this.props.actions.destroyItem(USERS, id);
    }

    render() {
        return (
            <div>
                <UserList users={this.props.users} onDelete={this.onDelete}/>
                <FloatingAddButton link="/users/new"/>
            </div>
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