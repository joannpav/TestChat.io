const { gql } = require('apollo-server');

module.exports = gql`

type Post {
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
    getPosts: [Post]
    getPost(postId: ID!): Post    
    getTestScenarios: [TestScenario]
}
type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post! 
    createTestScenario(postId: ID!, scenario: String!): Post!
}
# type Subscription {
#     newPost: Post!
# }
`;