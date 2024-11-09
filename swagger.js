const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');
dotenv.config();

const HOST = process.env.HOST || 'localhost:3000';
const schemes = HOST === 'localhost:3000' ? ['http'] : ['https'];

console.log('HOST:', HOST);
console.log('schemes:', schemes);

const doc = {
  info: {
    title: 'Contact API',
    description: 'API to interact with the contacts database'
  },
  host: HOST,
  schemes: schemes
};

const outputFile = './swagger-output.json'; // Swagger output file
const endpointsFiles = ['./server.js']; // Main server or routes file

swaggerAutogen(outputFile, endpointsFiles, doc);
