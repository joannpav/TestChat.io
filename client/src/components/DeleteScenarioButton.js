import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import {FETCH_STORY_QUERY} from '../util/graphql';
import CustomPopup from '../util/CustomPopup';


function DeleteScenarioButton({ storyId, scenarioId, callback, handleCallback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const mutation = DELETE_SCENARIO_MUTATION;

    const {data: {getStory: story} = {}, error, loading } = useQuery(FETCH_STORY_QUERY, {
        variables: {
            storyId
        }
    });

    const { 
        id, 
        body, 
        acceptanceCriteria, 
        createdAt, 
        username, 
        testScenarios, 
        comments, 
        likes, 
        likeCount, 
        commentCount, 
        testScenarioCount
    } = story;

    const [deleteScenario] = useMutation(mutation, {
       update(proxy) {
            setConfirmOpen(false);            
            // const data = proxy.readQuery({
            //     query: FETCH_STORIES_QUERY
            // });
            data.getStories = data.getStories.filter((p) => p.id !== storyId);
            proxy.writeQuery({ query: FETCH_STORIES_QUERY, data });                
            if (handleCallback) handleCallback(data);
            
            // if (callback) callback();
            
       },
       variables: {
           storyId,
           commentId
       }
    });

    return(
        <>
            <CustomPopup content={commentId ? 'Delete comment' : 'Delete story'}>
                <Button 
                    as="div"
                    color="red"
                    floated="right"
                    onClick={() => setConfirmOpen(true)}
                >
                    <Icon name="trash" style={{ margin: 0 }} />
                </Button>
            </CustomPopup>
        
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deleteStoryOrComment}
            />
        </>
    );
}
    

const DELETE_STORY_MUTATION = gql`
    mutation deleteStory($storyId: ID!) {
        deleteStory(storyId: $storyId)                     
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($storyId: ID!, $commentId: ID!) {
        deleteComment(storyId: $storyId, commentId: $commentId) {
            id
            comments {
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`;
export default DeleteButton;