class MessageSanitizer {
    /**
     * @param {string} message
     * @returns {string}
     */
    static sanitize(message) {
        // todo remove null byte
        return message;
    }
}

module.exports = MessageSanitizer;