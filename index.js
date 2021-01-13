require('dotenv').config();

const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()

// API ENDPOINTS

app.listen(process.env.APP_PORT, () => {
    console.log(`Running on ${process.env.APP_URL}`)
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes)