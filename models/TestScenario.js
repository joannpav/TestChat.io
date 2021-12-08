const { model, Schema } = require('mongoose');


const testScenarioSchema = new Schema({   
    scenario: String,
    risk: String,
    testType: String,
    executionType: String,
    username: String,
    createdAt: String, 
    approvals: [
        {
            username: String,
            createdAt: String
        }
    ],
    questions: [
        { 
            username: String,
            createdAt: String
        }
    ],
    viewers: [
        {
            username: String,
            caretedAt: String
        }
    ],    
    story: {
        type: Schema.Types.ObjectId,
        ref: 'stories'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('TestScenario', testScenarioSchema);