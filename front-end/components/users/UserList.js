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
import FastfoodIcon from '@material-ui/icons/Fastfood';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

function UserList(props) {
    const {classes, onDelete} = props;
    return (
        <div className={classes.root}>
            <List component="nav">
                {props.users.map(user => {
                    return (
                        <ListItem key={`user_${user.id}`} button>
                            <ListItemText primary={user.email}/>

                            <ListItemSecondaryAction>
                                <Link to={`/users/${user.id}/edit`}>
                                    <IconButton aria-label="Edit">
                                        <EditIcon />
                                    </IconButton>
                                </Link>

                                <Link to={`/users/${user.id}/meals`}>
                                    <IconButton aria-label="Meals">
                                        <FastfoodIcon />
                                    </IconButton>
                                </Link>

                                <IconButton aria-label="Delete">
                                    <DeleteIcon onClick={() => onDelete}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );
}

UserList.propTypes = {
    classes: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
};

export default withStyles(styles)(UserList);