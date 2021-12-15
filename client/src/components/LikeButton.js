import React, { useState, useEffect } from 'react';
import { Icon, Feed } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function LikeButton({user, storyId, likeCount, likes}) {
    const [liked, setLiked] = useState(false);
    const [errors, setErrors] = useState({});
    

    useEffect(() => {        
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)

        } else setLiked(false)
        return () => setLiked(false);
    }, [user, likes]);

    const [likeStory] = useMutation(LIKE_STORY_MUTATION, {
        variables: { storyId: storyId},
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);         
        }
    })
    

    const likeButton = user ? (
        liked ? (
            <><Icon name='like' color='red' onClick={likeStory}/> {likeCount } {likeCount === 1 ? "Like  " : "Likes  "}</>
        ) : (
            <><Icon name='like' onClick={likeStory}/> {likeCount } {likeCount === 1 ? "Like  " : "Likes  "}</>
        )
    ) : (
        <><Icon name='like' to="/login"/> {likeCount } {likeCount === 1 ? "Like  " : "Likes  "}</>
    )

    return (        
        <Feed.Like>
            {likeButton} 
        </Feed.Like>        
    )
}

const LIKE_STORY_MUTATION = gql`
    mutation likeStory($storyId: ID!){
        likeStory(storyId: $storyId){
            id
            likes{
                id
                username                
            }
            likeCount
        }
    }
`;

export default LikeButton;