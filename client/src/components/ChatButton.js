import React from 'react';
import { Popup, Image, Icon, Feed } from 'semantic-ui-react';

function ScenarioChatButton({user, story, testScenario: {id, commentCount, comments}}) {    

    const scenarioChatButton = user ? (
        commentCount > 0 ? (
            <>
                
                <Popup
                        content={comments && comments.map((comment) => (
                            <>                        
                            <p><Image size="mini" src="https://react.semantic-ui.com/images/avatar/small/molly.png"  avatar />{JSON.stringify(comment)}</p>
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