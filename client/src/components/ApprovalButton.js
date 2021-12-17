import React, { useState, useEffect } from 'react';
import { Icon, Feed, Popup, Image } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import moment from 'moment';


function ApprovalButton({user, story, testScenario: {id, approvalCount, approvals}}) {
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
    
    const approvalButton = user ? (
        approved ? (
            
            <Feed.Like onClick={approveScenario}>
                <Icon name='check' color='teal' /> Approved by &nbsp;   
                {approvals.map((approval) => (
                    <Popup
                        content={moment(approval.createdAt).fromNow()}
                        key={approval.username}
                        header={approval.username}
                        trigger={<Image size="tiny" src="https://react.semantic-ui.com/images/avatar/small/molly.png"  avatar />}
                    />
                ))}
                   
            </Feed.Like>
        ) : (
            <Feed.Like onClick={approveScenario}>
                <Icon name='check' color="grey" /> {approvalCount } {approvalCount === 1 ? "Approval  " : "Approvals  "}
                {approvals.map((approval) => (
                    <Popup
                        content={moment(approval.createdAt).fromNow()}
                        key={approval.username}
                        header={approval.username}
                        trigger={<Image size="tiny" src="https://react.semantic-ui.com/images/avatar/small/molly.png"  avatar />}
                    />
                ))}
            </Feed.Like>
        )
    ) : (
        <Feed.Like><Icon name='check' color="grey" to="/login"/> {approvalCount } {approvalCount === 1 ? "Approval  " : "Approvals  "}</Feed.Like>
    )


    // const approvalButton = user ? (
    //     approved ? (
    //         <Button color='teal'>
    //             <Icon name='flag checkered' />
    //             Approve
    //         </Button>
    //     ) : (
    //     <Button color='teal' basic>
    //         <Icon name='flag checkered' />
    //         Approve
    //     </Button>
    //     )
    // ) : (
    //     <Button as={Link} to="/login" color='teal' basic>
    //         <Icon name='flag checkered' />
    //         Approve
    //     </Button>
    // )
    return (
        <Feed.Like>
            {approvalButton} 
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

export default ApprovalButton;