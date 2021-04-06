const mongoose = require('mongoose');

const Schema = mongoose.Schema

const messageSchema = new Schema({
    title: {
        type: String,
        required: 'Title is required',
        minlength: [5, 'Title needs at least 5 chars']
    },
    text: {
        type: String,
        required: 'Text is required',
        minlength: [20, 'Text needs at least 20 chars']
    },
    price: {
        type: Number,
        required: 'Price per day is required'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
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
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;