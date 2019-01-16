import Joi from 'joi';

export default {
    storeUser: {
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            calories_goal: Joi.number(),
            role: Joi.number(),
        }
    },

    updateUser: {
        body: {
            first_name: Joi.string(),
            last_name: Joi.string(),
            email: Joi.string().email(),
            role: Joi.number(),
            calories_goal: Joi.number()
        },
        params: {
            id: Joi.string().hex().required()
        }
    },

    updateSettings: {
        body: {
            calories_goal: Joi.number().required()
        }
    },

    storeMeal: {
        body: {
            text: Joi.string().required(),
            calories: Joi.number().required(),
            eaten_at: Joi.date().required()
        }
    },

    updateMeal: {
        body: {
            text: Joi.string().required(),
            calories: Joi.number().required(),
            eaten_at: Joi.date().required()
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