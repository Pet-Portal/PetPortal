const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');


const postSchema = new Schema({
    title: {
        type: String,
        required: 'Title is required',
        minlength: [5, 'Title needs at least 5 chars']
    },
    description: {
        type: String,
        required: 'A description is required',
        minlength: [10, 'Your description needs at least 10 chars']
    },
    image: {
        type: String,
        required: 'An Image is required',
        image: {
            type: String,
            required: 'Image is required',
            validate: {
              validator: function (value) {
                try {
                  const url = new URL(value);
                  return url.protocol === 'http:' || url.protocol === 'https:'
                } catch(error) {
                  return false;
                }
              },
              message: props => `Invalid image URL`
            }
          }
    },
    state: {
        type: String,
        enum: ['posted', 'pending', 'confirmed'],
        default: function () {
            return 'posted'
        }
    },
    start: {
        type: Date,
        required: 'Start date is required',
        validate: {
            validator: function (value) {
                return moment().startOf('day').isBefore(moment(value))
            },
            message: props => `Starting must not be in the past`
        }
    },
    end: {
        type: Date,
        required: 'End date is required',
        validate: {
            validator: function (value) {
                return moment(value).isAfter(moment(this.start)) || moment(value).isSame(moment(this.start))
            },
            message: props => `Ending must not be before the start date`
        }
    },
    user: {
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
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;