const UsernameValidator = require('../services/shoutbox/usernameValidator'),
    MessageValidator = require('../services/shoutbox/messageValidator'),
    MessageSanitizer = require('../services/shoutbox/messageSanitizer'),
    MessageModel = require('../models/messageModel');

/**
 * Web Socket controller to manage shoutbox.
 */
class WsShoutBoxController {
    constructor(req) {
        this.req = req;
    }

    /**
     * Post single message to shoutbox.
     */
    postMessage(payload) {
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
            response.messages = msgValidator.getMessages()
                .concat(nameValidator.getMessage());
            response.code = 400;

            return Promise.resolve(JSON.stringify(response));
        }

        return (new MessageModel())
            .setSenderUserAgent(this.req.headers['user-agent'])
            .setSenderName(username)
            .setSenderIp(this.req.ip)
            .setMessage(message)
            .setSendDate(1234) // TODO
            .add()
            .then(_ => {
                return JSON.stringify({code: 200});
            }).catch(err => {
                console.error(err);

                return JSON.stringify({code: 500});
            });
    }
}

module.exports = WsShoutBoxController;