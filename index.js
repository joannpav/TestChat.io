const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphQL/typeDefs');
const resolvers = require('./graphQL/resolvers');
const { MONGODB } = require('./config.js')


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