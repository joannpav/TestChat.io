import React, {useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Form, Card } from 'semantic-ui-react';

const TestScenarioForm = (storyId) => {
    const[scenario, setScenario] = useState('');
    const [submitScenario] = useMutation(SUBMIT_TEST_SCENARIO_MUTATION, {
        update() {
            setScenario('');
        },
        variables: {
            storyId: storyId.storyId,
            scenario
        }
    })

    let scenarioFormMarkup = (
        <Card fluid>
            <Card.Content>
                <p>Build a test scenario</p>
                <Form>
                    <div className="ui action input fluid">
                        <input
                            type="text"
                            placeholder="Scenario..."
                            name="scenario"
                            value={scenario}
                            onChange={event => setScenario(event.target.value)}                            
                        />
                        <button type="submit"
                            className="ui button teal"
                            disabled={scenario.trim() === ''}
                            onClick={submitScenario}
                        >Submit</button>
                    </div>
                </Form>
            </Card.Content>
        </Card>
    );

    return scenarioFormMarkup;    
};

const SUBMIT_TEST_SCENARIO_MUTATION = gql`
    mutation($storyId: ID!, $scenario: String!) {
        createTestScenario(storyId: $storyId, scenario: $scenario) {
            testScenarios {
                scenario
                username
            }
        }
    }
`;

export default TestScenarioForm;