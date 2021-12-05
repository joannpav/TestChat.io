import React from 'react';
import { Table} from 'semantic-ui-react';

function TestCaseList(testScenarios, user, postId) {    
    let testMarkup = <p>Loading test scenarios...</p>
    let ts = testScenarios["testScenarios"];
    console.log("in here");
    console.log(JSON.stringify(testScenarios));
    
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
          
          {ts.map(scenario => (
            <Table.Row key={scenario.id}>
              <Table.Cell>{scenario.scenario}</Table.Cell>
              <Table.Cell>{scenario.username}</Table.Cell>
              <Table.Cell negative>Stuff</Table.Cell>
            </Table.Row>       
          ))}     
          
          </Table.Body>
        </Table>

    )
    return testMarkup;
}

export default TestCaseList;