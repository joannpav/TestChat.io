import React, { useContext, useState } from "react";
import { useQuery } from '@apollo/react-hooks';
import { Image, Feed, Card, Grid  } from 'semantic-ui-react';
import { FETCH_STORIES_QUERY } from "../util/graphql";
import moment from 'moment';
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import TestCaseButton from "../components/TestCaseButton";
import StoryForm from "../components/StoryForm";
import { useNavigate } from "react-router";


function StoryFeed() {
    const [storyFeed, setStoryFeed] = useState();

    const { user } = useContext(AuthContext);    
    const { data, error, loading } = useQuery(FETCH_STORIES_QUERY);

    let navigate = useNavigate();
  
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{`Error loading ${error}`}</p>
    if (!user) { navigate("/login") }

    const handleCallback = (childData) => { 
        // console.log(`'handleCallback triggered ${JSON.stringify(childData)}`);       
        setStoryFeed({data: childData})        
    }

    return(
        <>
        <Grid columns={3}>
            <Grid.Row>
                <Grid.Column>
                    <StoryForm handleCallback={handleCallback}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Feed data-cy="feedContainer">
            {data &&
                data.getStories.map((story) => (                                                        
                <Card fluid key={story.id}>
                <Card.Content >   
                <Feed.Event data-cy="feedItem">                                        
                    <Feed.Label>
                    <Image 
                        floated="left"
                        size="mini"
                        src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                    />                   
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary>                            
                            <Feed.Content><a href={`/stories/${story.id}`}>{story.epic ? story.epic : "No epic"}</a></Feed.Content>
                            <Feed.User></Feed.User> 
                            <Feed.Date>{moment(story.createdAt).fromNow()}</Feed.Date>                            
                        </Feed.Summary>
                        <Feed.Extra>
                            {story.body}
                        </Feed.Extra>
                        <Feed.Extra>
                            <Feed.Meta>{story.acceptanceCriteria}</Feed.Meta>
                        </Feed.Extra>
                        <hr />
                        <Feed.Meta>
                            <LikeButton user={user} storyId={story.id} likeCount={story.likeCount} likes={story.likes}  />                            
                            <TestCaseButton count={story.testScenarioCount} user={user} />   
                            {user && user.username === story.username && <DeleteButton handleCallback={handleCallback} storyId={story.id} />}                                          
                        </Feed.Meta>                    
                        
                    </Feed.Content>
                </Feed.Event>
                </Card.Content>
                </Card>
            ))}
        </Feed>
        </>
        )
    
};

export default StoryFeed;
