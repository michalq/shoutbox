const BaseController = require('./BaseController');

/**
 *
 */
class UserController extends BaseController {
    /**
     * Simple authorization only by username.
     *
     * New participant that provide username will receive token that can be used to talk on chat.
     */
    authorize() {
        this.sendOk({
            success: true,
            token: 'abcadfdsafdsa'
        });
    }
}

module.exports = UserController;