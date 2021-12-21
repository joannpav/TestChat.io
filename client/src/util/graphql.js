import gql from 'graphql-tag';

export const FETCH_EPICS_QUERY = gql`
    query getEpics {
        getEpics {
            id
            epicName
            createdAt
            description
            organization {                
                orgName
            }
            users {
                username
            }
            storyCount
        }
    }
`;

export const FETCH_STORIES_QUERY = gql`
  query getStories($epicName: String) {
    getStories (epicName: $epicName) {
        id
        epicName
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

