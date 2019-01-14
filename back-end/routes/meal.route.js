import express from 'express';
import * as mealCtrl from '../controllers/meal.controller';
import {isAuthenticated, isAdmin, isManager} from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

router.route('/')
    .post(validate(schema.storeMeal), (req, res) => {
        mealCtrl.store(req, res);
    })
    .get((req, res) => {
        mealCtrl.findByUser(req, res);
    });


router.route('/:id')
    .get((req, res) => {
        mealCtrl.findById(req, res);
    })
    .put((req, res) => {
        mealCtrl.update(req, res);
    })
    .delete(isAdmin, (req, res) => {
        mealCtrl.destroy(req, res);
    });


export default router;