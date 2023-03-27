import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      id
      name 
      email
      videos{
        id
        url
        title
        description
      }
    }
  }
`;

export const QUERY_SINGLE_VIDEO = gql`
  query getVideo($videoId: ID! ) {
    getVideo(videoId: $videoId) {
      id
      url
      title
      description
    }  
  }
`;

export const QUERY_SINGLE_USER = gql`
  query getUser($id: ID! ) {
    getUser(id: $id) {
      id
      name
      email
      videos{
        id
        url
        title
        description
      }
    }  
  }
`;

export const QUERY_ALL_USERS = gql`
  query getUsers {
    getUsers {
      id
      name
      email
      videos{
        id
        url
        title
        description
      }
    }  
  }
`;

export const QUERY_ALL_SUBTITLES = gql`
  query getSubtitles($videoId: ID! ) {
    getSubtitles(videoId: $videoId) {
      id
      language
      text
      translatedText
    }  
  }
`;

export const QUERY_ALL_VOICEOVERS = gql`
  query getVoiceovers($videoId: ID! ) {
    getVoiceovers(videoId: $videoId) {
      id
      language
      audioUrl
    }  
  }
`;

export const QUERY_ALL_LANGUAGES = gql`
  query getLanguages {
    getLanguages {
      id
      name
      languageCode
    }  
  }
`;

export const QUERY_ALL_PAYMENTS = gql`
  query getPayments($userId: ID! ) {
    getPayments(userId: $userId) {
      id
      amount
      date
    }  
  }
`;

export const QUERY_ALL_COLLABORATORS = gql`
  query getCollaborators($videoId: ID! ) {
    getCollaborators(videoId: $videoId) {
      id
      role
    }  
  }
`;

export const QUERY_ALL_ANALYTICS = gql`
  query getAnalytics($videoId: ID! ) {
    getAnalytics(videoId: $videoId) {
      id
      subtitleDownloads
      voiceoverDownloads
      feedback
    }  
  }
`;