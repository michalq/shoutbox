class MessageSanitizer {
    /**
     * @param {string} message
     * @returns {string}
     */
    static sanitize(message) {
        // todo remove null byte
        return MessageSanitizer.clearHtml(message);
    }

    /**
     * @param {string} text
     * @returns {string}
     */
    static clearHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
}

module.exports = MessageSanitizer;