import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as mealAction from '../../actions/mealAction';
import history from '../../utils/history';

// Import custom components
import MealForm from '../../components/meals/MealForm';
import {MEALS} from "../../constants/entity";

class MealContainer extends Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(formProps) {
        const {userId, mealId} = this.props.match.params;

        if (mealId) {
            this.props.actions.submitForm(formProps, userId, mealId);
        } else {
            this.props.actions.submitForm(formProps, userId);
        }
    }

    cancelForm() {
        history.goBack();
    }

    render() {
        const mealId = parseInt(this.props.match.params.mealId);

        let meal = this.props.meals.find(meal => meal.id === mealId);

        return (
            <MealForm meal={meal} onSubmit={this.submitForm} onCancel={this.cancelForm}/>
        )
    }
}

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
    meals: state.entities.meals.data
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, mealAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MealContainer)