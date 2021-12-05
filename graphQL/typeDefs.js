const { gql } = require('apollo-server');

module.exports = gql`

type Story {
    id: ID!
    body: String!
    createdAt: String!
    username: String! 
    testScenarios: [TestScenario]  
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
    testScenarioCount: Int!
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
}

type Like{
    id: ID!
    createdAt: String!
    username: String!
}
type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
}
input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
}
type Query {
    getUsers: [User]
    getStories: [Story]
    getStory(storyId: ID!): Story    
    getTestScenarios: [TestScenario]
}
type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createStory(body: String!): Story!
    deleteStory(storyId: ID!): String!
    createComment(storyId: ID!, body: String!): Story!
    deleteComment(storyId: ID!, commentId: ID!): Story!
    likeStory(storyId: ID!): Story! 
    createTestScenario(storyId: ID!, scenario: String!): Story!
}

`;