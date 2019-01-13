import {User} from "../models/user.model";
import jwt from "jsonwebtoken";

exports.getToken = (req) => {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
        return null;
    }

    return authorizationHeader.split(' ')[1];
};

exports.verifyToken = (token) => {
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

exports.getUser = (id) => {
    return new Promise((resolve, reject) => {
        User.query({
            where: {id: id},
            select: ['email', 'id', 'role']
        }).fetch().then(user => {
            if (!user) {
                reject(Error('No such user.'));
            } else {
                resolve(user);
            }
        });
    })
};