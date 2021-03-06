import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';


function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    let navigate = useNavigate();

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(
            _, 
            {
                data: {login: userData }
            }
        ) {
            context.login(userData);
            console.log(`what is in userData ${JSON.stringify(userData)}`);
            navigate(`/${userData.orgName}/epics`);
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);            
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    id="username"
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username? true : false}
                    onChange={onChange}
                />               
                <Form.Input
                    id="password"
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password? true : false}
                    onChange={onChange}
                />
                <Button id="loginButton" type="submit" primary>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                    </div>
            )}
        </div>
    );
}

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
            orgName
        }
    }
`;

export default Login;