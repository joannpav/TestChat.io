module.exports = {
    Query: {
      jira: (_, { projectKey }, { dataSources }) => dataSources.jiraAPI.getEpics({ projectKey })
    }
  }