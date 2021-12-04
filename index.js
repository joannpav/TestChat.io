const { ApolloServer } = require('apollo-server');
// const {PubSub} = require('apollo-server');
// const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphQL/typeDefs');
const resolvers = require('./graphQL/resolvers');
// const Post = require('./models/Post');
const { MONGODB } = require('./config.js')

// const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) =>  ({ req })
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
.then(() => {
    return server.listen({ port: 5000 })
}).then(res => {
        console.log("mongodb connected");
        console.log(`Server running at ${res.url}`)
    })