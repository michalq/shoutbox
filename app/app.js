const express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    WebSocket = require('ws'),
    http = require('http'),
    mysql = require('mysql'),
    url = require('url');

const app = express();

const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

app.enable('trust proxy');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'jade');
app.set('db', dbConnection);

// Setting routes.
app.use('/', require('./routes/index'));
app.use('/api/v1', require('./routes/apiv1'));

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler.
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const port = process.env.PORT || 5000;
app.set('port', port);

const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const WebSocketController = require('./controllers/wsShoutBoxController');

/**
 * Function to broadcasting to all nodes.
 * @param {*} data
 */
wss.broadcast = data => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', (ws, req) => {
    const location = url.parse(req.url, true);

    switch (location.pathname) {
        case '/shoutbox':
            const controller = new WebSocketController(wss, ws, req);
            ws.on('message', message => controller.postMessage(app, message));
            break;
        default:
            ws.send(JSON.stringify({
                code: 404,
                state: "closing",
                message: "Route " + location.pathname + "not found"
            }));
            ws.close();
            return;
    }

    ws.send(JSON.stringify({
        code: 200,
        state: "connected"
    }));
});

module.exports = server;
