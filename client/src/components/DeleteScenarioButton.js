import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Confirm, Icon } from 'semantic-ui-react';

import CustomPopup from '../util/CustomPopup';


function DeleteScenarioButton({ storyId, scenarioId, handleCallback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
   

    const [deleteScenario] = useMutation(DELETE_SCENARIO_MUTATION, {
       update(proxy) {
            setConfirmOpen(false);                                                        
       },
       variables: {
           storyId,
           scenarioId
       }
    });

    return(
        <>
            <CustomPopup content='Delete scenario'>                
                <Icon color="red" name="delete" link onClick={() => setConfirmOpen(true)}/>
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
                commentCount
                comments {
                    id
                    username
                    createdAt
                }
            }
        }                    
    }
`;


export default DeleteScenarioButton;