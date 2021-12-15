import gql from 'graphql-tag';

export const FETCH_STORIES_QUERY = gql`
  query getStories {
    getStories {
        id
        epic
        body
        acceptanceCriteria
        createdAt
        username
        likeCount
        likes {
            username
        }
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
        }
        
        commentCount
        comments {
            id
            username
            createdAt
            body
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
                approvalCount
                # questionCount
                # viewerCount
                approvals {
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

// testScenarioCount
//         testScenarios {
//             id
//             scenario
//             createdAt
//             username
//             approvals{
//                 username
//                 createdAt
//             }
//             questions{
//                 username
//                 createdAt
//             }
//             viewers{
//                 username
//                 createdAt
//             }
//         }