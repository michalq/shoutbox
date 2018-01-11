const SERVER_URL = 'http://localhost:5000';

class MessageService {
    /**
     * @returns {Promise}
     */
    static getMessages() {
        return fetch(SERVER_URL + "/api/v1/shoutbox/messages")
            .then(res => {
                console.log(res);

                return res.json()
            })
            .catch(err => {
                console.error(err);
            });
    }
}

module.exports = MessageService;