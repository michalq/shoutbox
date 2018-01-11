const UsernameValidator = require('../services/shoutbox/usernameValidator'),
    MessageValidator = require('../services/shoutbox/messageValidator'),
    MessageSanitizer = require('../services/shoutbox/messageSanitizer'),
    MessageModel = require('../models/messageModel');

/**
 * Web Socket controller to manage shoutbox.
 */
class WsShoutBoxController {
    /**
     * @param {object} wss Websocket server object.
     * @param {object} ws Websocket connection object.
     * @param {object} req Request object.
     */
    constructor(wss, ws, req) {
        this.wsServer = wss;
        this.wsConnection = ws;
        this.req = req;
    }

    /**
     * @returns {string}
     */
    getUserAgent() {
        return this.req.headers['user-agent'];
    }

    /**
     * Post single message to shoutbox.
     *
     * @param {object} app
     * @param {string} payload
     */
    postMessage(app, payload) {
        const response = {
            messages: []
        };

        try {
            payload = JSON.parse(payload);
        } catch (e) {
            response.code = 400;
            response.messages = ['Not JSON.'];
            return Promise.resolve(JSON.stringify(response));
        }

        const msgValidator = new MessageValidator(),
            nameValidator = new UsernameValidator(),
            message = MessageSanitizer.sanitize(payload.msg),
            username = payload.username;

        if (!msgValidator.validate(message).isValid() ||
            !nameValidator.validate(username).isValid()
        ) {
            response.messages = msgValidator.getMessages().concat(nameValidator.getMessage());
            response.code = 400;
            return Promise.resolve(JSON.stringify(response));
        }

        const timestamp = Math.floor(Date.now() / 1000);

        return (new MessageModel(app.get('db')))
            .setSenderUserAgent(this.getUserAgent())
            .setSenderName(username)
            .setSenderIp(this.req.ip)
            .setMessage(message)
            .setSendDate(timestamp)
            .save()
            .then(_ => {
                return JSON.stringify({code: 200});
            })
            .then(resp => {
                // Send confirmation to sender.
                this.wsConnection.send(resp);
                // Send message to all nodes.
                this.wsServer.broadcast(
                    WsShoutBoxController.getBroadcastResponse(username, message, timestamp)
                );
            })
            .catch(err => {
                console.error("DB error: " + err);

                return JSON.stringify({code: 500});
            });
    }

    /**
     * @param {string} username
     * @param {string} message
     * @param {number} timestamp
     *
     * @returns {string}
     */
    static getBroadcastResponse(username, message, timestamp) {
        return JSON.stringify({
            username: username,
            message: message,
            timestamp: timestamp
        });
    }
}

module.exports = WsShoutBoxController;