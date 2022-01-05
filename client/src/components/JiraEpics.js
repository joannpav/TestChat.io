import React, { useState, useContext } from "react";
import { Segment, Container, Grid, List, Checkbox, Message } from 'semantic-ui-react';
import { AuthContext } from "../context/auth";
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router';

const GET_EPICS = gql`
  query GetEpics($projectKey: String!) {
    jira(projectKey: $projectKey) {
      id
      key
      total
      url    
      fields {
        summary
        description
      }    
    }
  }
`;


function JiraEpics() {    
    const [projectKey, setProjectKey] = useState("TES")    
    const { user } = useContext(AuthContext);
    const { data, loading, error } = useQuery(GET_EPICS, {
        variables: { projectKey }
    })    
    
    let navigate = useNavigate();
    
    if (!user) { navigate("/login")}
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    return (      
        <Grid >
            <Grid.Row className="page-title">
                <h1 className="epic-form">Import Epics</h1>                
                
            </Grid.Row>        
            <Grid.Row className="epic-form" columns={3}>
                <Grid.Column></Grid.Column>
                <Grid.Column>
                    <Message className="centered-message">        
                        Select one or more epics to import 
                    </Message>
                    <List>              
                        {
                        Object.values(data.jira).map((key, index) => ( 
                        <List.Item className="epic-form" key={index}>
                            <Checkbox className="epic-form-list" label={<label className="epic-form">{key.fields.summary}</label>} />
                            </List.Item> 
                        ))
                        }
                    </List>
                </Grid.Column>    
                <Grid.Column></Grid.Column>
            </Grid.Row>            
            <Grid.Row></Grid.Row>
        </Grid>
        
    );
}

export default JiraEpics;
