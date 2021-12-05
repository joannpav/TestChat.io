import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
{
    getStories {
        id
        body
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
            createdAt
            username
        }
    }
}`;