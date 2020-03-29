const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require("./routes/api/User");

const app = express();

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.use("/api/users", user);

mongoose
    .connect('mongodb+srv://root:admin123@cluster0-n8qnr.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => console.log('Server is running'));
        console.log('Database connected');
    })
    .catch((err) => console.log(err));
