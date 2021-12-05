import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks'
import { Card, Comment, Form, Header } from 'semantic-ui-react';
import moment from 'moment';

const TestCaseCommentGroup = ({comments, user, postId}) => {
    console.log(JSON.stringify(comments));
    console.log(JSON.stringify(user));
    console.log(JSON.stringify(postId));
    // let comments = commentsObj.comments;
    // let user = userObj.user;
    // let postId = postIdObj.postId;

    const[comment, setComment] = useState('');
    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('');
        },
        variables: {
            postId,
            body: comment
        }
    });

    console.log(`these are the comments ${JSON.stringify(comments)}`);
    console.log(`this is the created at ${JSON.stringify(comments[0].createdAt)}`);
    let commentGroupMarkup = (
        <Comment.Group>
            <Header as='h3' dividing>
            Comments
            </Header>
                {user && (
                    <Card fluid>
                        <Card.Content>
                            <p>Post a comment</p>
                            <Form>
                            <div className="ui action input fluid">
                                <input
                                type="text"
                                placeholder="Comment.."
                                name="comment"
                                value={comment}
                                onChange={event => setComment(event.target.value)}
                                />
                                <button type="submit"
                                className="ui button teal"
                                disabled={comment.trim() === ''}
                                onClick={submitComment}
                                >Submit</button>
                                </div> 
                            </Form>
                        </Card.Content>
                    </Card>
                )}
               

            {/* {user && (
                <Form reply>
                    <Form.TextArea 
                        name="comment"
                        value={comment}
                        onChange={event => setComment(event.target.value)}        
                    />
                    <Button 
                        content='Add Reply' 
                        labelPosition='left' 
                        icon='edit' 
                        primary 
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                    />
                </Form>
            )} */}

            {comments.map(comment => (
                <Comment key={comment.id}>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>{comment.username}</Comment.Author>
                    <Comment.Metadata>
                    <div>{moment(comment.createdAt).fromNow()}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.body}</Comment.Text>
                    <Comment.Actions>
                    {user && user.username === comment.username && (
                        <Comment.Action>Delete</Comment.Action>                    
                    )}
                    <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
                </Comment>
            ))}            
        </Comment.Group>
    );
    return commentGroupMarkup;
};

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments {
                id
                body
                username
                createdAt
            }
        }
    }
`;

export default TestCaseCommentGroup