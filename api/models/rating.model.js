const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        pet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
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