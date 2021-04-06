const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');
const Pet = require('./pet.model');
const Post = require('./post.model');

const ratingSchema = new Schema(
    {
        title: {
            type: String,
            required: 'Title is required',
            minlength: [5, 'You need at least 5 characters'],
        },
        rate: {
            type: Number,
            required: 'Rate is required',
            enum: [1, 2, 3, 4, 5],
        },
        text: {
            type: String,
            required: 'Text is required'
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: Post.modelName,
            required: 'Post is required'
        },
        reference: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'referenceModelName'
        },
        referenceModelName: {
            type: String,
            required: true,
            enum: ['User', 'Pet']
        }
    }, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret
        }
    }
}
);

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;