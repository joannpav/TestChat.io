const { AuthenticationError, UserInputError } = require('apollo-server-errors');
const Epic = require('../../models/Epic');
const User = require('../../models/User');
const Organization = require('../../models/Organization');
const checkAuth = require('../../util/check-auth');
const Story = require('../../models/Story');

module.exports = {
    StoryCountInEpic: {
        async getStoryCountByEpic(parent, { }, context) {            
            const storyCount = await Story.find({epicName: parent.epicName});             
            return storyCount.length;    
        }
    },
    Query: {
        async getEpics() {
            try { 
                const epics = await Epic.find()
                    .populate('users')
                    .populate('organization')                    
                    .sort({ createdAt: -1 });                
                return epics;
            } catch (err) {
                throw new Error(err);
            }
        },        
    },
    // Mutation: {
    //     async createEpic(_, { epicName, description  }, context) {   
    //         console.log("are we here yet?"); 
    //         const newEpic = new Epic({
    //             epicName,
    //             description
    //         })
    //         theEpic = await newEpic.save();
    //         console.log(`the epic is ${JSON.stringify(theEpic)}`);
            
    //     },        
    // }
    Mutation: {
        async createEpic(_, { epicName, description }, context) {  
            console.log("why are we not making it to createEpic mutation?");          
            const user = checkAuth(context);
            console.log(`in createEpic, user: ${JSON.stringify(user)}`);
            const userFull = await User.findOne(user);
            console.log(`in createEpic, userFull: ${JSON.stringify(userFull)}`);
            if (epicName.trim() === '') {
                throw new Error('Epic name must not be empty');
            }
                
            const userOrg = await Organization.findOne(user);
            const newEpic = new Epic({
                epicName, 
                description,                    
                createdAt: new Date().toISOString(),                
                username: userFull.username,    
                organization: userOrg,
                users: [userFull]
            });
            

            const epic = await newEpic.save();
            return epic;
        },
    }
};

                