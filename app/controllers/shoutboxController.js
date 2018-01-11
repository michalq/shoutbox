const BaseController = require('./baseController');
const MessageCollection = require('../models/messageCollection');
const MAX_ENTRIES = 10;
/**
 *
 */
class ShoutboxController extends BaseController {
    /**
     * Returns all available messages.
     */
    getMessages() {
        const collection = new MessageCollection(this.req.app.get('db'));
        const messages = collection.getAll(MAX_ENTRIES);

        messages.then(data => {
            const msgs = [];
            data.forEach(val => {
                msgs.push({
                    postedAt: val.getPostedAt(),
                    username: val.getUsername(),
                    message: val.getMessage()
                });
            });

            return this.sendOk({data: msgs});
        });
    }
}

module.exports = ShoutboxController;