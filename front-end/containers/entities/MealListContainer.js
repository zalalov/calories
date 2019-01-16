import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as mealAction from '../../actions/mealAction';

// Import custom components
import MealList from '../../components/meals/MealList';
import FloatingAddButton from '../../components/common/button/FloatingAddButton';

class MealListContainer extends Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
        this.getMeals = this.getMeals.bind(this);
    }

    getMeals(userId) {
        this.props.actions.fetchByUserId(userId);
    }

    componentWillReceiveProps(nextProps) {
        const {userId} = nextProps.match.params;

        if (userId !== this.props.match.params.userId) {
            this.getMeals(userId);
        }
    }

    componentWillMount() {
        const {userId} = this.props.match.params;

        this.getMeals(userId);
    }

    onDelete(userId, id) {
        this.props.actions.destroyItem(userId, id);
    }

    render() {
        const {meals, auth} = this.props;
        const {userId} = this.props.match.params;

        return (
            <div>
                <MealList meals={meals} auth={auth} onDelete={this.onDelete} />
                <FloatingAddButton link={`/users/${userId}/meals/new`} />
            </div>
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