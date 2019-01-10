import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model';

const getToken = (req) => {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
        return null;
    }

    return authorizationHeader.split(' ')[1];
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        User.query({
            where: {id: id},
            select: ['email', 'id']
        }).fetch().then(user => {
            if (!user) {
                reject(Error('No such user.'));
            } else {
                resolve(user);
            }
        });
    })
};

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