class BaseModel {
    constructor(db) {
        this.db = db;
        this.db.connect(err => {
            console.log(err.code);
        });
    }

    disconnect() {
        this.db.disconnect(err => {
            console.error(err.code);
        });
    }
}

module.exports = BaseModel;