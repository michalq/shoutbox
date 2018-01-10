class MessageModel {
    constructor() {
        this.senderName = '';
        this.senderIp = '';
        this.message = '';
        this.senderUserAgent = '';
        this.sendDate = '';
    }

    /**
     * @returns {string}
     */
    getSenderName() {
        return this.senderName;
    }

    /**
     * @returns {string}
     */
    getSenderUserAgent() {
        return this.senderUserAgent;
    }

    /**
     * @returns {string}
     */
    getSenderIp() {
        return this.senderIp;
    }

    /**
     * @returns {string}
     */
    getMessage() {
        return this.message;
    }

    /**
     * @returns {string}
     */
    getSendDate() {
        return this.sendDate;
    }

    /**
     * @param {string} senderName
     * @returns {MessageModel}
     */
    setSenderName(senderName) {
        this.senderName = senderName;

        return this;
    }

    /**
     * @params {string} senderUserAgent
     * @returns {MessageModel}
     */
    setSenderUserAgent(senderUserAgent) {
        this.senderUserAgent = senderUserAgent;

        return this;
    }

    /**
     * @param {string} senderIp
     * @returns {MessageModel}
     */
    setSenderIp(senderIp) {
        this.senderIp = senderIp;

        return this;
    }

    /**
     * @param {string} message
     * @returns {MessageModel}
     */
    setMessage(message) {
        this.message = message;

        return this;
    }

    /**
     * @param {string} sendDate
     * @returns {MessageModel}
     */
    setSendDate(sendDate) {
        this.sendDate = sendDate;

        return this;
    }

    /**
     * @returns {boolean}
     */
    add() {
        return new Promise((resolve, reject) => {
            return 'test'; // TODO
        });
    }

    /**
     * Creates and fill model with raw data from database.
     *
     * @param {object} rawObject
     * @returns {MessageModel}
     */
    static createFromRaw(rawObject) {
        const message = new MessageModel();
        message
            .setMessage(rawObject.message)
            .setSenderIp(rawObject.sender_ip)
            .setSenderName(rawObject.sender_name)
            .setSenderUserAgent(rawObject.sender_user_agent)
            .setSendDate(moment());

        return message;
    }

    /**
     * @throws Error
     */
    update() {
        throw new Error('Message update not allowed.');
    }
}

module.exports = MessageModel;