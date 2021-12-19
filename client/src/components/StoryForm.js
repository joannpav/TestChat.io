import React from 'react';
import {Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useNavigate } from 'react-router';
import { useForm } from '../util/hooks';
import { FETCH_STORIES_QUERY } from '../util/graphql';

function StoryForm({ epicName, handleCallback }) {
    console.log(`In StoryForm, epic is ${epicName}`);

    const { values, onChange, onSubmit } = useForm(createStoryCallback, {  
        epicName,      
        body: '',
        acceptanceCriteria: ''
    });

    let navigate = useNavigate();
    
    const [createStory, { error }] = useMutation(CREATE_STORY_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_STORIES_QUERY,
                variables: {
                    epicName
                }
            });    
            console.log(`what is in this result? ${JSON.stringify(result)}`);        
            data.getStories = [result.data.createStory, ...data.getStories];            
            proxy.writeQuery({ 
                query: FETCH_STORIES_QUERY,
                variables: {
                    epicName
                },
                data 
            });
                        
            values.body = '';
            values.acceptanceCriteria = '';
            handleCallback(data);
        },
        onError: (err) => {
            console.log(`Error creating story. ${err}`);            
        }              
    });

    function createStoryCallback() {
        createStory();                
    }

    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2 style={{color: 'white'}}>Create a story:</h2>
            <Form.Group widths="equal">
                {/* <Form.Input
                    data-cy = "epic"
                    placeholder="Epic..."
                    name="epic"
                    onChange={onChange}
                    value={values.epic}
                    error={error ? true : false}
                /> */}
                <Form.Input
                data-cy = "body"
                    placeholder="As a user..."
                    name="body"
                    onChange={onChange}
                    value={values.body}
                    error={error ? true : false}
                />
                <Form.Input
                    data-cy = "acceptance"
                    placeholder="Acceptance..."
                    name="acceptanceCriteria"
                    onChange={onChange}
                    value={values.acceptanceCriteria}
                    error={error ? true : false}
                />
                <Button type="submit" color="teal" data-cy = "submit">
                    Submit
                </Button>
            </Form.Group>
        </Form>
        {error && (
            <div className="ui error message">
            <ul className="list">
                <li>{error.graphQLErrors[0].message}</li>
            </ul> </div>
        )}
        </>
    )
}

const CREATE_STORY_MUTATION = gql`
    mutation createStory($epicName: String, $body: String!, $acceptanceCriteria: String) {
        createStory(epicName: $epicName, body: $body, acceptanceCriteria: $acceptanceCriteria) {
            id
            epicName
            body
            acceptanceCriteria
            createdAt
            username
            likes {
                id                
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
            testScenarioCount 
            testScenarios {
                id
                scenario
                username
                createdAt
                approvalCount
                approvals {
                    id
                    username
                    createdAt
                }
                
            }
        }
    }
`;

export default StoryForm;
