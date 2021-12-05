const { AuthenticationError, UserInputError } = require('apollo-server-errors');

const Story = require('../../models/Story');
const checkAuth = require('../../util/check-auth');

module.exports = {    
    Mutation: {
        async createTestScenario(_, { storyId, scenario }, context) {
            const { username } = checkAuth(context);
            console.log(`in createTestScenario`);
            if (scenario.trim() === '') {
                throw new UserInputError('Empty test scenario not allowed', {
                    errors: {
                        body: 'Scenario must not be empty'
                    }
                })
            }
            const story = await Story.findById(storyId);
            console.log(`found story: ${story.id}`);

            if(story) {
                story.testScenarios.unshift({
                    scenario,
                    username,
                    createdAt: new Date().toISOString()
                });
                await story.save()
                return story;
            } else {
                throw new UserInputError('Story not found');
            }
            // const newTestScenario = new TestScenario({
            //     scenario, 
            //     user: user.id,
            //     username: user.username, 
            //     createdAt: new Date().toISOString()
            // })
        }
    }
}