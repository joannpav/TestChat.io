const { AuthenticationError, UserInputError } = require('apollo-server-errors');
const Story = require('../../models/Story');
const Epic = require('../../models/Epic');
const checkAuth = require('../../util/check-auth');


module.exports = {    
    Query: {
        async getStories(_, { epicId }){
            console.log(`in getStories, epicId is ${epicId}`);
            try{
                const epic = await Epic.findById(epicId);
                    
                console.log(`in getStories, epic is ${epic}`);
                const stories = await Story.find({epic})
                    .populate('epic')
                    .sort({ createdAt: -1 });                                
                return stories;
            } catch(err) {
                throw new Error(err);
            }
        },
        async getStory(_, { storyId }){
            try{                
                const story = await Story.findById(storyId)
                    .populate('epic');                                
                if(story){
                    return story;
                } else {
                    throw new Error("Story not found");
                }
                
            } catch(err) {
                throw new Error(err);
            }
        }

    },
    Mutation: {
        async createStory(_, { epicId, body, acceptanceCriteria }, context) {            
            // TODO: Need to make epic mandatory
            const user = checkAuth(context);
            console.log(`in Mutation: createStory, is epic passed in? ${epicId}`);

            // const epic = await Epic.findOne({epicId});
            const epic = await Epic.findById(epicId);
            console.log(`was epic found ${epic}`);
            if (body.trim() === '') {
                throw new Error('Story body must not be empty');
            }

            const newStory = new Story({
                epic: epic, 
                body,
                acceptanceCriteria,
                user: user.id,
                username: user.username,                
                createdAt: new Date().toISOString(),
            });

            const story = await newStory.save();
            
            return story;
        },

        async deleteStory(_, { storyId }, context) {
            const user = checkAuth(context);            
            console.log(`attempting to delete story ${storyId}`);              
            try {
                const story = await Story.findById(storyId);
                console.log(`found story ${JSON.stringify(story)}`);
                
                if (user.username === story.username){
                    await story.delete();
                    return 'Story deleted successfully';
                } else {
                    throw new AuthenticationError("Operation not allowed");
                }
            } catch(err) {
                throw new Error(err);
            }           
        },
        async likeStory(_, { storyId }, context) {
            const { username } = checkAuth(context);                      
            const story = await Story.findById(storyId);
            
            if(story){
                if (story.likes.find(like => like.username === username )){
                    // story already liked, unlike ti
                    story.likes = story.likes.filter(like => like.username !== username)                        
                } else {
                    // not liked, so like it
                    await story.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }
                await story.save();
                return story;
            } else {
                throw new UserInputError("Story not found");
            }                            
        }
    },
 
};