class MessageService {
    /**
     * @returns {object[]}
     */
    static getMessages() {
        return [
            {
                key: "1",
                username: "John Snow",
                timestamp: "12:23",
                message: "Lorem ipsum dolor sit amet."
            },
            {
                key: "2",
                username: "John Snow2",
                timestamp: "3 days ago",
                message: "Lorem ipsum dolor sit amet2."
            }
        ];
    }
}

module.exports = MessageService;