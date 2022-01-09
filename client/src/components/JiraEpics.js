import React, { useState, useContext, useEffect } from "react";
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
    const [epicList, setEpicList] = useState([]);
    const [epicNameVal, setEpicNameVal] = useState("");
    const [projectKey, setProjectKey] = useState("TES")    
    const { user } = useContext(AuthContext);
    const { data, loading, error } = useQuery(GET_JIRA_EPICS, {
        variables: { projectKey },
        errorPolicy: "all",
        fetchPolicy: "cache-first"
    });  
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
        
    // useEffect(() => {
    //     // TODO: This isn't working right, the update seems to be delated, so the first checked item
    //     // isn't added to the list until the second item is checked and so on
    //     // so the epicList is always one short
    //     setEpicList([...epicList, epicNameVal]);
    // }, [epicNameVal])

    // function handleOnChange(epicNameVal) {                
    //     console.log(`what epic name ${epicNameVal}`);
    //     setEpicNameVal(epicNameVal);
        
    //     console.log(`what epics in list ${epicList}`);
        
    //     // next submit epics list to Graphql
    // }

    function createEpicCallback() {        
        createEpic();                   
    }  
    
    let navigate = useNavigate();
    
    if (!user) { navigate("/login")}
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    // Maybe should get a list of epics and if any with JiraId key match
    // Then mark them as disabled
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
                            Object.values(data?.getJiraEpics).map((key, index) => ( 
                            <List.Item className="epic-form" key={index}>
                                <Checkbox 
                                    className="epic-form-list" 
                                    label={<label className="epic-form">{key.fields.summary}</label>} 
                                    name="epicName"                                    
                                    onChange={() => {
                                        createEpic({
                                            variables: {
                                                epicName: key.fields.summary,
                                                jiraId: key.key
                                            }
                                        })
                                    }}
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
    getJiraEpics(projectKey: $projectKey) {
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
    mutation createEpic($epicName: String!, $description: String, $jiraId: String) {
        createEpic(epicName: $epicName, description: $description, jiraId: $jiraId) {
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
