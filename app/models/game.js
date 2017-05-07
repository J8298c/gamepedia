import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: String,
    year: Number,
    description: String,
    picture: String,
    postDate: {type: Date, default: Date.now}
});

const Game = mongoose.model('Game', gameSchema);

export default Game;