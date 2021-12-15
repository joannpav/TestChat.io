import React, { useState, useEffect } from 'react';
import { Icon, Feed } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function CommentButton({user, commentCount}) {    
    // const [errors, setErrors] = useState({});
    

    // useEffect(() => {        
    //     if(user && likes.find(like => like.username === user.username)){
    //         setLiked(true)

    //     } else setLiked(false)
    //     return () => setLiked(false);
    // }, [user, likes]);

    // const [likeStory] = useMutation(LIKE_STORY_MUTATION, {
    //     variables: { storyId: storyId},
    //     onError(err) {
    //         setErrors(err.graphQLErrors[0].extensions.errors);         
    //     }
    // })
    

    const commentButton = user ? (
        commentCount > 0 ? (
            <><Icon name='comments' color='teal'/> {commentCount } {commentCount === 1 ? "Comment" : "Comments"}</>
        ) : (
            <><Icon name='comments' /> {commentCount } {commentCount === 1 ? "Comment" : "Comments"}</>
        )
    ) : (
        <><Icon name='comments' to="/login"/> {commentCount } {commentCount === 1 ? "Comment" : "Comments"}</>
    )

    return (        
        <Feed.Like>
            {commentButton} 
        </Feed.Like>        
    )
}

// const LIKE_STORY_MUTATION = gql`
//     mutation likeStory($storyId: ID!){
//         likeStory(storyId: $storyId){
//             id
//             likes{
//                 id
//                 username                
//             }
//             likeCount
//         }
//     }
// `;

export default CommentButton;