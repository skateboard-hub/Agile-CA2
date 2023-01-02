import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const PeopleSchema = new Schema({
    birthday:{ type:String },
    known_for_department: { type:String },
    deathday:{ type:String },
    id:{ type : Number , required: true, unique: true },
    name: { type: String },
    adult: { type: Boolean },
    gender: { type: Number },
    biography: { type: String },
    popularity: { type: Number },
    place_of_birth: { type: String},
    profile_path: {type: String},
    adult: { type: Boolean },
    imdb_id: { type: String},
    known_for: [{
        adult: { type: Boolean },
        id: { type: Number, required: true, unique: false },
        poster_path: { type: String },
        overview: { type: String },
        release_date: { type: String },
        original_title: { type: String },
        genre_ids: [{ type: Number }],
        original_language: { type: String },
        title: { type: String },
        backdrop_path: { type: String },
        popularity: { type: Number },
        vote_count: { type: Number },
        video: { type: Boolean },
        vote_average: { type: Number },
        production_countries: [{
            iso_3166_1: { type: String },
            name: { type: String }
        }],
        runtime: { type: Number },
        spoken_languages: [{
            iso_639_1: { type: String },
            name: { type: String }
        }],
        status: { type: String },
        tagline: { type: String }
    }],

});

PeopleSchema.statics.findByPeopleId = function (id) {
    return this.findOne({ id: id });
};

export default mongoose.model('People', PeopleSchema);
