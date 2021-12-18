const { model, Schema } = require('mongoose');

const epicSchema = new Schema({
    epicName: String,
    description: String,
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'organizations'
    },
    createdAt: String,                   
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
});

module.exports = model('Epic', epicSchema);