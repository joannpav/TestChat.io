import React, { Children, useContext, useState } from 'react';
import { useParams } from "react-router-dom";

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { Button, Card, Grid, Image, Icon, Label } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import BigLikeButton from '../components/BigLikeButton';
import DeleteButton from '../components/DeleteButton';
import TestCaseButton from '../components/TestCaseButton';
import TestCaseList from '../components/TestCaseList';
import TestScenarioForm from '../components/TestScenarioForm';
import TestCaseCommentGroup from '../components/TestCaseCommentGroup';
import {FETCH_STORY_QUERY} from '../util/graphql';

function SingleStory() {  
    const [ scenarios, setScenarios ] = useState();  
    const { storyId } = useParams();
    const { user } = useContext(AuthContext);    
    const {data: {getStory: story} = {}, error, loading } = useQuery(FETCH_STORY_QUERY, {
        variables: {
            storyId
        }
    });
    
    let navigate = useNavigate();

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{`Error loading ${error}`}</p>
    if (!user) { navigate("/login") }

    const handleCallback = (childData) => {   
        console.log(`'handeCallback triggered ${JSON.stringify(childData)}`);     
        setScenarios({data: childData})        
        story.testScenarios = [story.testScenarios, ...childData.testScenarios];
    }

    function deleteStoryCallback() {        
        navigate("/");
    }


    let storyMarkup;
    if(!story) {
        storyMarkup =  <p>Loading story...</p>
    } else {
        const { 
            id, 
            body, 
            acceptanceCriteria, 
            createdAt, 
            username, 
            testScenarios, 
            comments, 
            likes, 
            likeCount, 
            commentCount, 
            testScenarioCount
        } = story;
        
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
                                    {acceptanceCriteria}
                                    <hr />
                                    <TestCaseList                                           
                                        testScenarios={testScenarios}
                                        storyId={id}
                                        user={user}
                                    />                                
                                </Card.Description>                                
                            </Card.Content>
                            
                            <hr/>
                            <Card.Content extra>
                                <TestCaseButton count={testScenarioCount} user={user}/>
                                
                                <BigLikeButton user={user} storyId={story.id} likeCount={story.likeCount} likes={story.likes} />
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
                                {/* {user && user.username === username && (
                                    <DeleteButton storyId={id} callback={deleteStoryCallback} />
                                )} */}
                            </Card.Content>
                        </Card>
                        
                        {user && (<TestScenarioForm 
                            handleCallback={handleCallback}
                            storyId={id}
                        />)}
                        
                        <TestCaseCommentGroup
                            comments={comments}
                            user={user}
                            storyId={id}
                        /> 
                       
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return storyMarkup;
}

    
// const FETCH_STORY_QUERY = gql`
//     query($storyId: ID!) {
//         getStory(storyId: $storyId){
//             id 
//             body
//             acceptanceCriteria
//             createdAt
//             username
//             likeCount
//             likes {
//                 username
//             }
//             commentCount
//             comments {
//                 id
//                 username
//                 createdAt
//                 body
//             }   
//             testScenarioCount
//             testScenarios {
//                 id
//                 scenario                
//                 username
//                 approvalCount
//                 # questionCount
//                 # viewerCount
//                 approvals {
//                     username
//                     createdAt
//                 }
//             #     questions {
//             #         username
//             #     }
//             #     viewers {
//             #         username
//             #     }
//             }         
//         }
//     }
// `;

export default SingleStory;