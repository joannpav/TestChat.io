const { AuthenticationError, UserInputError } = require('apollo-server-errors');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {    
    Mutation: {
        async createTestScenario(_, { postId, scenario }, context) {
            const { username } = checkAuth(context);
            console.log(`in createTestScenario`);
            if (scenario.trim() === '') {
                throw new UserInputError('Empty test scenario not allowed', {
                    errors: {
                        body: 'Scenario must not be empty'
                    }
                })
            }
            const post = await Post.findById(postId);
            console.log(`found post: ${post.id}`);

            if(post) {
                post.testScenarios.unshift({
                    scenario,
                    username,
                    createdAt: new Date().toISOString()
                });
                await post.save()
                return post;
            } else {
                throw new UserInputError('Post not found');
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