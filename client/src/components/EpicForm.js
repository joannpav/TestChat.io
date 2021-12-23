import React from 'react';
import {Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useNavigate } from 'react-router';
import { useForm } from '../util/hooks';
import { FETCH_EPICS_QUERY } from '../util/graphql';

function EpicForm({ handleCallback }) {
    const { values, onChange, onSubmit } = useForm(createEpicCallback, {        
        epicName: '',
        description: '',                
    });

    let navigate = useNavigate();
            
    const [createEpic, { loading, error }] = useMutation(CREATE_EPIC_MUTATION, {
        variables: values,        
        update(proxy, result) {            
            const data = proxy.readQuery({
                query: FETCH_EPICS_QUERY
            });    
            console.log(`what is in this result? ${JSON.stringify(result)}`);        
            data.getEpics = [result.data.createEpic, ...data.getEpics];            
            proxy.writeQuery({ query: FETCH_EPICS_QUERY, data });

            values.epicName = '';
            values.description = '';            
            handleCallback(data);
        },
        onError: (err) => {
            console.log(`Error creating epic. ${err}`);
            // navigate("/login");
        }              
    });

    function createEpicCallback() {
        createEpic();                
    }

    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2 style={{color: 'white'}}>Create an Epic:</h2>
            <Form.Group widths="equal">
                <Form.Input
                    data-cy = "epicName"
                    placeholder="Epic name..."
                    name="epicName"
                    onChange={onChange}
                    value={values.epicName}
                    error={error ? true : false}
                />
                <Form.Input
                data-cy = "description"
                    placeholder="Description..."
                    name="description"
                    onChange={onChange}
                    value={values.description}
                    error={error ? true : false}
                />
                {/* <Form.Input
                    data-cy = "acceptance"
                    placeholder="Acceptance..."
                    name="acceptanceCriteria"
                    onChange={onChange}
                    value={values.acceptanceCriteria}
                    error={error ? true : false}
                /> */}
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

const CREATE_EPIC_MUTATION = gql`
    mutation createEpic($epicName: String!, $description: String) {
        createEpic(epicName: $epicName, description: $description) {
            id    
            epicName
            description
            createdAt        
            storyCount
            scenarioCount
        }
    }
`;

export default EpicForm;