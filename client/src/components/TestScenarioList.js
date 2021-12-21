import React, { useState, useEffect } from 'react';
import { Label, Icon, Message, Table, Header, Card} from 'semantic-ui-react';
import ApprovalButton from './ApprovalButton';
import DisapprovalButton from './DisapprovalButton';
import DeleteScenarioButton from './DeleteScenarioButton';
import ChatButton from '../components/ChatButton';
import moment from 'moment';

function TestScenarioList({testScenarios, storyId, user}) {         
    const [scenarios, setScenarios] = useState();   
    const handleCallback = (childData) => {         
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
                <Table.HeaderCell>Reactions</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
                <Table.HeaderCell>Manage</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
            
            {scenarios && scenarios.map(scenario => (
              <Table.Row key={scenario.id}>
                <Table.Cell  width="eight">                     
                      {scenario.scenario}     
                      <br />
                      <Label size="mini" color="purple">Functional</Label> 
                      <Label size="mini" color="orange">Auto</Label>                            
                                                                      
                </Table.Cell>                                                
                <Table.Cell negative={scenario.approvalCount === 0 } >
                  <ApprovalButton key="abc" story={storyId} user={user} testScenario={scenario}></ApprovalButton>&nbsp;
                  <DisapprovalButton key="def" story={storyId} user={user} testScenario={scenario}></DisapprovalButton>
                  <ChatButton key="ghi" story={storyId} user={user} testScenario={scenario}></ChatButton>
                </Table.Cell>
                <Table.Cell verticalAlign="middle">
                  <Card.Meta>
                    {scenario.username}<br /><i>{moment(scenario.createdAt).fromNow(true)}</i>
                  </Card.Meta>
                </Table.Cell>
                {user && user.username === scenario.username && (                     
                  <Table.Cell textAlign="center">
                    <DeleteScenarioButton storyId={storyId} scenarioId={scenario.id} handleCallback={handleCallback} />
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