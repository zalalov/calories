import BaseJoi from 'joi';
import {userExists} from './joi.extensions';

const Joi = BaseJoi.extend(userExists);

export default {
    storeUser: {
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        }
    },

    updateUser: {
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        },
        params: {
            userId: Joi.string().hex().required()
        }
    },

    storeMeal: {
        body: {
            user_id: Joi.string().required(),
            text: Joi.string().required(),
            calories: Joi.number().required(),
            userId: Joi.number().userExists(Joi.ref('user_id')).required()
        }
    },

    updateMeal: {
        body: {
            user_id: Joi.string().required(),
            text: Joi.string().required(),
            calories: Joi.number().required(),
            userId: Joi.number().userExists(Joi.ref('user_id')).required()
        },
        params: {
            userId: Joi.string().hex().required()
        }
    },

    login: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required()
        }
    }
};