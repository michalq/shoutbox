class MessageValidator {
    constructor() {
        this.valid = false;
        this.messages = [];
    }

    /**
     * @param {string} message
     * @returns {MsgValidator}
     */
    validate(message) {
        this.valid = true;
        if (typeof message !== "string" || message.length === 0) {
            this.messages.push('message must contain at least one char');
            this.valid = false;

            return this;
        }

        return this;
    }

    /**
     * @returns {boolean}
     */
    isValid() {
        return this.valid;
    }

    /**
     * @returns {Array}
     */
    getMessages() {
        return this.messages;
    }
}

module.exports = MessageValidator;