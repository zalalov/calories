import express from 'express';
import * as userCtrl from '../controllers/user.controller';
import {isAuthenticated, isAdmin} from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

router.route('/')
    .post([validate(schema.updateSettings), isAuthenticated], (req, res) => {
        userCtrl.updateSettings(req, res);
    });

export default router;