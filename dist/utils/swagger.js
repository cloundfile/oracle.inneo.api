"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
exports.swaggerOptions = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for INNEO.ORG',
        version: '1.0.0',
        description: 'This is a REST API application made with Express. It retrieves data from inneo.org.',
        license: {
            name: 'Licensed MIT',
            url: 'https://mit-license.org/',
        },
        contact: {
            name: 'Visit us',
            url: 'https://inneo.org',
        },
    },
    servers: [
        {
            url: 'https://api.inneo.org',
            description: 'Online server',
        },
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
    apis: ["./routes/*.js"],
};
