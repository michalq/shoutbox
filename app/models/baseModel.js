class BaseModel {
    constructor(db) {
        this.db = db;
    }

    connect() {
        this.db.connect(err => {
            console.log(err);
        });
    }

    disconnect() {
        this.db.end(err => {
            console.error(err);
        });
    }
}

module.exports = BaseModel;