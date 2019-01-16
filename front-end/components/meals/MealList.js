import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


import FloatingAddButton from '../../components/common/button/FloatingAddButton';
import DatePicker from '../../components/common/pickers/date';
import TimePicker from '../../components/common/pickers/time';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

function MealList(props) {
    const {classes, meals, auth, onDelete, userId} = props;
    const {dateFromChanged, dateToChanged, timeFromChanged, timeToChanged} = props;
    const {dateFrom, dateTo, timeFrom, timeTo} = props;

    return (
        <div className={classes.root}>
            <Grid container className={classes.grid} justify="space-around">
                <DatePicker label="Date From" value={dateFrom} onChange={dateFromChanged}/>
                <DatePicker label="Date To" value={dateTo} onChange={dateToChanged}/>
                <TimePicker label="Time From" value={timeFrom} onChange={timeFromChanged}/>
                <TimePicker label="Time To" value={timeTo} onChange={timeToChanged}/>
            </Grid>

            <Divider/>

            <List component="nav">
                {meals.map(meal => {
                    const red= '#770000';
                    const green = '#137f00';

                    let color = meal.overload ? red : green;

                    return (
                        <ListItem key={`meal_${meal.id}`} button>
                            <ListItemText primary={<Typography type="body2" style={{ color: color }}>{meal.text}</Typography>}/>
                            <ListItemSecondaryAction>
                                <Link to={`/users/${auth.id}/meals/${meal.id}/edit`}>
                                    <IconButton aria-label="Edit">
                                        <EditIcon/>
                                    </IconButton>
                                </Link>
                                <IconButton aria-label="Delete">
                                    <DeleteIcon onClick={() => onDelete(auth.id, meal.id)}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>

            <FloatingAddButton link={`/users/${userId}/meals/new`} />
        </div>
    );
}

MealList.propTypes = {
    classes: PropTypes.object.isRequired,
    meals: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
};

export default withStyles(styles)(MealList);