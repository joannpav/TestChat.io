import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks'
import { Button, Card, Comment, Form, Header } from 'semantic-ui-react';
import moment from 'moment';
import DeleteButton from './DeleteButton';

const ScenarioCommentGroup = ({user, storyId, scenarioId}) => {   
    const[comment, setComment] = useState('');
    const [submitComment] = useMutation(SUBMIT_SCENARIO_COMMENT_MUTATION, {
        update() {
            setComment('');
        },
        variables: {
            storyId,
            scenarioId,
            body: comment
        }
    });
    console.log(`what is user???? ${JSON.stringify(user)}`);
    let commentGroupMarkup = (
        <Comment.Group>
            <Header as='h3' dividing>
            Comments
            </Header>
                {user && (
                    <Card fluid>
                        <Card.Content>
                            <p>Story a comment</p>
                            <Form>
                            <div className="ui action input fluid">
                                <input
                                type="text"
                                placeholder="Comment.."
                                name="comment"
                                value={comment}
                                onChange={event => setComment(event.target.value)}
                                />
                                <button type="submit"
                                className="ui button teal"
                                disabled={comment.trim() === ''}
                                onClick={submitComment}
                                >Submit</button>
                                </div> 
                            </Form>
                        </Card.Content>
                    </Card>
                )}
               

            
        </Comment.Group>
    );
    return commentGroupMarkup;
};

// const SUBMIT_COMMENT_MUTATION = gql`
//     mutation($storyId: ID!, $body: String!){
//         createComment(storyId: $storyId, body: $body){
//             id
//             comments {
//                 id
//                 body
//                 username
//                 createdAt
//             }
//             commentCount
//         }
//     }
// `;
const SUBMIT_SCENARIO_COMMENT_MUTATION = gql`
   mutation CreateScenarioComment($scenarioId: ID!, $body: String!, $storyId: ID!) {
        createScenarioComment(scenarioId: $scenarioId, body: $body, storyId: $storyId) {
            comments {
                id
                createdAt
                username
                body
                }
            commentCount
        }
    }
`;
export default ScenarioCommentGroup