import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Confirm, Icon } from 'semantic-ui-react';

import { FETCH_EPICS_QUERY } from '../util/graphql';
import CustomPopup from '../util/CustomPopup';


function DeleteEpicButton({ epicId, orgName, handleCallback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);    
    console.log(`attemting to delete epic id ${epicId}`);
    const [deleteEpic] = useMutation(DELETE_EPIC_MUTATION, {
       update(proxy) {
            setConfirmOpen(false);            
            const data = proxy.readQuery({
                query: FETCH_EPICS_QUERY,
                variables: {
                    orgName
                }
            });
            // data.getStories = data.getStories.filter((p) => p.id !== storyId);
            data.getEpics = data.getEpics.filter((p) => p.id !== epicId);
            proxy.writeQuery({ 
                query: FETCH_EPICS_QUERY, 
                variables: orgName,
                data 
            });                
            if (handleCallback) handleCallback(data);
            
       },
       variables: {
            epicId           
       },
       onError: (err) => {
        console.log(`Error deleting epic. ${err}`);        
    } 
    });

    return(
        <>
            <CustomPopup content={'Delete epic?'}>              
                
                    <Icon  
                        data-cy="deleteButton"                       
                        className="trash-button"
                        onClick={() => setConfirmOpen(true)} 
                        color="red" 
                        name="trash" style={{ margin: 0 }} 
                    />
                
                {/* </Button> */}
            </CustomPopup>
        
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deleteEpic}
            />
        </>
    );
}
    

const DELETE_EPIC_MUTATION = gql`
    mutation deleteEpic($epicId: ID!) {
        deleteEpic(epicId: $epicId)                     
    }
`;

export default DeleteEpicButton;