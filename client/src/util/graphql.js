import gql from 'graphql-tag';

export const FETCH_STORIES_QUERY = gql`
{
    getStories {
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