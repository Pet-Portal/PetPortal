const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const pets = require('../controllers/pets.controller');
const ratings = require('../controllers/ratings.controller');
const posts = require('../controllers/posts.controller');
const offers = require('../controllers/offers.controller');
const storageUsers = require('./storageUsers.config');
const storagePets = require('./storagePets.config');
const usersMid = require('../middlewares/users.middleware');
const petsMid = require('../middlewares/pets.middleware');
const postsMid = require('../middlewares/posts.middleware');
const secure = require('../middlewares/secure.middleware');


//PETS ROUTES

router.get('/users/:userId/pets', secure.isAuthenticated, pets.list);
router.post('/pets', secure.isAuthenticated, pets.create);
router.get('/pets/:id', secure.isAuthenticated, petsMid.petExists, pets.get);
router.delete('/pets/:id', secure.isAuthenticated, petsMid.petExists, petsMid.ownedByUser, pets.delete);
router.put('/pets/:id', secure.isAuthenticated, petsMid.petExists, petsMid.ownedByUser, storagePets.single('image'),  pets.update);
router.post('/pets/:petId/ratings', secure.isAuthenticated, ratings.create);


//USERS ROUTES

router.get('/users', secure.isAuthenticated, secure.checkRole('admin'), users.list);
router.post('/users', users.create);
router.get('/users/:id', usersMid.userExists, secure.isAuthenticated, users.get);
router.delete('/users/:id', usersMid.userExists, secure.isAuthenticated, usersMid.ownedByUser, users.delete);
router.put('/users/:id', usersMid.userExists, secure.isAuthenticated, usersMid.ownedByUser, storageUsers.single('avatar'), users.update);
router.post('/login', users.login);
router.post('/logout', secure.isAuthenticated, users.logout);
router.get('/activate', users.activate);


//POSTS ROUTES

router.get('/posts', posts.list);
router.get('/users/:userId/posts', secure.isAuthenticated, posts.listUserPosts);
router.post('/posts', secure.isAuthenticated, posts.create);
router.get('/posts/:id', secure.isAuthenticated, postsMid.postExists, posts.get);
router.delete('/posts/:id', secure.isAuthenticated, postsMid.postExists, postsMid.ownedByUser, posts.delete);
router.put('/posts/:id', secure.isAuthenticated, postsMid.postExists, postsMid.ownedByUser, posts.update);
router.post('/posts/:postId/ratings', secure.isAuthenticated, postsMid.postExists, ratings.create);
/* router.post('/posts/:postId/offers/:id/accept', secure.isAuthenticated, postsMid.postExists, offers.accept); */



//OFFERS ROUTES

router.post('/posts/:postId/offers', offers.create);

module.exports = router;