import React, { useContext, useState } from "react";
import { useQuery } from '@apollo/react-hooks';
import { useNavigate } from "react-router"
import { Image, Feed, Card, Container, Segment, Message } from 'semantic-ui-react';
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

    console.log(`%%%% ${JSON.stringify(user)}`);
    let feedItemListMarkup = ""
    if (data.getEpics && data.getEpics.length === 0 || data.getEpics === null) {
        feedItemListMarkup = (
            <>
            <Segment style={{backgroundColor: 'teal'}}>
            <Container>
                <EpicForm handleCallback={handleCallback}/>
            </Container>
            </Segment>     
            <SectionBreadCrumb orgName={user?.orgName ? user.orgName : ""} section="Epics" epic="All" />
            <Message info>
                <Message.Header>No epics found</Message.Header>
                <p>Why don't you create one?</p>
            </Message>            
            </>
        )
    } else {   
        feedItemListMarkup = (<div>Epic Feed {JSON.stringify(data)}</div>)
    }
    // return (
    //     <div>Epic Feed {JSON.stringify(data)}</div>
    // )
    return feedItemListMarkup
  
};

export default EpicFeed;