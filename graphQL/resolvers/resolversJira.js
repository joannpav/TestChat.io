const Epic = require('../../models/Epic');

async function findEpic(summary) {
  let epic = await Epic.find({epicName: summary});
  console.log(`found epic? ${epic}`);
}

module.exports = {
  Query: {
    async getJiraEpics(_, { projectKey }, { dataSources }) {      
      let epic;
      let jiraEpics = await dataSources.jiraAPI.getEpics({ projectKey })
      // console.log(`what is jiraEpics ${jiraEpics}`);
      
      jiraEpics.map((item) => {
        findEpic(item.fields.summary);        
        console.log(`****** ${JSON.stringify(item.fields.summary)}`);
        // item.fields.summary
        // 	.filter((a) => a.summary == genre)
      })
      
      return jiraEpics;
    }
  }
    // Query: {
    //   getJiraEpics: (_, { projectKey }, { dataSources }) => {      
    //     dataSources.jiraAPI.getEpics({ projectKey })
    //   }
    // }
  }