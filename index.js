const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.Server(app)

const Database = require("@replit/database")
const db = new Database()

app
    .use(cors())
    .use(express.json())
    .set("view engine", "ejs")
    .use("/", require('./routes'))

server.listen(process.env.PORT || 5000, () => console.log("is ready"))