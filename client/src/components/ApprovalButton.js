import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


function ApprovalButton({user, story, testScenario: {id, approvalCount, approvals}}) {
    const [approved, setApproved] = useState(false);
    console.log(`approvals ${JSON.stringify(approvals)}`);
    console.log(`story ${JSON.stringify(story)}`);

    useEffect(() => {
        // if(user && approvals.find(approve => approve.username === user.username)){
        //     setApproved(true)

        // } else setApproved(false)
        console.log("in useeffect approving")
    }, [user, approvals]);

    const [approveScenario] = useMutation(APPROVE_SCENARIO_MUTATION, {
        variables: { 
            storyId: story,
            scenarioId: id}
    })
    

    const approvalButton = user ? (
        approved ? (
            <Button color='teal'>
                <Icon name='check' />
                Approve
            </Button>
        ) : (
        <Button color='teal' basic>
            <Icon name='check' />
            Approve
        </Button>
        )
    ) : (
        <Button as={Link} to="/login" color='teal' basic>
            <Icon name='check' />
            Approve
        </Button>
    )
    return (
        <Button as="div" labelPosition="right" onClick={approveScenario}>
            {approvalButton}
            <Label basic color="teal" pointing="left">
                {approvalCount}
            </Label>
        </Button>
    )
}

const APPROVE_SCENARIO_MUTATION = gql`
    mutation approveScenario($storyId: ID!, $scenarioId: ID!){
        approveScenario(storyId: $storyId, scenarioId: $scenarioId){
          username
          createdAt
        }
    }
`;

export default ApprovalButton;