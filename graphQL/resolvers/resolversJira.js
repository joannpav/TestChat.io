const Epic = require('../../models/Epic');
const Story = require('../../models/Story');
const mongoose = require('mongoose');


async function findEpic(summary) {
  let epic = await Epic.find({epicName: summary});
  if (epic.length > 0) {
    return true;
  } else {
    return false;
  }
}

async function findJiraKeyByEpicId(epicId) {
  let epic = await Epic.find({_id:mongoose.Types.ObjectId(epicId)});
  
  console.log(`what is in epic ${JSON.stringify(epic[0])}`);
  return epic[0]?.jiraKey ? epic[0]?.jiraKey : undefined
}

async function findStory(summary, jiraId) {
  // Should prob filter on storyName and epicId
  let epic = await Story.find({storyName: summary, jiraId: jiraId});
  if (epic.length > 0) {
    return true;
  } else {
    return false;
  }
}


module.exports = {
  HasEpicBeenImported: {
    async hasEpicBeenImported(parent, { }, context) {
      const addedToOrg = await findEpic(parent.fields.summary);
      return addedToOrg;
    }
  },
  HasStoryBeenImported: {
    async hasStoryBeenImported(parent, { }, context) {
      console.log(`in HasStoryBeenImported, what is in parent ${JSON.stringify(parent)}`)
      const addedToOrg = await findStory(parent.fields.summary, "TES-17");
      return addedToOrg;
    }
  },
  Query: {
    async getJiraEpics(_, { projectKey }, { dataSources }) {  
        console.log(`heeey now am I in getJiraEpics?`);       
        let jiraEpics = await dataSources.jiraAPI.getEpics({ projectKey })
        return await jiraEpics;    
    },
    async getJiraStories(_, { projectKey, epicId }, { dataSources }) {
      // console.log(`heeey now am I in getJiraStories? ${jiraId}`);
      // console.log(`what is in parent? ${parent}`)
      const jiraKey = await findJiraKeyByEpicId(epicId);
      // console.log(`getJiraStories: what is in epic ${JSON.stringify(epic)}`);
      // const jiraKey = epic.jiraKey; 
      console.log(`getJiraStories: what was in jiraKey? ${jiraKey}`);
      // const epicKey = epic.key;
      let jiraStories = await dataSources.jiraAPI.getStories({ projectKey, jiraKey });
      return await jiraStories;
    }
  }
}