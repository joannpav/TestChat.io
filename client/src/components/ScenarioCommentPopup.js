import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks'
import { Card, Comment, Form } from 'semantic-ui-react';

const ScenarioCommentPopup = ({user, storyId, scenarioId, handleCallback}) => {   
    const[comment, setComment] = useState('');
    const [submitComment] = useMutation(SUBMIT_SCENARIO_COMMENT_MUTATION, {
        update() {
            setComment('');
            if (handleCallback) handleCallback(comment);
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
                {user && (
                    <Card fluid>
                        <Card.Content>
                            
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
export default ScenarioCommentPopup