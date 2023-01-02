import userModel from '../api/users/userModel';
import genresModel from '../api/genres/genresModel';
import movieModel from '../api/movies/movieModel';
import peopleModel from '../api/peoples/peopleModel';
import movies from './movies.js';
import users from './users';
import genres from './genres';
import peoples from './peoples';
import dotenv from 'dotenv';

dotenv.config();

export async function loadMovies() {
  console.log('load seed data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

// deletes all user documents in collection and inserts test data
async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

async function loadGenres() {
  console.log('load genre Data');
  try {
    await genresModel.deleteMany();
    await genresModel.collection.insertMany(genres);
    console.info(`${genres.length} kinds of genres were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load genres Data: ${err}`);
  }
}

export async function loadPeoples() {
  console.log('load people data');
  try {
    await peopleModel.deleteMany();
    await peopleModel.collection.insertMany(peoples);
    console.info(`${peoples.length} peoples were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load person Data: ${err}`);
  }
}

if (process.env.SEED_DB) {
  loadUsers();
  loadGenres();
  loadMovies();
  loadPeoples();
}