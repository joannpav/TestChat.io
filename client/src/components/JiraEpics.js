import React, { useState, useContext } from "react";
import { Form, Button, Grid, List, Checkbox, Message } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from "../context/auth";
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useParams } from "react-router-dom";
import { FETCH_EPICS_QUERY } from '../util/graphql';


function JiraEpics() {   
    const { orgName } = useParams(); 
    const [projectKey, setProjectKey] = useState("TES")    
    const { user } = useContext(AuthContext);
    const { data, loading, error } = useQuery(GET_JIRA_EPICS, {
        variables: { projectKey }
    })  
    const { values, onChange, onSubmit } = useForm(createEpicCallback, {        
        epicName: '',
        description: '',                
    });    

    const [createEpic] = useMutation(CREATE_EPIC_MUTATION, {
        variables: values,
        refetchQueries:[
            {query: FETCH_EPICS_QUERY,
             variables: { orgName }}
        ],
        awaitRefetchQueries: true,
        onError: (err) => {
            console.log(`Error ${err}`);
        },        
    });
        

    function createEpicCallback() {        
        createEpic();                   
    }  
    
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
                        <Form onSubmit={onSubmit}>
                            {
                            Object.values(data.jira).map((key, index) => ( 
                            <List.Item className="epic-form" key={index}>
                                <Checkbox 
                                    className="epic-form-list" 
                                    label={<label className="epic-form">{key.fields.summary}</label>} 
                                    name="epicName"                                    
                                    onChange={onChange}
                                    value={key.fields.summary}
                                />
                                </List.Item> 
                            ))
                            }
                            <Button type="submit" color="teal" data-cy = "submit">
                                Import
                            </Button>
                        </Form>
                    </List>
                    
                </Grid.Column>    
                <Grid.Column></Grid.Column>
            </Grid.Row>            
            <Grid.Row></Grid.Row>
        </Grid>
        
    );
}

const GET_JIRA_EPICS = gql`
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



const CREATE_EPIC_MUTATION = gql`
    mutation createEpic($epicName: String!, $description: String) {
        createEpic(epicName: $epicName, description: $description) {
            id    
            epicName
            owner {
                id
                username
            }
            users {
                id
                username
            }
            organization {
                id
                orgName
            }
            description
            createdAt        
            storyCount
            scenarioCount
        }
    }
`;

export default JiraEpics;
