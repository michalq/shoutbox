const BaseModel = require('./baseModel');

class MessageModel extends BaseModel {
    constructor(app) {
        super(app);
        this.username = '';
        this.ipAddr = '';
        this.message = '';
        this.userAgent = '';
        this.postedAt = '';
    }

    /**
     * @returns {string}
     */
    getUsername() {
        return this.username;
    }

    /**
     * @returns {string}
     */
    getUserAgent() {
        return this.userAgent;
    }

    /**
     * @returns {string}
     */
    getIpAddr() {
        return this.ipAddr;
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
    getPostedAt() {
        return this.postedAt;
    }

    /**
     * @param {string} username
     * @returns {MessageModel}
     */
    setUsername(username) {
        this.username = username;

        return this;
    }

    /**
     * @params {string} userAgent
     * @returns {MessageModel}
     */
    setUserAgent(userAgent) {
        this.userAgent = userAgent;

        return this;
    }

    /**
     * @param {string} ipAddr
     * @returns {MessageModel}
     */
    setIpAddr(ipAddr) {
        this.ipAddr = ipAddr;

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
     * @param {string} postedAt
     * @returns {MessageModel}
     */
    setPostedAt(postedAt) {
        this.postedAt = postedAt;

        return this;
    }

    /**
     * @param {number} id
     * @returns {MessageModel}
     */
    setId(id) {
        this.id = id;

        return this;
    }

    /**
     * @returns {Promise}
     */
    save() {
        const sql = "INSERT INTO `shoutbox` (`username`, `user_agent`, `message`, `ip_addr`, `posted_at`) VALUES (?)";
        const values = [[
            this.getUsername(),
            this.getUserAgent(),
            this.getMessage(),
            this.getIpAddr(),
            parseInt(this.getPostedAt())
        ]];

        return new Promise((resolve, reject) => {
            this.connect();
            this.db.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows);
                }
            });
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
            .setId(rawObject.id)
            .setMessage(rawObject.message)
            .setIpAddr(rawObject.ip_addr)
            .setUsername(rawObject.username)
            .setUserAgent(rawObject.user_agent)
            .setPostedAt(rawObject.posted_at);

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