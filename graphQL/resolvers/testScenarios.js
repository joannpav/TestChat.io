const Story = require('../../models/Story');
const checkAuth = require('../../util/check-auth');

module.exports = {     
    Mutation: {
        async createTestScenario(_, { storyId, scenario  }, context) {            
            const {username} = checkAuth(context);            
            
            if (scenario.trim() === '') {
                throw new Error('Scenario must not be empty');
            }
            
            const story = await Story.findById(storyId);

            if(story) {
                story.testScenarios.unshift({
                        scenario,
                        username,
                        createdAt: new Date().toISOString()
                });
                await story.save();                                                     
                return story;
            } else {
                throw new Error("Story not found");
            }            
        },
        async approveScenario(_, { storyId, scenarioId }, context) {
            const {username} = checkAuth(context);                                    
            const story = await Story.findById(storyId);
            const scenario = story.testScenarios.find(scenario => scenario.id === scenarioId);
            console.log(JSON.stringify(scenario));
            if(story) {
                // unapprove if approved
                if(scenario.approvals.find(approval => approval.username === username)) {
                    scenario.approvals = scenario.approvals.filter(approval => approval.username !== username)
                } else {
                    // approve
                    await scenario.approvals.push({
                        username,
                        createdAt: new Date().toISOString()
                    });
                }
                
                await story.save();
                return story;
            } else {
                throw new Error("Story not found");
            }
        } 
       
    }
}