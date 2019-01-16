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

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

function MealList(props) {
    const {classes, meals, auth, onDelete} = props;

    return (
        <div className={classes.root}>
            <List component="nav">
                {meals.map(meal => {
                    return (
                        <ListItem key={`meal_${meal.id}`} button>
                            <ListItemText primary={meal.text}/>
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
        </div>
    );
}

MealList.propTypes = {
    classes: PropTypes.object.isRequired,
    meals: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
};

export default withStyles(styles)(MealList);