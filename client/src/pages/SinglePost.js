import React, { useContext, useState } from 'react';
import { useParams } from "react-router-dom";

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import { Form, Button, Card, Grid, Image, Icon, Label, CommentGroup } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import TestCaseButton from '../components/TestCaseButton';
import TestCaseList from '../components/TestCaseList';
import TestScenarioForm from '../components/TestScenarioForm';
import TestCaseCommentGroup from '../components/TestCaseCommentGroup';
function SinglePost(props) {
    // const[comment, setComment] = useState('');
    const { postId } = useParams();
    const { user } = useContext(AuthContext);    

    const {   
                      
        data: {getPost: post} = {} 
    } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    // const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    //     update() {
    //         setComment('');
    //     },
    //     variables: {
    //         postId,
    //         body: comment
    //     }
    // });
    
    let navigate = useNavigate();

    function deletePostCallback() {
        navigate("/");
    }

    let postMarkup;
    if(!post) {
        postMarkup =  <p>Loading post...</p>
    } else {
        const { id, body, createdAt, username, testScenarios, comments, likes, likeCount, commentCount, testScenarioCount} =
        post;
        
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                        src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                        size="small"
                        float="right"
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid color='red'>
                            <Card.Content>
                                <Label as='a' color='red' ribbon style={{marginBottom:'10px'}}>
                                    Story
                                </Label>                                
                                <Card.Header>{body}</Card.Header>
                                <Card.Meta>{username}</Card.Meta>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>
                                <hr />
                                <TestCaseList 
                                    testScenarios={testScenarios} 
                                    user={user} 
                                    postId={id}/>                                
                                </Card.Description>                                
                            </Card.Content>
                            
                            <hr/>
                            <Card.Content extra>
                                <TestCaseButton count={testScenarioCount}/>
                                
                                <LikeButton user={user} post={{ id, likeCount, likes }} />
                                <Button
                                    as="div"
                                    labelPosition="right"
                                    onClick={() => console.log('comment on post')}
                                >
                                    <Button basic color="blue">
                                        <Icon name="comments" />
                                        
                                    </Button>
                                    <Label basic color="blue" pointing="left">
                                        {commentCount}
                                    </Label>    
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallback} />
                                )}
                            </Card.Content>
                        </Card>
                        {user && (<TestScenarioForm 
                            postId={id}
                        />)}
                        {/* {user && (
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
                        */}
                        <TestCaseCommentGroup
                            comments={comments}
                            user={user}
                            postId={id}
                        /> 
                        {/* {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id} />
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))} */}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return postMarkup;
}

// const SUBMIT_COMMENT_MUTATION = gql`
//     mutation($postId: ID!, $body: String!){
//         createComment(postId: $postId, body: $body){
//             id
//             comments {
//                 id
//                 body
//                 username
//                 createdAt
//             }
//         }
//     }
// `;
    
const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId){
            id 
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }   
            testScenarioCount
            testScenarios {
                id
                scenario
                createdAt
                username
            }         
        }
    }
`;

export default SinglePost;