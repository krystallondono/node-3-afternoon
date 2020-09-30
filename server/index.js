require('dotenv').config()

const express = require('express');

const massive = require('massive');

const products_controller = require('./products_controller');

const app = express();

const {SERVER_PORT} = process.env;
// const SERVER_PORT = 3000;
const {CONNECTION_STRING} = process.env;

massive({connectionString: CONNECTION_STRING, ssl: {rejectUnauthorized: false}}
).then(dbInstance => {
    app.set('db', dbInstance)
}).catch( err => console.log(err));

app.use(express.json());

app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.post('/api/products', products_controller.create);
app.put('/api/products/:id', products_controller.update);
app.delete('/api/products/:id', products_controller.delete);


app.listen(SERVER_PORT, () => {
    console.log(`Server is running on ${SERVER_PORT}.`);
});


