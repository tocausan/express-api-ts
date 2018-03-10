import * as express from "express";

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require("./swagger.json"),
    swaggerJSDoc = require('swagger-jsdoc');

export const Swagger = express.Router()
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    .get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(swaggerDocument, null, 2));
    });