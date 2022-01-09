const Epic = require('../../models/Epic');

async function findEpic(summary) {
  let epic = await Epic.find({epicName: summary});
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
  Query: {
    async getJiraEpics(_, { projectKey }, { dataSources }) {            
        let jiraEpics = await dataSources.jiraAPI.getEpics({ projectKey })
        return await jiraEpics;    
      }
    }
  }