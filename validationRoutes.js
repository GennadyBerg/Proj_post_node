const express = require('express');
const validationRoutes = express.Router();
const validator= require('./Validation/unifyValidator.js');
const recordCreateSchema = require('./Validation/objValidationSchemas.js');
const { validateObject } = require('./controllers/validationController.js');

validationRoutes.post('/validateObject', validator(recordCreateSchema), validateObject);

module.exports = {validationRoutes};
