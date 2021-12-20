const storiesResolvers = require('./stories');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
const testScenariosResolvers = require('./testScenarios');
const epicsResolvers = require('./epics');

// each query, mutation or sub, it has a resolver to process the logic


module.exports = {
    Epic: {                
        storyCount: epicsResolvers.StoryCountInEpic.getStoryCountByEpic
    },
    Story: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length, 
        testScenarioCount: (parent) => parent.testScenarios.length               
    },
    TestScenario: {        
        approvalCount: (parent) => parent.approvals.length,
        // questionCount: (parent) => parent.questions.length,
        // viewerCount: (parent) => parent.viewers.length
    },
    Query: {
        ...storiesResolvers.Query,
        ...usersResolvers.Query,
        ...epicsResolvers.Query
        // ...testScenariosResolvers.Query
    },
    Mutation: {
        ...epicsResolvers.Mutation,
        ...usersResolvers.Mutation,
        ...storiesResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...testScenariosResolvers.Mutation
    },
    
    // Subscription: {
    //     ...storiesResolvers.Subscription
    // }
};