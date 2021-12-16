import React, { useState, useEffect } from 'react';
import { Message, Table} from 'semantic-ui-react';
import ApprovalButton from './ApprovalButton';
import DeleteButton from './DeleteButton';

function TestScenarioList({testScenarios, storyId, user}) {  
    
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
       setScenarios(testScenarios)
    }, [testScenarios, storyId, user]);

    let testMarkup = <p>Loading test scenarios...</p>            
    
    if (scenarios && scenarios.length === 0) {
      testMarkup = (
        <Message info>
            <Message.Header>No test scenarios yet</Message.Header>
            <p>Why don't you create one?</p>
        </Message>   
      )
    } else {
      testMarkup = (            
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Scenario</Table.HeaderCell>
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>Feedback</Table.HeaderCell>
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

      )}
    return testMarkup;
}


export default TestScenarioList;