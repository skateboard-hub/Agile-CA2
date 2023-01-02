import express from 'express';
import asyncHandler from 'express-async-handler';
import {  getPeopleImages, getPeoples, getPeople } from '../tmdb-api';
import peopleModel from './peopleModel';

const router = express.Router(); 

router.get('/popular/:page', asyncHandler( async(req, res) => {
  const page = parseInt(req.params.page);
    const peoples = await getPeoples(page);
    res.status(200).json(peoples);
}));

router.get('/:id', asyncHandler( async(req, res,) => {
  const id = parseInt(req.params.id);
  const people = await getPeople(id);
  res.status(200).json(people);
}));


router.get('/:id/images', asyncHandler( async(req, res,) => {
  const images = await getPeopleImages(req.params.id);
  res.status(200).json(images);
}));

export default router;