import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {User} from '../models/user.model';
import logger from '../config/winston';
import {getToken, getUser, verifyToken} from '../utils/auth';

/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
exports.login = (req, res) => {
    const {email, password} = req.body;
    User.query({
        where: {email: email},
    }).fetch().then(user => {
        if (user) {
            if (bcrypt.compareSync(password, user.get('password'))) {

                const token = jwt.sign({
                    id: user.get('id'),
                    email: user.get('email')
                }, process.env.TOKEN_SECRET_KEY);

                res.json({
                    success: true,
                    token,
                    role: user.get('role'),
                    id: user.get('id'),
                    email: user.get('email')
                });
            } else {
                logger.log('error', 'Authentication failed. Invalid password.');

                res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    message: 'Authentication failed. Invalid password.'
                });
            }
        } else {
            logger.log('error', 'Invalid username or password.');

            res.status(HttpStatus.UNAUTHORIZED).json({
                success: false, message: 'Invalid username or password.'
            });
        }
    });
};