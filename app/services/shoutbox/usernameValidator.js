class UsernameValidator {
    constructor() {
        this.messages = [];
        this.valid = false;
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    validate(name) {
        this.valid = true;
        if (typeof name !== "string") {
            this.messages.push('Username not specified.');
            this.valid = false;

            return this;
        }

        if (name.length <= 5) {
            this.messages.push('Username must contain at least 5 characters.');
            this.valid = false;
        }

        if (/^a-zA-Z0-9_$/.test(name)) {
            this.messages.push('Username must contain only aphanumeric characters and underscore.');
            this.valid = false;
        }

        return this;
    }

    getMessage() {
        return this.messages;
    }

    isValid() {
        return this.valid;
    }
}

module.exports = UsernameValidator;