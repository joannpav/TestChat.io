import React, { useContext, useState } from "react";
import { useQuery } from '@apollo/react-hooks';
import { useNavigate } from "react-router"
import { useParams } from "react-router-dom";
import { Feed, Card, Container, Segment, Message } from 'semantic-ui-react';
import { FETCH_EPICS_QUERY } from "../util/graphql";
import moment from 'moment';
import {AuthContext} from "../context/auth";
import SectionBreadCrumb from "../components/SectionBreadCrumb";
import EpicForm from "../components/EpicForm";
import DeleteEpicButton from "../components/DeleteEpicButton";

function EpicFeed() {
    const [epicFeed, setEpicFeed] = useState();
    const { user } = useContext(AuthContext);
    const { orgName } = useParams();
    const { data, error, loading } = useQuery(FETCH_EPICS_QUERY, {        
        variables: {
            orgName
        }
    });

    let navigate = useNavigate();

    if (loading) return <p>Loading ...</p>;
    if (error){
        if (error?.message?.includes("Authorization token must be provided")) {
            navigate("/login")
        }    
    }
    if(!user) { navigate("/login")}

    const handleCallback = (childData) => {
        console.log(`updating feed with ${JSON.stringify(childData)}`);
        setEpicFeed({data: childData})
        console.log(`data should have updated ui now with ${JSON.stringify(data)}`);
    }

    let feedItemListMarkup = ""
    if (!data?.getEpics?.length ||  data.getEpics.length === 0) {
        feedItemListMarkup = (
            <>
            <Segment style={{backgroundColor: 'teal'}} >
            <Container>
                <EpicForm handleCallback={handleCallback}/>
            </Container>
            </Segment>     
            <SectionBreadCrumb trunk={user?.orgName ? user.orgName : ""} branch="Epics" leaf="" />
            <Message info>
                <Message.Header>No epics found</Message.Header>
                <p>Why don't you create one?</p>
            </Message>            
            </>
        )
    } else {   
        feedItemListMarkup = (
            <>
            <Segment style={{backgroundColor: 'teal'}}>
            <Container>
                <EpicForm handleCallback={handleCallback}/>
            </Container>
            </Segment>         
            <SectionBreadCrumb trunk={user?.orgName ? user.orgName : ""} branch="Epics" leaf="" />
            <Feed data-cy="feedContainer">
                <Card.Group itemsPerRow={4}>
                {data && 
                    data.getEpics.map((epic) => (                     
                        <Card key={epic.id}>
                        <Card.Content >   
                            <Feed.Event data-cy={epic.EpicName}>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <Feed.Label><a href={`${epic.id}/stories`}>{epic.epicName}</a></Feed.Label>
                                        <Feed.Date>{moment(epic.createdAt).fromNow()}</Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Extra>
                                        <Feed.Meta>{epic.storyCount} Stories</Feed.Meta>
                                        <Feed.Meta>{epic.scenarioCount} Scenarios</Feed.Meta>
                                        <Feed.Meta>{epic.owner?.username}</Feed.Meta>
                                        {user && user.username === epic.owner?.username && <DeleteEpicButton handleCallback={handleCallback} epicId={epic.id} orgName={user.orgName} />}                                          
                                    </Feed.Extra>
                                </Feed.Content>
                            </Feed.Event>
                        </Card.Content>
                        </Card>
                ))}
                </Card.Group>
            </Feed>            
            </>
        )}
    
    return feedItemListMarkup
  
};

export default EpicFeed;