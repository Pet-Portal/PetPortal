const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;
const bcrypt = require('bcrypt');
const Rating = require('../models/rating.model');
const Pet = require('../models/pet.model');
const admins = (process.env.ADMINS_EMAIL || '')
    .split(',')
    .map(admin => admin.trim());

const userSchema = new Schema({
    name: {
        type: String,
        required: 'An user name is required'
    },
    email: {
        unique: true,
        type: String,
        required: 'A valid email is required',
        match: [EMAIL_PATTERN, 'the email is invalid']
    },
    password: {
        type: String,
        required: 'A valid password is required',
        match: [PASSWORD_PATTERN, 'the password is invalid']
    },
    avatar: {
        type: String,
        default: function() {
            return "https://res.cloudinary.com/djbn7xax3/image/upload/v1617121010/PetPortal/avatar_aowbin.png"
        }
    },
    role: {
        type: String,
        enum: ["guest", "admin"],
        default: 'guest'
    },
    location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point'
        },
        coordinates: {
          type: [Number],
          required: 'Your location is required',
          validate: {
            validator: function([lng, lat]) {
              return isFinite(lng) && isFinite(lat) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
            },
            message: props => `Invalid location coordinates`
          }
        }
      },
    verified: {
        date: Date,
        token: {
            type: String,
            default: () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        },
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            ret.location = ret.location.coordinates;
            return ret
        }
    },
    toObject: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret
        }
    }
})

userSchema.virtual('ratings', {
    ref: Rating.modelName,
    localField: '_id',
    foreignField: 'user',
    options: {
        sort: { createdAt: -1 },
        limit: 10
    }
});

userSchema.virtual('pets', {
    ref: Pet.modelName,
    localField: '_id',
    foreignField: 'owner'
});

userSchema.pre('save', function (next) {
    if (admins.includes(this.email)) {
        this.role = 'admin';
    }
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash;
        next();
        });
    } else {
        next();
    }
});



userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;
