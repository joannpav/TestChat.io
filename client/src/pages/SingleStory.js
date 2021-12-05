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
function SingleStory(props) {
    // const[comment, setComment] = useState('');
    const { storyId } = useParams();
    const { user } = useContext(AuthContext);    

    const {   
                      
        data: {getStory: story} = {} 
    } = useQuery(FETCH_POST_QUERY, {
        variables: {
            storyId
        }
    });

    // const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    //     update() {
    //         setComment('');
    //     },
    //     variables: {
    //         storyId,
    //         body: comment
    //     }
    // });
    
    let navigate = useNavigate();

    function deleteStoryCallback() {
        navigate("/");
    }

    let storyMarkup;
    if(!story) {
        storyMarkup =  <p>Loading story...</p>
    } else {
        const { id, body, createdAt, username, testScenarios, comments, likes, likeCount, commentCount, testScenarioCount} =
        story;
        
        storyMarkup = (
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
                                    storyId={id}/>                                
                                </Card.Description>                                
                            </Card.Content>
                            
                            <hr/>
                            <Card.Content extra>
                                <TestCaseButton count={testScenarioCount}/>
                                
                                <LikeButton user={user} story={{ id, likeCount, likes }} />
                                <Button
                                    as="div"
                                    labelPosition="right"
                                    onClick={() => console.log('comment on story')}
                                >
                                    <Button basic color="blue">
                                        <Icon name="comments" />
                                        
                                    </Button>
                                    <Label basic color="blue" pointing="left">
                                        {commentCount}
                                    </Label>    
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton storyId={id} callback={deleteStoryCallback} />
                                )}
                            </Card.Content>
                        </Card>
                        {user && (<TestScenarioForm 
                            storyId={id}
                        />)}
                        {/* {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Story a comment</p>
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
                            storyId={id}
                        /> 
                        {/* {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton storyId={id} commentId={comment.id} />
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

    return storyMarkup;
}

// const SUBMIT_COMMENT_MUTATION = gql`
//     mutation($storyId: ID!, $body: String!){
//         createComment(storyId: $storyId, body: $body){
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
    query($storyId: ID!) {
        getStory(storyId: $storyId){
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

export default SingleStory;