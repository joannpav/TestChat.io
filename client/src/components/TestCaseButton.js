import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';


function TestCaseButton({count, user}) {        
    const testCaseButton = user ? (     
        count > 0 ? (           
            <Icon color='teal' name='write square' />                    
        ) : (
            <Icon name='write square' />                    
        )
    ) : (        
            <Icon to="/login/" name='write square' />        
    )
    return (
        <Feed.Like>
            {testCaseButton} {count} {count === 1 ? "Scenario" : "Scenarios"}        
        </Feed.Like>        
    )
};


export default TestCaseButton;