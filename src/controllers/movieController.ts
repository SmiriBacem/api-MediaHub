import { Request, Response } from "express";
import Movie from "../models/movieSchema";

// Récupérer les détails d'un film by ID
export const getMovieDetails = async (req: Request, res: Response) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Film introuvable" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des détails du film", error });
  }
};

// Récupérer la liste des films
export const getMoviesList = async (req: Request, res: Response) => {
    try {
      const movies = await Movie.find({});
      if (!movies) {
        return res.status(404).json({ message: "Pas de films introuvable" });
      }
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des film", error });
    }
};

// Trier les résultats par titre, ou par la note Rotten Tomatoes, la note IMDB, ou le nombre de votes sur IMDB 
export const getMoviesTriByField = async (req: Request, res: Response) => {
    console.log("QUERY",req.query)
    const { sort } = req.query;
  
    try {
      let sortField: string = '';
  
      // Déterminer le champ à trier en fonction de la valeur fournie
      switch (sort) {
        case 'title':
          sortField = 'Title';
          break;
        case 'rottenTomatoesRating':
          sortField = 'Rotten Tomatoes Rating';
          break;
        case 'imdbRating':
          sortField = 'IMDB Rating';
          break;
        case 'imdbVotes':
          sortField = 'IMDB Votes';
          break;
        default:
          sortField = 'Title'; // Par défaut trier par titre
          break;
      }
  
      // Trier film par specéfique Field
      const movies = await Movie.find().sort({ [sortField]: 1 });
  
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors du tri des films', error });
    }
  };

  // Chercher  les  films  and trier par  à spécifique field
export const searchAndSortMovies = async (req: Request, res: Response) => {
    const { query, sortBy } = req.query;
  
    try {
      let sortField: string = '';
  
      // Déterminer le champ à trier en fonction de la valeur fournie
      switch (sortBy) {
        case 'title':
          sortField = 'Title';
          break;
        case 'rottenTomatoesRating':
          sortField = 'Rotten Tomatoes Rating';
          break;
        case 'imdbRating':
          sortField = 'IMDB Rating';
          break;
        case 'imdbVotes':
          sortField = 'IMDB Votes';
          break;
        default:
          sortField = 'Title'; // Par défaut trier par titre
          break;
      }
  
      // Rechercher des films correspondant à la requête et les trier par le champ spécifié
      const movies = await Movie.find({ Title: { $regex: query, $options: 'i' } }).sort({ [sortField]: 1 });
  
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors la recherche des films', error });
    }
  };
  