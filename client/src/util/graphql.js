import gql from 'graphql-tag';

export const FETCH_EPICS_QUERY = gql`
    # query getEpics ($offset: Int, $limit: Int, $orgName: String!) {        
    #     getEpics(offset: $offset, limit: $limit, orgName: $orgName) {
    query getEpics ($orgName: String!) {        
        getEpics(orgName: $orgName) {
            id
            epicName
            createdAt
            owner {
                id
                username
            }
            description
            organization { 
                id               
                orgName
            }
            users {
                id
                username
            }
            storyCount
            scenarioCount
        }
    }
`;

export const FETCH_EPIC_QUERY = gql`
    query getEpic($epicName: String!) {
        getEpic(epicName: $epicName) {
            id
            epicName
            createdAt
            owner {
                id
                username
            }
        }
    } 
`;

export const FETCH_STORIES_QUERY = gql`
  query getStories($epicId: ID!) {
    getStories (epicId: $epicId) {
        id
        epic {
            id
            epicName
            createdAt
        }
        body
        acceptanceCriteria
        username
        createdAt                
        testScenarioCount
        testScenarios {
            id
            scenario
            username  
            createdAt                                  
            approvalCount
            approvals {
                id
                username
                createdAt
            }
            disapprovalCount
            disapprovals {
                id
                username
                createdAt
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }        
        commentCount
        comments {
            id
            username
            createdAt
            body
        }
        likeCount
        likes {
            username
        }
    }
  
  }`;

    
export const FETCH_STORY_QUERY = gql`
    query($storyId: ID!) {
        getStory(storyId: $storyId){
            id 
            body
            epic {
                id
                epicName
            }
            acceptanceCriteria
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }   
            testScenarioCount
            testScenarios {
                id
                scenario                
                username
                createdAt
                approvalCount
                # questionCount
                # viewerCount
                approvals {
                    id
                    username
                    createdAt
                }
                disapprovalCount
                disapprovals {
                    id
                    username
                    createdAt
                }
                commentCount
                comments {
                    id
                    username
                    createdAt
                    body
                }
            #     questions {
            #         username
            #     }
            #     viewers {
            #         username
            #     }
            }         
        }
    }
`;

export const CREATE_EPIC_MUTATION = gql`
    mutation createEpic($epicName: String!, $description: String) {
        createEpic(epicName: $epicName, description: $description) {
            id    
            epicName
            owner {
                id
                username
            }
            users {
                id
                username
            }
            organization {
                id
                orgName
            }
            description
            createdAt        
            storyCount
            scenarioCount
        }
    }
`;

export const GET_JIRA_EPICS = gql`
query GetEpics($projectKey: String!) {
  getJiraEpics(projectKey: $projectKey) {
    id
    key
    total
    url    
    epicImported
    fields {
      summary
      description
    }    
  }
}
`;

