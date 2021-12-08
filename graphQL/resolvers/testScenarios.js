const { AuthenticationError, UserInputError } = require('apollo-server-errors');
const TestScenario = require('../../models/TestScenario');
const Story = require('../../models/Story');
const checkAuth = require('../../util/check-auth');

module.exports = {  
    Query: {
        async getTestScenarios(_, { storyId }){
            try{
                console.log(`in getTestScenario ${storyId}`);
                const story = await Story.findById(storyId);
                console.log(`in story ${JSON.stringify(story)}`);
                const testScenario = await testScenario.find(story.id);
                console.log(`in getTestScenario, testScenario ${testScenario}`);
                if(testScenario){
                    return story;
                } else {
                    throw new Error("testScenario not found");
                }
            }catch(err) {
                throw new Error(err);
            }
        }
    },  
    Mutation: {
        async createTestScenario(_, { storyId, scenario  }, context) {            
            const user = checkAuth(context);
            console.log(`the story in testScenarios is ${JSON.stringify(storyId)}`);
            
            if (scenario.trim() === '') {
                throw new Error('Scenario must not be empty');
            }
            console.log(`******** about to check storeis: ${JSON.stringify(storyId)}`);
            const story = await Story.findById(storyId);
            
            if(story) {
                console.log(`********creating scenario in story: ${JSON.stringify(story)}`);
           
                const newTestScenario = new TestScenario({
                    scenario,
                    user: user.id,
                    username: user.username,  
                    story: story,              
                    createdAt: new Date().toISOString()
                });
    
                const testScenario = await newTestScenario.save();
                
                return testScenario;
            } else {
                throw new Error("Story not found");
            }
            
        },
        // async createTestScenario(_, { storyId, scenario }, context) {
        //     const { username } = checkAuth(context);
        //     if (scenario.trim() === '') {
        //         throw new UserInputError('Empty test scenario not allowed', {
        //             errors: {
        //                 body: 'Scenario must not be empty'
        //             }
        //         })
        //     }
        //     const story = await Story.findById(storyId);

        //     if(story) {
        //         story.testScenarios.unshift({
        //             scenario,
        //             username,
        //             createdAt: new Date().toISOString()
        //         });
        //         await story.save()
        //         return story;
        //     } else {
        //         throw new UserInputError('Story not found');
        //     }            
        // },
        // async approveScenario(_, { storyId, scenarioId }, context) {
        //     console.log(`blah in here 2`);
        //     const { username } = checkAuth(context);                      
        //     const story = await Story.findById(storyId);
        //     console.log(`approving scenario `);
        //     if(story){
        //         if (story.testScenarios.find(scenario => scenario.id === scenarioId )){
        //             // scenario approved already, unapprove it
        //             console.log(`blah in here`);
        //             story.testScenarios = story.testScenarios.filter(scenario => scenario.username !== username)                        
        //         } else {
        //             // not liked, so like it
        //             console.log(`approving scenario - trying to push `);
        //             await story.testScenarios.approvals.push({
        //                 username,
        //                 createdAt: new Date().toISOString()
        //             })
        //         }
        //         await story.save();
        //         return story;
        //     } else {
        //         throw new UserInputError("Scenario not found");
        //     }                            
        // },
    }
}