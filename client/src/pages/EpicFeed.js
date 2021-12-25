import React, { useContext, useEffect, useState } from "react";
import { useQuery } from '@apollo/react-hooks';
import { useNavigate } from "react-router"
import { useParams } from "react-router-dom";
import { Pagination, Feed, Card, Container, Segment, Message } from 'semantic-ui-react';
import { FETCH_EPICS_QUERY } from "../util/graphql";
import moment from 'moment';
import {AuthContext} from "../context/auth";
import SectionBreadCrumb from "../components/SectionBreadCrumb";
import EpicForm from "../components/EpicForm";


// TODO:
// Add delete button
// Deleting an epic should delete all stories
// May want to convert from using the epicName to the epicID bc what if 2 epics have same name?
// Both epics end up pointing to the same stories

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

    // const orgId = () => {}

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{`Error loading ${error}`}</p>
    if(!user) { navigate("/login")}

    const handleCallback = (childData) => {
        setEpicFeed({data: childData})
    }

    let feedItemListMarkup = ""
    if ((data.getEpics && data.getEpics.length === 0) || data.getEpics === null) {
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