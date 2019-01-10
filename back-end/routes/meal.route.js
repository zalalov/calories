import express from 'express';
import * as userCtrl from '../controllers/user.controller';
import {isAuthenticated, isAdmin, isManager} from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

router.route('/')
    .post(validate(schema.storeMeal), (req, res) => {
        console.log('Storing meal model');
        //userCtrl.store(req, res);
    })
    .get((req, res) => {
        console.log('Getting meal list');
        // userCtrl.findAll(req, res);
    });


router.route('/:id')
    .get((req, res) => {
        console.log('Getting meal model by id');
        // userCtrl.findById(req, res);
    })
    .put(isAuthenticated, (req, res) => {
        console.log('Updating meal model by id');
        // userCtrl.update(req, res);
    })
    .delete([isAuthenticated, isAdmin], (req, res) => {
        console.log('Deleting meal model by id');
        // userCtrl.destroy(req, res);
    });


export default router;