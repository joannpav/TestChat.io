const { ApolloServer } = require('apollo-server');
const cors = require('cors')
const mongoose = require('mongoose');

const typeDefs = require('./graphQL/typeDefs');
const resolvers = require('./graphQL/resolvers');
const { MONGODB } = require('./config.js');

const JiraAPI = require('./api/JiraAPI');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: false
}


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

// server.applyMiddleware({
//     app,
//     cors: false
//   })
  

mongoose.connect(MONGODB, {
    useNewUrlParser: true,    
})
.then(() => {        
    return server.listen({ port: 5000 })
}).then(res => {
        console.log("mongodb connected");
        console.log(`Server running at ${res.url}`)
    })