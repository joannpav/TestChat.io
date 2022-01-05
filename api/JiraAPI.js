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
    const authToken = Buffer.from('support@testchat.io:CInMNSDGWnGRbmXIZBou5D64').toString('base64')
    if (!request.headers) {
      request.headers = {};
    }
    request.headers = {      
      Authorization: `Basic ${authToken}`,      
      "Content-Type": "application/json",      
    };    
    // console.log( request.headers )
    // console.log( request.body )
  }
  
  async getEpics({ projectKey }) {        
    const response = await this.get(`/search?jql=project%20%3D%20TES%26type%20%3DEpic`)
    console.log(response.issues);    
    return response.issues || []
  }
}

module.exports = JiraAPI
