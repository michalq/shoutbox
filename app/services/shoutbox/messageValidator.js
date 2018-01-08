class MessageValidator {
    constructor() {
        this.isValid = false;
        this.messages = [];
    }

    /**
     * @param {string} message
     * @returns {MsgValidator}
     */
    validate(message) {
        this.isValid = true;
        if (typeof payload.msg !== "string" || payload.msg.length === 0) {
            this.messages.push('message must contain at least one char');
            this.isValid = false;
            return this;
        }

        return this;
    }

    /**
     * @returns {boolean}
     */
    isValid() {
        return this.isValid;
    }

    /**
     * @returns {Array}
     */
    getMessages() {
        return this.messages;
    }
}

module.exports = MessageValidator;