const BaseModel = require('./baseModel');
const MessageModel = require('./messageModel');

class MessageCollection extends BaseModel {
    getAll(limit) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM shoutbox ORDER BY id DESC LIMIT " + parseInt(limit), (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }).then(data => {
            const tmp = [];
            data.forEach(val => {
                tmp.push(MessageModel.createFromRaw(val));
            });

            return tmp;
        });
    }
}

module.exports = MessageCollection;