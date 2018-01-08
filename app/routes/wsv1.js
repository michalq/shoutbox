const express = require('express');
const router = express.Router();

const WebSocketController = require('../controllers/wsShoutBoxController');

router.get('/messages', (req, res, next) => {
    (new WebSocketController(req, res)).postMessage();
});

module.exports = router;