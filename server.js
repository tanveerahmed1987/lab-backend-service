const express = require('express');
const mongoose = require('mongoose');

const app = express();


app.get('/', (req, res) => res.send('Hello World!'));

mongoose
    .connect('mongodb://localhost:27018', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => console.log('Server is running'));
        console.log('Database connected');
    })
    .catch((err) => console.log(err));
