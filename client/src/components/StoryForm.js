import React from 'react';
import {Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { FETCH_STORIES_QUERY } from '../util/graphql';

function StoryForm() {
    const { values, onChange, onSubmit } = useForm(createStoryCallback, {
        body: '',
        acceptanceCriteria: ''
    });

    const [createStory, { error }] = useMutation(CREATE_STORY_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_STORIES_QUERY
            });
            proxy.writeQuery({ 
                query: FETCH_STORIES_QUERY, 
                data: {
                    getStories: [result.data.createStory, ...data.getStories],
                }
            });
            values.body = '';
            values.acceptanceCriteria = '';
        }
    });

    function createStoryCallback() {
        createStory();
    }

    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>Create a story:</h2>
            <Form.Field>
                <Form.Input
                    placeholder="As a user..."
                    name="body"
                    onChange={onChange}
                    value={values.body}
                    error={error ? true : false}
                />
                <Form.Input
                    placeholder="Acceptance..."
                    name="acceptanceCriteria"
                    onChange={onChange}
                    value={values.acceptanceCriteria}
                    error={error ? true : false}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Form.Field>
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
    mutation createStory($body: String!, $acceptanceCriteria: String) {
        createStory(body: $body, acceptanceCriteria: $acceptanceCriteria) {
            id
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
        }
    }
`;

export default StoryForm;
