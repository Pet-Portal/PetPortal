const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const pets = require('../controllers/pets.controller');
const ratings = require('../controllers/ratings.controller');
const posts = require('../controllers/posts.controller');
const messages = require('../controllers/messages.controller');
const storageUsers = require('./storageUsers.config');
const usersMid = require('../middlewares/users.middleware');
const secure = require('../middlewares/secure.middleware');


//PETS ROUTES

router.get('/pets', pets.list);
router.post('/pets', pets.create);
router.get('/pets/:id', pets.get);
router.delete('/pets/:id', pets.delete);
router.put('/pets/:id', pets.update);


//USERS ROUTES

router.get('/users', secure.isAuthenticated, users.list);
router.post('/users', users.create);
router.get('/users/:id', usersMid.userExists, secure.isAuthenticated, users.get);
router.delete('/users/:id', usersMid.userExists, secure.isAuthenticated, users.delete);
router.put('/users/:id', usersMid.userExists, secure.isAuthenticated, storageUsers.single('avatar'), users.update);
router.post('/login', users.login);
router.post('/logout', secure.isAuthenticated, users.logout);
router.get('/activate', users.activate);


//POSTS ROUTES

router.get('/posts', posts.list);
router.post('/posts', secure.isAuthenticated, posts.create);
router.get('/posts/:id', secure.isAuthenticated, posts.get);
router.delete('/posts/:id', secure.isAuthenticated, posts.delete);
router.put('/posts/:id', secure.isAuthenticated, posts.update);
router.post('/posts/:postId/ratings', secure.isAuthenticated, ratings.create)



//MESSAGES ROUTES

router.post('/posts/:postId/messages', messages.create);
router.get('/posts/:postId/messages', messages.list);


module.exports = router;