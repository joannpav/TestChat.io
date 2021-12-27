import React, { useContext, useState } from "react";
import { useQuery } from '@apollo/react-hooks';
import { Image, Feed, Card, Container, Segment, Message  } from 'semantic-ui-react';
import { FETCH_STORIES_QUERY } from "../util/graphql";
import moment from 'moment';
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import TestScenarioButton from "../components/TestScenarioButton";
import StoryForm from "../components/StoryForm";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import SectionBreadCrumb from "../components/SectionBreadCrumb";
import EpicNameInfo from "../util/EpicNameInfo";
import EpicInfoBlock from "../components/EpicInfoBlock";

function StoryFeed() {
    const [storyFeed, setStoryFeed] = useState();

    const { user } = useContext(AuthContext);    
    const { orgName, epicId } = useParams();
    const { data, error, loading } = useQuery(FETCH_STORIES_QUERY, {
        variables: {
            epicId
        }
    });
    const epicName = EpicNameInfo(epicId);
    console.log(epicName);

    let navigate = useNavigate();
  
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{`Error loading ${error.message}`}</p>
    if (!user) { navigate("/login") }

    
    const handleCallback = (childData) => { 
        console.log(`updating storyfeed with ${JSON.stringify(childData)}`);
        setStoryFeed({data: childData})    
        console.log(`data should have updated ui now with ${JSON.stringify(data)}`);
    
    }

    

    let feedItemListMarkup = ""
    if (data.getStories.length === 0) {
        feedItemListMarkup = (
            <>
            <EpicInfoBlock epicId={epicId} />
            <Segment style={{backgroundColor: 'teal'}}>
            <Container>
                <StoryForm handleCallback={handleCallback}/>
            </Container>
            </Segment>     
            <SectionBreadCrumb trunk={user?.orgName ? user.orgName : ""} branch="" leaf={epicName} />
            <Message info>
                <Message.Header>No stories in this epic</Message.Header>
                <p>Why don't you create one?</p>
            </Message>            
            </>
        )
    } else {    
        feedItemListMarkup = (
        <>              
            <Segment style={{backgroundColor: 'teal'}}>
            <Container>
                <StoryForm handleCallback={handleCallback}/>
            </Container>
            </Segment>         
            
            <SectionBreadCrumb trunk={user?.orgName ? user.orgName : ""} branch={epicName} leaf="Stories" />
            <EpicInfoBlock  epicId={epicId} />
            <Feed data-cy="feedContainer">
                {data &&
                    data.getStories.map((story) => (              
                    <Card fluid key={story.id}>
                    <Card.Content >   
                    <Feed.Event data-cy={story.body}>                                        
                        <Feed.Label>
                        <Image 
                            floated="left"
                            size="mini"
                            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                        />                   
                        </Feed.Label>
                        <Feed.Content>
                            <Feed.Summary>                            
                                <Feed.Content><a href={`/${orgName}/${epicName}/stories/${story.id}`}>{story.body}</a></Feed.Content>                            
                                <Feed.Date>{moment(story.createdAt).fromNow()}</Feed.Date>                                                        
                            </Feed.Summary>
                            
                            <Feed.Extra>
                                <Feed.Meta>{story.acceptanceCriteria}</Feed.Meta>
                            </Feed.Extra>
                            <hr />
                                <Feed.Meta>
                                    <LikeButton user={user} storyId={story.id} likeCount={story.likeCount} likes={story.likes}  />                            
                                    <TestScenarioButton count={story.testScenarioCount} user={user} />                                   
                                    {user && user.username === story.username && <DeleteButton handleCallback={handleCallback} epicName={epicId} storyId={story.id} />}                                          
                                </Feed.Meta>
                            
                            
                        </Feed.Content>
                    </Feed.Event>
                    </Card.Content>
                    </Card>
                    
                ))}                                        
            </Feed>        
            </>); 
        }

    return feedItemListMarkup
        
};



export default StoryFeed;
