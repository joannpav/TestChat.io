const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphQL/typeDefs');
const resolvers = require('./graphQL/resolvers');
const { MONGODB } = require('./config.js');

const JiraAPI = require('./api/JiraAPI');

const server = new ApolloServer({
    dataSources: () => ({
        jiraAPI: new JiraAPI()
    }),
    context: ({ req }) =>  ({ req }),        
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,    
});

mongoose.connect(MONGODB, {
    useNewUrlParser: true,    
})
.then(() => {    
    return server.listen({ port: 5000 })
}).then(res => {
        console.log("mongodb connected");
        console.log(`Server running at ${res.url}`)
    })