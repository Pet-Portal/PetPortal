const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const pets = require('../controllers/pets.controller');
const ratings = require('../controllers/ratings.controller');
const posts = require('../controllers/posts.controller');
const offers = require('../controllers/offers.controller');
const storageUsers = require('./storageUsers.config');
const storagePets = require('./storagePets.config');
const storagePosts = require('./storagePosts.config');
const usersMid = require('../middlewares/users.middleware');
const petsMid = require('../middlewares/pets.middleware');
const postsMid = require('../middlewares/posts.middleware');
const secure = require('../middlewares/secure.middleware');
const app = require('../app');
const createError = require('http-errors');


//PETS ROUTES

router.get('/users/:userId/pets', secure.isAuthenticated, pets.list);
router.post('/pets', secure.isAuthenticated, storagePets.single('image'), pets.create);
router.get('/pets/:id', secure.isAuthenticated, petsMid.petExists, pets.get);
router.delete('/pets/:id', secure.isAuthenticated, petsMid.petExists, petsMid.ownedByUser, pets.delete);
router.put('/pets/:id', secure.isAuthenticated, petsMid.petExists, petsMid.ownedByUser, storagePets.single('image'),  pets.update);
router.post('/pets/:petId/ratings', secure.isAuthenticated, ratings.create);


//USERS ROUTES

router.get('/users', secure.isAuthenticated, secure.checkRole('admin'), users.list);
router.post('/users', users.create);
router.get('/users/:id', usersMid.userExists, secure.isAuthenticated, users.get);
router.delete('/users/:id', usersMid.userExists, secure.isAuthenticated, usersMid.ownedByUser, users.delete);
router.patch('/users/:id', usersMid.userExists, secure.isAuthenticated, usersMid.ownedByUser, storageUsers.single('avatar'), users.update);
router.post('/login', users.login);
router.post('/logout', secure.isAuthenticated, users.logout);
router.get('/activate', users.activate);


//POSTS ROUTES

router.get('/posts', posts.list);
router.get('/users/:userId/posts', secure.isAuthenticated, posts.listUserPosts);
router.post('/posts', secure.isAuthenticated, storagePosts.single('image'), posts.create);
router.get('/posts/:id', secure.isAuthenticated, postsMid.postExists, posts.get);
router.delete('/posts/:id', secure.isAuthenticated, postsMid.postExists, postsMid.ownedByUser, posts.delete);
router.patch('/posts/:id', secure.isAuthenticated, postsMid.postExists, postsMid.ownedByUser, storagePosts.single('image'), posts.update);
router.post('/posts/:postId/ratings', secure.isAuthenticated, postsMid.postExists, ratings.create);
router.post('/posts/:postId/offers/:id/accept', secure.isAuthenticated, postsMid.postExists, postsMid.ownedByUser, offers.accept);
router.get('/users/:userId/offers', secure.isAuthenticated, offers.listUserOffers);



//OFFERS ROUTES

router.post('/posts/:postId/offers', secure.isAuthenticated, postsMid.postExists, offers.create);
router.get('/posts/:postId/offers', secure.isAuthenticated, offers.offerListFromPost);
module.exports = router;

/* Handle 404 Errors */
router.use((req, res, next) => {
    next(createError(404, 'Route not found'));
});