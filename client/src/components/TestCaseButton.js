import React from 'react';
import { Link } from 'react-router-dom';
import { Feed, Button, Icon, Label, Grid } from 'semantic-ui-react';


function TestCaseButton({count, user}) {        
    const testCaseButton = user ? (                
            <Icon color='teal' name='write square' />                    
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