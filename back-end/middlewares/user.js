import HttpStatus from 'http-status-codes';
import {User, ROLE_ADMIN, ROLE_MANAGER} from '../models/user.model';
import {getToken, getUser, verifyToken} from '../utils/auth';

exports.parseUser = (req, res, next) => {
    const {userId} = req.params;

    if (!userId) {
        next(Error('User parameter has to be defined for this request.'));
    } else {
        req.userId = userId;

        next();
    }
};