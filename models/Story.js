const { model, Schema } = require('mongoose');

const storySchema = new Schema({
   body: String,
   username: String,
   createdAt: String,
   testScenarios: [
       {
           scenario: String,
           username: String,
           createdAt: String
       }
   ],
   comments: [
       {
           body: String,
           username: String,
           createdAt: String
       }
   ],
   likes: [
       {
           username: String,
           createdAt: String
       }
   ],
   user: {
       type: Schema.Types.ObjectId,
       ref: 'users'
   }
});

module.exports = model('Story', storySchema);