const storiesResolvers = require('./stories');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
const testScenariosResolvers = require('./testScenarios');

// each query, mutation or sub, it has a resolver to process the logic


module.exports = {
    Story: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length,
        // testScenarios: async (story) => {
        //     return (await story.populate('testScenarios'));
        // },
        
        // testScenarioCount: (parent) => parent.testScenarios.length,
        // approvalCount: (parent) => parent.testScenarios.approvals.length
        // questionCount: (parent) => parent.testScenarios.questions.length,
        // viewerCount: (parent) => parent.testScenarios.viewers.length
    },
    // TestScenario: {        
    //     approvalCount: (parent) => parent.approvals.length,
    //     questionCount: (parent) => parent.questions.length,
    //     viewerCount: (parent) => parent.viewers.length
    // },
    Query: {
        ...storiesResolvers.Query,
        ...usersResolvers.Query,
        // ...testScenariosResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...storiesResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...testScenariosResolvers.Mutation
    },
    
    // Subscription: {
    //     ...storiesResolvers.Subscription
    // }
};