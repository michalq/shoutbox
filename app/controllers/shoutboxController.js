const BaseController = require('./baseController');

/**
 *
 */
class ShoutboxController extends BaseController {
    /**
     * Returns all available messages.
     */
    getMessages() {
        return this.sendOk({
            data: [
                {
                    time: 1234,
                    userName: 'xyz123',
                    content: 'Lorem ipsum dolor sit amet.'
                }
            ]
        });
    }

    /**
     * Returns all participants.
     */
    getParticipants() {
        return this.sendOk({
            data: [
                {
                    since: 1234,
                    userName: 'gal_anonim'
                }
            ]
        })
    }
}

module.exports = ShoutboxController;