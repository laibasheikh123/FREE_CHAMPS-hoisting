const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const port = process.env.SERVER_PORT;
const cors = require('cors')
const path = require ('path')

const clientPath = path.join(__dirname, './dist')


app.use(cors());
app.use(express.json());
app.use('/', express.static(clientPath))

app.use('/api', require('./Users/router/users'));
app.use('/api', require('./Users/router/courses'));

app.get('*' , (req,res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'))
})



mongoose.connect(process.env.MONGO_URI)
    .then(() => { 
        console.log("DB Connected 🚀");
        app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));
    })
    .catch((err) => console.log(err));



