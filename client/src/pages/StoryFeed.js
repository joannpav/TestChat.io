import React, { useContext } from "react";
import { useQuery } from '@apollo/react-hooks';
import { Image, Feed, Icon, Card, Grid  } from 'semantic-ui-react';
import { FETCH_STORIES_QUERY } from "../util/graphql";
import moment from 'moment';
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import TestCaseButton from "../components/TestCaseButton";
import StoryForm from "../components/StoryForm";


function StoryFeed() {
    const { user } = useContext(AuthContext);    
    const { 
        loading, 
        data: {getStories: stories} = {} 
    } = useQuery(FETCH_STORIES_QUERY);
    

   

    return(
        <>
        <Grid columns={3}>
            <Grid.Row>
                <Grid.Column>
                    <StoryForm />
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Feed>
            {stories &&
                stories.map((story) => (                                                        
                <Card fluid key={story.id}>
                <Card.Content >   
                <Feed.Event>                                        
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
