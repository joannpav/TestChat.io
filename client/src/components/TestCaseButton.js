import React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';

function TestCaseButton(testScenarioCount) {
    return (
        <>
        <Button as="div" labelPosition="right" onClick={console.log("build tc")}>
            <Button color='purple'basic>
                <Icon name='list' />                
            </Button>
            <Label basic color="purple" pointing="left">
                {testScenarioCount.count}
            </Label>
        </Button>
        </>
    )
}

export default TestCaseButton;