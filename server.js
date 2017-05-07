import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
require('dotenv').config()
import Game from './app/models/game';
import {getGames, getGame, postGame, deleteGame } from './app/routes/game';

const app = express();
const port = process.env.PORT || 8081;

const options = {
    server: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
    replset: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}}
};

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL, options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/client/dist'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accespt");
    next();
});


app.route('/games')
    .post(postGame)
    .get(getGames);
app.route('/games/:id')
    .get(getGame)
    .delete(deleteGame);

app.route('*').get((req, res)=> {
    res.sendFile('client/dist.index.html', {root: __dirname});
})

app.listen(port, ()=>{
    console.log(`all the fun is happening on port ${port}`)
});