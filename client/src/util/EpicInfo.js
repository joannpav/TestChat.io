import React from 'react'; 
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

function EpicInfo(epicId) {
    const { data, error, loading } = useQuery(FETCH_EPIC_QUERY, {
        variables: {
            epicId
        }
    });
    
    if (loading) return (<p>Loading ...</p>)
    console.log(`what is data here? ${data.getEpic.epicName} ${JSON.stringify(data)}`);            
    return data.getEpic.epicName;
}

const FETCH_EPIC_QUERY = gql`
query GetEpic($epicId: ID!) {
  getEpic(epicId: $epicId) {    
    epicName  
  }
}
`;

export default EpicInfo;