import express from 'express';
import * as userCtrl from '../controllers/user.controller';
import {isAuthenticated, isAdmin, isNotRegularUser} from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

router.route('/')
    .post(validate(schema.storeUser), (req, res) => {
        userCtrl.store(req, res);
    })
    .get([isAuthenticated, isNotRegularUser], (req, res) => {
        userCtrl.findAll(req, res);
    });


router.route('/:id')
    .get([isAuthenticated, isNotRegularUser], (req, res) => {
        userCtrl.findById(req, res);
    })
    .put([validate(schema.updateUser), isAuthenticated, isNotRegularUser], (req, res) => {
        userCtrl.update(req, res);
    })
    .delete([isAuthenticated, isNotRegularUser], (req, res) => {
        userCtrl.destroy(req, res);
    });


export default router;