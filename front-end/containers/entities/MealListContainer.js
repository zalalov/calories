import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as mealAction from '../../actions/mealAction';
import dateformat from 'dateformat';
import moment from 'moment';

// Import custom components
import MealList from '../../components/meals/MealList';

class MealListContainer extends Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
        this.getMeals = this.getMeals.bind(this);
        this.dateFromChanged = this.dateFromChanged.bind(this);
        this.dateToChanged = this.dateToChanged.bind(this);
        this.timeFromChanged = this.timeFromChanged.bind(this);
        this.timeToChanged = this.timeToChanged.bind(this);
        this.getMealFilters = this.getMealFilters.bind(this);

        let midnight = new Date();
        midnight.setHours(0,0,0,0);

        let monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        this.state = {
            dateFrom: monthAgo,
            dateTo: new Date(),
            timeFrom: midnight,
            timeTo: new Date()
        };

        console.log(midnight);
    }

    getMeals(userId) {
        this.props.actions.fetchByUserId(userId, this.getMealFilters());
    }

    getMealFilters() {
        return {
            date_from: dateformat(this.state.dateFrom, 'yyyy-mm-dd'),
            date_to: dateformat(this.state.dateTo, 'yyyy-mm-dd'),
            time_from: moment(this.state.timeFrom).format('HH:mm:ss'),
            time_to: moment(this.state.timeTo).format('HH:mm:ss')
        };
    }

    componentWillMount() {
        const {userId} = this.props.match.params;

        this.getMeals(userId);
    }

    onDelete(userId, id) {
        this.props.actions.destroyItem(userId, id);
    }

    dateFromChanged(date) {
        const {userId} = this.props.match.params;

        this.setState({
            dateFrom: date
        }, () => {
            this.getMeals(userId);
        });
    }

    dateToChanged(date) {
        const {userId} = this.props.match.params;

        this.setState({
            dateTo: date
        }, () => {
            this.getMeals(userId);
        });
    }

    timeFromChanged(time) {
        const {userId} = this.props.match.params;

        this.setState({
            timeFrom: time
        }, () => {
            this.getMeals(userId);
        });
    }

    timeToChanged(time) {
        const {userId} = this.props.match.params;

        this.setState({
            timeTo: time
        }, () => {
            this.getMeals(userId);
        });
    }

    render() {
        const {meals, auth} = this.props;
        const {userId} = this.props.match.params;

        return (
            <div>
                <MealList meals={meals}
                          userId={userId}
                          auth={auth}
                          onDelete={this.onDelete}
                          dateFromChanged={this.dateFromChanged}
                          dateToChanged={this.dateToChanged}
                          timeFromChanged={this.timeFromChanged}
                          timeToChanged={this.timeToChanged}
                          dateFrom={this.state.dateFrom}
                          dateTo={this.state.dateTo}
                          timeFrom={this.state.timeFrom}
                          timeTo={this.state.timeTo}
                />
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