const { model, Schema } = require('mongoose');
const Organization = require('./Organization');

const epicSchema = new Schema({
    epicName: String,
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'organizations'
    },
    createdAt: String,                   
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Epic', epicSchema);