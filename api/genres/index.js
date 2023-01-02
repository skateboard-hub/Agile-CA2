import express from 'express';
import Genre from './genresModel';
import {genres} from './genresData';
import asyncHandler from 'express-async-handler';

const genresRouter = express.Router(); 


genresRouter.get('/', (req, res) => {
    res.json(genres);
});

genresRouter.get('/', asyncHandler(async (req, res) => {
    const genres = await Genre.find();
    res.status(200).json(genres);
}));

export default genresRouter;