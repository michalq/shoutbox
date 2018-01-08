class UsernameValidator {
    constructor() {
        this.messages = [];
        this.isValid = false;
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    validate(name) {
        this.isValid = true;
        if (name.length <= 5) {
            this.messages.push('Name must contain at least 5 characters.');
            this.isValid = false;
        }

        if (/^a-zA-Z0-9_$/.test(name)) {
            this.message.push('Name must contain only aphanumeric characters and underscore.');
            this.isValid = false;
        }

        return this;
    }

    getMessage() {
        return this.message;
    }

    isValid() {
        return this.isValid;
    }
}

module.exports = UsernameValidator;