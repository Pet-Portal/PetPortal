const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const pets = require('../controllers/pets.controller');
const ratings = require('../controllers/ratings.controller');
const posts = require('../controllers/posts.controller');
const messages = require('../controllers/messages.controller');
const secure = require('../middlewares/secure.middleware');


//PETS ROUTES

router.get('/pets', pets.list);
router.post('/pets', pets.create);
router.get('/pets/:id', pets.get);
router.delete('/pets/:id', pets.delete);
router.put('/pets/:id', pets.update);


//USERS ROUTES

router.get('/users', users.list);
router.post('/users', users.create);
router.get('/users/:id', users.get);
router.delete('/users/:id', users.delete);
router.put('/users/:id', users.update);
router.post('/login', users.login);
router.post('/logout', users.logout);
router.get('/activate', users.activate);


//POSTS ROUTES

router.get('/posts', posts.list);
router.post('/posts', posts.create);
router.get('/posts/:id', posts.get);
router.delete('/posts/:id', posts.delete);
router.put('/posts/:id', posts.update);


//RATINGS ROUTES

router.post('/ratings/:userName', ratings.create);
router.delete('/ratings/:id', ratings.delete);
router.get('/ratings', ratings.list);
router.put('/ratings/:id', ratings.update);
router.get('/ratings/:id', ratings.get);


//MESSAGES ROUTES

router.post('/messages/:postId', messages.create);
router.delete('/messages/:id', messages.delete);
router.get('/messages/:postId', messages.list);
router.put('/messages/:id', messages.update);
router.get('/messages/:id', messages.get);

module.exports = router;