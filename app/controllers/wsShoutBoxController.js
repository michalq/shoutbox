const UsernameValidator = require('../services/shoutbox/usernameValidator'),
    MessageValidator = require('../services/shoutbox/messageValidator'),
    MessageSanitizer = require('../services/shoutbox/messageSanitizer'),
    MessageModel = require('../models/messageModel');

/**
 * Web Socket controller to manage shoutbox.
 */
class WsShoutBoxController {
    /**
     * Post single message to shoutbox.
     */
    postMessage(payload) {
        const response = {
            messages: []
        };

        if (typeof payload !== 'object') {
            response.code = 400;
            response.messages = ['Message is empty.'];

            return response;
        }

        if (typeof payload.msg !== 'string') {
            response.code = 400;
            response.messages = ['Message is empty.'];

            return response;
        }

        if (typeof payload.username !== 'string') {
            response.code = 400;
            response.message = ['Username is not specified.'];

            return response;
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

            return response;
        }

        (new MessageModel())
            .setSenderUserAgent(this.req.headers['user-agent'])
            .setSenderName(username)
            .setSenderIp(this.req.ip)
            .setMessage(message)
            .setSendDate(moment())
            .add()
            .then(_ => {
                return {code: 200};
            }).catch(err => {
                console.error(err);

                return {code: 500};
            });
    }
}

module.exports = WsShoutBoxController;