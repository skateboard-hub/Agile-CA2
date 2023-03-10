import express from 'express';
import { movieReviews} from './moviesData';
import uniqid from 'uniqid';
import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import { getUpcoimngMovies , getTopRatedMovies , getMoviesByPage ,getMovieImages, getMovie} from '../tmdb-api';


const router = express.Router(); 
const pageReg = /^([1-9]|1[0-5])$/;
router.get('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    // find reviews in list
    if (movieReviews.id == id) {
        res.status(200).json(movieReviews);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

router.get('/', asyncHandler(async (req, res) => {
    const movies = await movieModel.find();
    res.status(200).json(movies);
}));

router.get('/page/:page', asyncHandler(async (req, res) => {
    if (pageReg.test(req.params.page)) {
        const page = parseInt(req.params.page);
        const moviesByPage = await getMoviesByPage(page);
        res.status(200).json(moviesByPage);
    }
    else {
        res.status(404).json({ message: 'Invalid page form.', status_code: 404 })
    }

}));


router.post('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);

    if (movieReviews.id == id) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        movieReviews.results.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

router.get('/:id/images', asyncHandler( async(req, res) => {
    const images = await getMovieImages(req.params.id);
    res.status(200).json(images);
}));

router.get('/upcoming/:page', asyncHandler(async (req, res) => {
    if (pageReg.test(req.params.page)) {
        const page = parseInt(req.params.page);
        const upcomingMovies = await getUpcoimngMovies(page);
        if (upcomingMovies) {
            res.status(200).json(upcomingMovies);
        } else {
            res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
        }
    }
    else {
        res.status(404).json({ message: 'Invalid page.', status_code: 404 })
    }
}));

router.get('/topRated/:page', asyncHandler(async (req, res) => {
    if (pageReg.test(req.params.page)) {
        const page = parseInt(req.params.page);
        const topRatedMovies = await getTopRatedMovies(page);
        if (topRatedMovies) {
            res.status(200).json(topRatedMovies);
        } else {
            res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
        }
    }
    else {
        res.status(404).json({ message: 'Invalid page.', status_code: 404 })
    }
}));

export default router;