import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Table} from 'semantic-ui-react';
import ApprovalButton from './ApprovalButton';

function TestCaseList({user, storyId}) {  
    
    const {                         
        data: {getTestScenarios: testScenarios} = {} 
    } = useQuery(FETCH_TEST_SCENARIOS_QUERY, {
        variables: {
            storyId
        }
    });

    let testMarkup = <p>Loading test scenarios...</p>        
    console.log(`TestCaseList: what is story id here: ${storyId}`);
    console.log(`scenarios: ${JSON.stringify(testScenarios)}`);
    
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
          
          {testScenarios && testScenarios.map(scenario => (
            <Table.Row key={scenario.id}>
              <Table.Cell>{scenario.scenario}</Table.Cell>
              <Table.Cell>{scenario.username}</Table.Cell>
              <Table.Cell negative><ApprovalButton story={storyId} user={user} testScenario={scenario}></ApprovalButton></Table.Cell>
            </Table.Row>       
          ))}     
          
          </Table.Body>
        </Table>

    )
    return testMarkup;
}

const FETCH_TEST_SCENARIOS_QUERY = gql`
    query($storyId: ID!) {
        getTestScenarios(storyId: $storyId){
            id 
            scenario
            createdAt
            username               
            # testScenarioCount
            # testScenarios {
            #     id
            #     scenario
            #     createdAt
            #     username
            #     approvalCount
            #     questionCount
            #     viewerCount
            #     approvals {
            #         username
            #     }
            #     questions {
            #         username
            #     }
            #     viewers {
            #         username
            #     }
            # }         
        }
    }
`;

export default TestCaseList;