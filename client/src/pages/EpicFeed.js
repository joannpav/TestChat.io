import React, { useContext, useState } from "react";
import { useQuery } from '@apollo/react-hooks';
import { useNavigate } from "react-router"
import { Pagination, Feed, Card, Container, Segment, Message } from 'semantic-ui-react';
import { FETCH_EPICS_QUERY } from "../util/graphql";
import moment from 'moment';
import {AuthContext} from "../context/auth";
import SectionBreadCrumb from "../components/SectionBreadCrumb";
import EpicForm from "../components/EpicForm";


function EpicFeed() {
    const [epicFeed, setEpicFeed] = useState();
    const { user } = useContext(AuthContext);
    const { data, error, loading } = useQuery(FETCH_EPICS_QUERY);

    
    let navigate = useNavigate();

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{`Error loading ${error}`}</p>
    if(!user) { navigate("/login")}

    const handleCallback = (childData) => {
        setEpicFeed({data: childData})
    }

    let feedItemListMarkup = ""
    if (data.getEpics && data.getEpics.length === 0 || data.getEpics === null) {
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
                
                {data && 
                    data.getEpics.map((epic) => (
                        <Card fluid key={epic.id}>
                        <Card.Content >   
                            <Feed.Event>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <Feed.Label><a href={`${epic.epicName}/stories`}>{epic.epicName}</a></Feed.Label>
                                        <Feed.Date>{moment(epic.createdAt).fromNow()}</Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Extra>
                                        <Feed.Meta>{epic.storyCount} Stories</Feed.Meta>
                                    </Feed.Extra>
                                </Feed.Content>
                            </Feed.Event>
                        </Card.Content>
                        </Card>
                    ))}
            </Feed>
            {/* <Container>
                <Segment raised>
                    <Pagination
                        boundaryRange={0}
                        defaultActivePage={1}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        totalPages={10}
                    />
                </Segment>
            </Container> */}
            </>
        )}
    
    return feedItemListMarkup
  
};

export default EpicFeed;