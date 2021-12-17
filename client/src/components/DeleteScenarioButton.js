import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import {FETCH_STORY_QUERY} from '../util/graphql';
import CustomPopup from '../util/CustomPopup';


function DeleteScenarioButton({ storyId, scenarioId, handleCallback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    // const {data: {getStory: story} = {}, error, loading } = useQuery(FETCH_STORY_QUERY, {
    //     variables: {
    //         storyId
    //     }
    // });

    // const { 
    //     id, 
    //     body, 
    //     acceptanceCriteria, 
    //     createdAt, 
    //     username, 
    //     testScenarios, 
    //     comments, 
    //     likes, 
    //     likeCount, 
    //     commentCount, 
    //     testScenarioCount
    // } = story;

    const [deleteScenario] = useMutation(DELETE_SCENARIO_MUTATION, {
       update(proxy) {
            setConfirmOpen(false);                                    
            // if (handleCallback) handleCallback();            
       },
       variables: {
           storyId,
           scenarioId
       }
    });

    return(
        <>
            <CustomPopup content='Delete scenario'>
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
                onConfirm={deleteScenario}
            />
        </>
    );
}
    

const DELETE_SCENARIO_MUTATION = gql`
    mutation deleteScenario($storyId: ID!, $scenarioId: ID!) {
        deleteScenario(storyId: $storyId, scenarioId: $scenarioId) {
            id
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
        }                    
    }
`;


export default DeleteScenarioButton;