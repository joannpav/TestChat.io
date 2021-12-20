import React, { useState, useEffect } from 'react';
import { Icon, Feed, Popup, Image } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import moment from 'moment';


function DisapprovalButton({user, story, testScenario: {id, approvalCount, approvals}}) {
    const [approved, setApproved] = useState(false);
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        if (approvals) {            
            if(user && approvals.find(approve => approve.username === user.username)){
                setApproved(true)
            } else setApproved(false)
        }
        
        return () => setApproved(false);
    }, [user, approvals]);

    const [approveScenario] = useMutation(APPROVE_SCENARIO_MUTATION, {
        variables: { 
            storyId: story,
            scenarioId: id},
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
            console.log(errors);
        }
    })
    
    const disapprovalButton = user ? (            
        <Feed.Like onClick={approveScenario} color={approved ? "teal" : "grey"}>
            <Popup
                content={approvals.map((approval) => (
                    <>                        
                    <p><Image size="mini" src="https://react.semantic-ui.com/images/avatar/small/molly.png"  avatar />{approval.username}</p>
                    </>
                     ))}
                trigger={<Icon size="small" circular inverted  name="thumbs down" color={approved ? "teal" : "grey"} />}               
            />
            <span style={{color:approved ? "teal" : "grey" }}>{approvalCount}  </span>                                  
        </Feed.Like>
    
    ) : (
        <Feed.Like><Icon name='thumbs down' color="grey" to="/login"/> {approvalCount } {approvalCount === 1 ? "Approval  " : "Approvals  "}</Feed.Like>
    )


    return (
        <Feed.Like>
            {disapprovalButton} 
        </Feed.Like> 
             
           
       
    )
}

const APPROVE_SCENARIO_MUTATION = gql`
    mutation approveScenario($storyId: ID!, $scenarioId: ID!){
        approveScenario(storyId: $storyId, scenarioId: $scenarioId){
            id
            testScenarios{
                id
                approvals {
                    id
                    username
                    createdAt
                }
                approvalCount
            }
          
        }
    }
  
`;

export default DisapprovalButton;