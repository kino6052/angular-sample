'use strict';

var express = require('express');
var controller = require('./call-ticket.controller');

var router = express.Router();

router.get('/regular/', controller.index);
router.get('/regular/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/filtered/:name', (req, res, next) => {console.log("here"); next();}, controller.filteredIndex);
module.exports = router;
