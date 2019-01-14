import HttpStatus from 'http-status-codes';
import {User, ROLE_ADMIN, ROLE_MANAGER} from '../models/user.model';
import {getToken, getUser, verifyToken} from '../utils/auth';

exports.isAuthenticated = (req, res, next) => {
    const token = getToken(req);

    if (token) {
        verifyToken(token)
            .then(decoded => getUser(decoded.id))
            .then(user => {
                if (!user) {
                    res.status(HttpStatus.NOT_FOUND).json({error: 'No such user'});
                } else {
                    req.currentUser = user;
                    next();
                }
            })
            .catch(err => {
                console.log(err);
                res.status(HttpStatus.UNAUTHORIZED).json({error: 'You are not authorized to perform this operation!'});
            });
    } else {
        res.status(HttpStatus.FORBIDDEN).json({
            error: 'No token provided'
        });
    }
};

exports.isAdmin = (req, res, next) => {
    if (!req.currentUser) {
        next(Error('Unknown user.'));
    }

    if (req.currentUser.role === User.ROLE_ADMIN) {
        next();
    } else {
        res.status(HttpStatus.UNAUTHORIZED).json({error: 'You are not authorized to perform this operation!'});
    }
};

exports.isManager = (req, res, next) => {
    if (!req.currentUser) {
        next(Error('Unknown user.'));
    }

    if (req.currentUser.role === User.ROLE_MANAGER) {
        next();
    } else {
        res.status(HttpStatus.UNAUTHORIZED).json({error: 'You are not authorized to perform this operation!'});
    }
};

exports.isOwner = (req, res, next) => {
    const userId = parseInt(req.params.userId);

    if (![ROLE_ADMIN, ROLE_MANAGER].includes(req.currentUser.get('role')) && req.currentUser.get('id') !== userId) {
        res.status(HttpStatus.UNAUTHORIZED).json({error: 'You are not authorized to perform this operation!'});
    } else {
        next();
    }
};