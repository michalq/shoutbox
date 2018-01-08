const express = require('express');
const router = express.Router();

const ShoutboxController = require('../controllers/shoutboxController');

router.get('/shoutbox/messages', (req, res, next) => {
    (new ShoutboxController(req, res)).getMessages();
});

router.get('/shoutbox/participants', (req, res, next) => {
    (new ShoutboxController(req, res)).getParticipants();
});

module.exports = router;