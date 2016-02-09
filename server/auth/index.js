'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import {User} from '../sqldb';

// Passport Configuration
require('./google/passport').setup(User, config);

var router = express.Router();

router.use('/google', require('./google'));

export default router;
