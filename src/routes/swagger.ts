import * as express from "express";

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json'),
    swaggerJSDoc = require('swagger-jsdoc'),
    swaggerDefinition = {
        info: {
            title: 'Swagger API',
            version: '1.0.0',
            description: 'API Swagger',
        },
        host: 'localhost:3000',
        basePath: '/',
    },
    options = {
        swaggerDefinition: swaggerDefinition,
        apis: ['./*.js'],
    },
    swaggerSpec = swaggerJSDoc(options);

export const Swagger = express.Router()
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    .get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });