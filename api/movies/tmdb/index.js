import { getUpcomingMovies, getTopRatedMovies, getMovie, getMovieImages, getMovieReviews } from "../../tmdb-api";
import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();
const pageReg = /^([1-9]|1[0-5])$/;

router.get('/movie/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie(id);
    res.status(200).json(movie);

}));

router.get('/movie/:id/images', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movieImages = await getMovieImages(id);
    res.status(200).json(movieImages);

}));

router.get('/movie/:id/reviews', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movieReviews = await getMovieReviews(id);
    res.status(200).json(movieReviews);

}));
export default router;