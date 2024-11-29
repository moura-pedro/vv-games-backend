import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  game: {
    type: String,
    required: true
  },
  winner: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const sessionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  players: [{
    type: String
  }],
  games: [gameSchema]
}, {
  timestamps: true
});

export const Session = mongoose.model('Session', sessionSchema);