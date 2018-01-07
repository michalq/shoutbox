const express = require('express');
const router = express.Router();

const ShoutboxController = require('../controllers/shoutboxControler');
const UserController = require('../controllers/userController');

router.post('/auth', (req, res, next) => {
    (new UserController(req, res)).authorize();
});

router.post('/shoutbox/message', (req, res, next) => {
    (new ShoutboxController(req, res)).postMessage();
});

router.get('/shoutbox/messages', (req, res, next) => {
    (new ShoutboxController(req, res)).getMessages();
});

router.get('/shoutbox/participants', (req, res, next) => {
    (new ShoutboxController(req, res)).getParticipants();
});

module.exports = router;