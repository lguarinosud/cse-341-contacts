// swagger.js or swaggerConfig.js
const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const HOST = process.env.HOST || 'localhost:3000';
const schemes = HOST === 'localhost:3000' ? ['http'] : ['https'];

const doc = {
    info: {
        title: 'Contact API',
        description: 'To interact with my contacts DB',
    },
    host: HOST, // Dynamically set based on environment
    schemes: schemes, // Dynamically set to http/https
    basePath: '/', // Specify the base path
    paths: {
        '/': {
            get: {
                description: 'Main route of the API',
                responses: {
                    200: {
                        description: 'OK',
                    },
                },
            },
        },
    },
};

const outputFile = './swagger-output.json'; // Output file path
const endpointsFiles = ['./server.js']; // Your main server file

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    // Start server after Swagger generation if needed
    require('./server.js'); // Adjust if your entry point is named differently
});