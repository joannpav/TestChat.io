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

