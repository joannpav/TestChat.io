const { model, Schema } = require('mongoose');

const storySchema = new Schema({
    // epic: {
    //     title: String,
    //     createdAt: String,
    // },
    epicName: String,
    body: String,
    acceptanceCriteria: String,
    username: String,
    createdAt: String,   
    testScenarios: [
            {
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
                ]
            }
        ],
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Story', storySchema);