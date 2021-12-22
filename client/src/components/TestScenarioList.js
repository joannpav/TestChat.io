import React, { useState, useEffect } from 'react';
import { Comment, Label, Icon, Message, Table, Header, Card} from 'semantic-ui-react';
import ApprovalButton from './ApprovalButton';
import DisapprovalButton from './DisapprovalButton';
import DeleteScenarioButton from './DeleteScenarioButton';
import ChatButton from '../components/ChatButton';
import ScenarioCommentLink from '../components/ScenarioCommentLink';
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
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
            
            {scenarios && scenarios.map(scenario => (
              <Table.Row key={scenario.id}>
                <Table.Cell  width="nine">                     
                      {scenario.scenario}     
                      <br />
                      <Label size="mini" color="purple">Functional</Label> 
                      <Label size="mini" color="orange">Auto</Label>                            
                                                                      
                </Table.Cell>                                                
                <Table.Cell negative={scenario.approvalCount === 0 } textAlign="center">
                  <ApprovalButton key="abc" story={storyId} user={user} testScenario={scenario}></ApprovalButton>&nbsp;
                  <DisapprovalButton key="def" story={storyId} user={user} testScenario={scenario}></DisapprovalButton>&nbsp;
                  <ChatButton key={storyId} story={storyId} user={user} testScenario={scenario}></ChatButton>&nbsp;
                </Table.Cell>
                <Table.Cell verticalAlign="middle">
                  <Card.Meta>
                    {scenario.username}<br /><i><span style={{fontSize:"xx-small"}}>{moment(scenario.createdAt).fromNow()}</span></i>
                  </Card.Meta>
                </Table.Cell>
                {user && user.username === scenario.username && (                     
                  <Table.Cell textAlign="center">
                    <ScenarioCommentLink user={user} storyId={storyId} scenarioId={scenario.id}/>                    
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