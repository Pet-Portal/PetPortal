require('dotenv').config();
const mongoose = require('mongoose');
const Pet = require('../models/pet.model');
const User = require('../models/user.model');
const Post = require('../models/post.model');
const petsData = require('../data/pets.json');
const usersData = require('../data/users.json');
const postsData = require('../data/posts.json');


require('../config/db.config');

mongoose.connection.once('open', () => {
    console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);
    mongoose.connection.db.dropDatabase()
        .then(() => console.log(`- Database dropped`))
        .then(() => User.create(usersData))
        .then(users => {
            console.info(`- Added ${users.length} users`)
            const petsWithOwnerIds = petsData.map(pet => {
                pet.owner = users.find(user => user.email === pet.owner);
                return pet
            })
            return Pet.create(petsWithOwnerIds)
                .then(pets => {
                    console.info(`- Added ${pets.length} pets`)
                    return Promise.resolve([users, pets])
                })
        })
        .then(([users, pets]) => {
            const postWithUserIds = postsData.map(post => {
                post.user = users.find(user => user.email === post.user);
                post.pet = pets.find(pet => pet.name === post.pet);
                return post
            })
            return Post.create(postWithUserIds)
        })
        .then(posts => console.info(`- Added ${posts.length} posts`))
        .then(() => console.info(`- All data created!`))
        .catch(error => console.error(error))
        .then(() => process.exit(0))
});
