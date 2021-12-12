import gql from 'graphql-tag';

export const FETCH_STORIES_QUERY = gql`
{
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