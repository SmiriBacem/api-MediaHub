import mongoose, { Schema } from 'mongoose';
import { IMovie }  from '../Helper/Interfaces/movieInterface';


const movieSchema: Schema = new Schema({
  Title: { type: String, required: true },
  'US Gross': { type: Number },
  'US DVD Sales': { type: Number },
  'Worldwide Gross': { type: Number },
  'Production Budget': { type: Number },
  'Release Date': { type: String },
  Distributor: { type: String },
  'IMDB Rating': { type: Number },
  'IMDB Votes': { type: Number },
  'Major Genre': { type: String },
  Director: { type: String },
  'Rotten Tomatoes Rating': { type: String },
});

const MovieModel = mongoose.model<IMovie>('Movie', movieSchema);

export default MovieModel;