import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as mealAction from '../../actions/mealAction';

// Import custom components
import MealList from '../../components/meals/MealList';

class MealListContainer extends Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    componentWillMount() {
        const {id} = this.props.auth;
        this.props.actions.fetchByUserId(id);
    }

    onDelete(userId, id) {
        this.props.actions.destroyItem(userId, id);
    }

    render() {
        const {meals, auth} = this.props;

        return (
            <MealList meals={meals} auth={auth} onDelete={this.onDelete} />
        )
    }
}

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
    meals: state.entities.meals.data,
    auth: state.auth
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, mealAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MealListContainer)