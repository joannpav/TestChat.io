const { model, Schema } = require('mongoose');

const testScenarioSchema = new Schema({
    scenario: String,
    risk: Number, 
    testType: String,
    executionType: String,
    username: String,
    createdAt: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('TestScenario', testScenarioSchema);