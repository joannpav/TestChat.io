const { RESTDataSource } = require('apollo-datasource-rest')


//assuming we're in a dev environment, we're going to require secrets to keep 
//from pasting our API key in our code
if (process.env.NODE_ENV !== 'production') require('../secrets.js')

class JiraAPI extends RESTDataSource {
  constructor() {
    super()
    //this is the base url for our API call, if you had more than one async query 
    //below this base would be the point where the queries diverge

    this.baseURL = 'https://testchat.atlassian.net/rest/api/3'    
  }

  willSendRequest( request ) {
    console.log(`in willSendRequest`);
    const authToken = Buffer.from('support@testchat.io:CInMNSDGWnGRbmXIZBou5D64').toString('base64')
    if (!request.headers) {
      request.headers = {};
    }
    request.headers = {      
      Authorization: `Basic ${authToken}`,      
      "Content-Type": "application/json",      
    }; 
       
  }
  
  async getEpics({ projectKey }) {  
    console.log('in getEpics of JiraAPI');
    console.log(`yo! am i in here getEpics ??? `);       
    var jql = {'jql': 'project = "TES" AND type = "Epic" ORDER BY created DESC'}     
    const response = await this.get(`/search?`, {},
    {      
      params: jql,
    });
    return response.issues || []
  }

  async getStories({ projectKey, jiraKey }) {  
    console.log('in getStores of JiraAPI');
    console.log(`yo! am i in here??? ${jiraKey}`); 
    // TODO: paramaterize this, pass jql in body
    var jql = {'jql': `project = "TES" AND type = "Story" and "Epic Link"=${jiraKey} ORDER BY created DESC`};    
    console.log(`/search?jql=                    project%20%3D%20"TES"%20AND%26  type%20%3DStory"%20and%20"Epic%20Link"%3DTES-7%20ORDER%20BY%20created%20DESC`); 
    const response = await this.get(`/search?jql=project%20%3D%20TES%26type%20%3DStory%26"Epic%20Link"%3D"TES-7"`,
    // const response = await this.get(`/search?jql=project%20%3D%20${projectKey}%20and"Epic%20Link"%3D${jiraId}%20and%20type%20%3DStory`,    
    {      
      body: jql,
    });       
    
    return response.issues || []
  }
}

module.exports = JiraAPI
