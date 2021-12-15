import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Table} from 'semantic-ui-react';
import ApprovalButton from './ApprovalButton';
import DeleteButton from './DeleteButton';

function TestCaseList({testScenarios, storyId, user}) {  
    
    // const {                         
    //     data: {getTestScenarios: testScenarios} = {} 
    // } = useQuery(FETCH_TEST_SCENARIOS_QUERY, {
    //     variables: {
    //         storyId
    //     }
    // });
    const [scenarios, setScenarios] = useState();
   
    const handleCallback = (childData) => { 
        // console.log(`'handleCallback triggered ${JSON.stringify(childData)}`);       
        setScenarios({data: childData})        
    }

    useEffect(() => {
       console.log(`yo ${{testScenarios}}`);
       setScenarios(testScenarios)
    }, [testScenarios, storyId, user]);

    let testMarkup = <p>Loading test scenarios...</p>        
    console.log(`TestCaseList: what is story id here: ${storyId}`);
    console.log(`scenarios: ${JSON.stringify(scenarios)}`);
    
    testMarkup = (            
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Scenario</Table.HeaderCell>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
          
          {scenarios && scenarios.map(scenario => (
            <Table.Row key={scenario.id}>
              <Table.Cell>{scenario.scenario}</Table.Cell>
              <Table.Cell>{scenario.username}</Table.Cell>
              <Table.Cell negative><ApprovalButton key={scenario.id} story={storyId} user={user} testScenario={scenario}></ApprovalButton></Table.Cell>
              {user && user.username === scenario.username && (
                    <Table.Cell negative>
                        <DeleteButton storyId={storyId} scenarioId={scenario.id} handleCallback={handleCallback} />
                    </Table.Cell>
                )}
            </Table.Row>       
          ))}     
          
          </Table.Body>
        </Table>

    )
    return testMarkup;
}

// const FETCH_TEST_SCENARIOS_QUERY = gql`
//     query($storyId: ID!) {
//         getTestScenarios(storyId: $storyId){
//             id 
//             scenario
//             createdAt
//             username               
//             # testScenarioCount
//             # testScenarios {
//             #     id
//             #     scenario
//             #     createdAt
//             #     username
//             #     approvalCount
//             #     questionCount
//             #     viewerCount
//             #     approvals {
//             #         username
//             #     }
//             #     questions {
//             #         username
//             #     }
//             #     viewers {
//             #         username
//             #     }
//             # }         
//         }
//     }
// `;

export default TestCaseList;