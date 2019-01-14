import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as crudAction from '../../actions/crudAction';
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
        this.props.actions.submitForm(MEALS, formProps, this.props.match.params.mealId);
    }

    cancelForm() {
        history.goBack();
    }

    render() {
        let meal = this.props.meals.find(meal => {
            return meal.id === parseInt(this.props.match.params.mealId)
        });

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
    actions: bindActionCreators(Object.assign({}, crudAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MealContainer)