const mongoose = require('mongoose');

function connect({ host, db, user, pass}) {
    return mongoose.connect(
        `mongodb://${host}/${db}`,
        { user, pass}
    );
}

module.exports = { connect };