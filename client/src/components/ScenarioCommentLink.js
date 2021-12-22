import React, { useState, useMutation } from 'react'
import { Modal, Button, Comment, Form, Header } from 'semantic-ui-react'
import gql from 'graphql-tag';
import ScenarioCommentGroup from '../components/ScenarioCommentGroup';

function ScenarioCommentLink({ user, storyId, scenarioId }) {
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = useState('');
    
    console.log(`in ScenarioCommentLink, what is scenarioId? ${JSON.stringify(scenarioId)}`);

    return (
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <Comment.Group className="comment-compact">
                <Comment >      
                <Comment.Content>        
                    <Comment.Actions>
                    <Comment.Action>Comment</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
                </Comment>
            </Comment.Group>
            }
        >
          <Modal.Header>Add a comment</Modal.Header>
          <Modal.Content>    

            <Modal.Description>                    
                    <ScenarioCommentGroup user={user} storyId={storyId} scenarioId={scenarioId.id}></ScenarioCommentGroup>
            </Modal.Description>
          </Modal.Content>
          {/* <Modal.Actions>
            <Button color='black' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              content="Save"
              labelPosition='right'
              icon='checkmark'
              onClick={() => setOpen(false)}
              positive
            />
          </Modal.Actions> */}
        </Modal>
      )
    }
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


export default ScenarioCommentLink