const { gql } = require('apollo-server');

module.exports = gql`

type Organization {
    id: ID!
    orgName: String!
    createdAt: String!    
    adminUser: String
    users: [User]
}
type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    orgName: String!
}
type Epic {
    id: ID!
    epicName: String
    description: String        
    createdAt: String!
    users: [User]!
    organization: Organization
    storyCount: Int!
    scenarioCount: Int!
}
# type StoryCountInEpic {
#     epicName: String
#     totalStories: Int
# }
type Story {
    id: ID!
    epic: Epic!
    body: String!
    acceptanceCriteria: String
    createdAt: String!
    username: String! 
    testScenarios: [TestScenario]!  
    testScenarioCount: Int!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!     
}
type Comment{
    id: ID!
    createdAt: String!
    username: String!
    body: String!    
}
type TestScenario {
    id: ID!
    scenario: String!
    risk: Int
    testType: String
    executionType: String
    username: String!
    createdAt: String! 
    approvalCount: Int!
    disapprovalCount: Int!
    questionCount: Int!
    viewerCount: Int!
    approvals: [Approval]
    disapprovals: [Dispproval]
    questions: [Question]
    viewers: [Viewer]  
    comments: [Comment]!
    commentCount: Int!
}
type Approval{
    id: ID!
    createdAt: String!
    username: String!
}

type Dispproval{
    id: ID!
    createdAt: String!
    username: String!
}
type Question{
    id: ID!
    createdAt: String!
    username: String!
}
type Viewer{
    id: ID!
    createdAt: String!
    username: String!
}

type Like{
    id: ID!
    createdAt: String!
    username: String!
}

input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    orgName: String!
}
type Query {
    getUsers: [User]
    getStory(storyId: ID!): Story   
    getStories(epicId: ID!): [Story]      
    getEpic(epicId: ID!): Epic
    getEpics: [Epic] 
    getStoryCountByEpic: Int  
    getScenarioCountByEpic: Int  
}
type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createEpic(epicName: String!, description: String): Epic!
    createStory(epicId: ID!, body: String!, acceptanceCriteria: String): Story!
    deleteStory(storyId: ID!): String!
    createComment(storyId: ID!, body: String!): Story!
    deleteComment(storyId: ID!, commentId: ID!): Story!
    createScenarioComment(storyId: ID!, scenarioId: ID!, body: String!): TestScenario
    likeStory(storyId: ID!): Story! 
    createTestScenario(storyId: ID!, scenario: String!): Story!
    approveScenario(storyId: ID!, scenarioId: ID!): Story!
    disapproveScenario(storyId: ID!, scenarioId: ID!): Story!
    deleteScenario(storyId: ID!, scenarioId: ID!): Story!
}

`;