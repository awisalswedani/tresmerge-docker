const express = require('express');
//const mongoose = require('mongoose');
const redis = require('redis');
const { Client } = require('pg')

// init app
const app = express();
const port = process.env.PORT ||3000;

// Connect to Redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis'; 
const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.connect();

// connect to DB
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = '5432';
const DB_HOST = 'postgres'; 


const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const client = new Client({
  connectionString: URI,
});
client.connect()
  //.connect(URI)
  .then(() => console.log('Connected to postgre db...'))
  .catch(err => console.log('Could not connect to postgre db...', err));





// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = '27017'; // default MongoDB port
// const DB_HOST = 'mongo';


// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose
//   .connect(URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.log('Could not connect to MongoDB', err));

app.get('/', (req, res) => {
  redisClient.set('products', 'products......'); // Example of setting a value in Redis
  res.send('Hello, World!');
});
app.get('/data', async (req, res) => {
 const products = await redisClient.get('products');
  res.send(`<h1>Hello, World!</h1> <h2>${products}</h2>`);
});

// Middleware to parse JSON bodies
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 