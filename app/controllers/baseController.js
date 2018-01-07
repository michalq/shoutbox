class BaseController {
    constructor(res, req) {
        this.res = res;
        this.req = req;
    }

    /**
     * Send response with status 'OK'.
     *
     * @param {object} msg
     */
    sendOk(msg) {
        this.res.status = 200;
        this.res.json(msg);
    }

    /**
     * Send response with status 'No content'.
     */
    sendNoContent() {
        this.res.status = 204;
    }

    /**
     * Displays internal error page.
     *
     * @param {String|object} msg
     */
    sendInternalError(msg) {
        this.res.statusCode = 500;
        this.res.json(BaseController.getErrorPayload(msg, this.res.statusCode));
    }

    /**
     * Bad Request.
     *
     * @param  {String|object} msg
     */
    sendBadRequest(msg) {
        this.res.statusCode = 400;
        this.res.json(BaseController.getErrorPayload(msg, this.res.statusCode));
    }

    /**
     * Not found.
     *
     * @param  {String|object} msg
     */
    sendNotFound(msg) {
        this.res.statusCode = 404;
        this.res.json(BaseController.getErrorPayload(msg, this.res.statusCode));
    }

    /**
     * Returns error payload, whether error is string or object.
     *
     * @param {String|object} msg
     * @param {Number} httpCode
     *
     * @returns {object}
     */
    static getErrorPayload(msg, httpCode) {
        if (typeof msg === 'string') {
            return {
                success: false,
                code: httpCode,
                error: {
                    message: msg
                }
            }
        }

        return {
            success: false,
            code: httpCode,
            errors: msg
        };
    }
}

module.exports = BaseController;