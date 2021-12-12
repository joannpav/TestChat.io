import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';


function TestCaseButtonLarge({count, user}) {    
    console.log(`what about is here? ${JSON.stringify(count)}`);
    const testCaseButton = user ? (        
        <Button color='teal' basic>
            <Icon name='write square' />
            Scenarios
        </Button>        
    ) : (
        <Button as={Link} to="/login" color='teal' basic>
            <Icon name='write square' />
            Scenarios
        </Button>
    )
    return (
        <Button as="div" labelPosition="right">
            {testCaseButton}
            <Label basic color="teal" pointing="left">
                {count}
            </Label>
        </Button>
    )
};


export default TestCaseButtonLarge;