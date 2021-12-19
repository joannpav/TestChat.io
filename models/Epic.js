const { model, Schema } = require('mongoose');

const epicSchema = new Schema({
    epicName: String,
    description: String,
    createdAt: String,   
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization'
    },                    
});

module.exports = model('Epic', epicSchema);