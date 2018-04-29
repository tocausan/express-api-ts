import {Router} from "express";

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require("./swagger.json");

const Swagger = Router();

if (process.env.ENV === 'dev') {
    Swagger.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    Swagger.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(swaggerDocument, null, 2));
    });
}

export default Swagger;