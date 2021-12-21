import React from 'react';
import { Comment, Popup, Image, Icon, Feed } from 'semantic-ui-react';
import moment from 'moment';
import ScenarioCommentGroup from "../components/ScenarioCommentGroup";

function ScenarioChatButton({user, story, testScenario: {id, commentCount, comments}}) {    

    const scenarioChatButton = user ? (
        commentCount > 0 ? (
            <>
                
                <Popup                        
                        content={comments && comments.map((comment) => (
                            <>
                            <Comment.Group>
                                <Comment>
                                    <Comment.Avatar as="a" src="https://react.semantic-ui.com/images/avatar/small/molly.png" />
                                    <Comment.Content>
                                        <Comment.Author as='a'>{comment.username}</Comment.Author>
                                        <Comment.Metadata><span>{moment(comment.createdAt).fromNow()}</span></Comment.Metadata>
                                        <Comment.Text>{comment.body}</Comment.Text>
                                    </Comment.Content>
                                    </Comment>
                            </Comment.Group>
                            <ScenarioCommentGroup storyId={story.id} user={user} comments=""></ScenarioCommentGroup>
                            </>
                            ))}
                        trigger={<Icon size="small" circular inverted name='comments' color='teal'/> }              
                    />
                    <span style={{color:commentCount > 0 ? "teal" : "grey" }}>{commentCount} </span>
            </>
        ) : (
            <><Icon size="small" circular inverted name='comments' color='grey'/> {commentCount } </>
        )
    ) : (
        <><Icon size="small" circular inverted name='comments'color='grey' to="/login"/> {commentCount } </>
    )

    return (        
        <Feed.Like>
            &nbsp;{scenarioChatButton} 
        </Feed.Like>        
    )
}

export default ScenarioChatButton;