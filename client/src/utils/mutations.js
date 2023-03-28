import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation registerUser($username: String!, $name: String!, $email: String!, $password: String!) {
    registerUser(username: $username, name: $name, email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;
export const CREATE_LANGUAGE = gql`
mutation createLanguage($name: String!, $languageCode: String!) {
  createLanguage(name: $name, languageCode: $languageCode) {
    id
    name
    languageCode
  }
}
`;
export const ADD_SUBTITLE = gql`
  mutation addSubtitle($videoId: ID!, $text: String!, $languageCode: String!) {
    addSubtitle(videoId: $videoId, text: $text, languageCode: $languageCode) {
      id
      text
      languageCode
    }
  }
`;

export const DELETE_SUBTITLE = gql`
  mutation deleteSubtitle($id: ID!) {
    deleteSubtitle(id: $id) {
      id
    }
  }
`;

export const UPDATE_SUBTITLE = gql`
  mutation updateSubtitle($id: ID!, $text: String!) {
    updateSubtitle(id: $id, text: $text) {
      id
      text
    }
  }
`;

export const TRANSLATE_SUBTITLE = gql`
  mutation translateSubtitle($id: ID!, $languageCode: String!) {
    translateSubtitle(id: $id, languageCode: $languageCode) {
      id
      text
      languageCode
    }
  }
`;

export const GENERATE_VOICEOVER = gql`
  mutation generateVoiceover($id: ID!, $languageCode: String!) {
    generateVoiceover(id: $id, languageCode: $languageCode) {
      id
      text
      languageCode
    }
  }
`;

export const ADD_VOICEOVER = gql`
  mutation addVoiceover($videoId: ID!, $audioUrl: String!, $languageCode: String!) {
    addVoiceover(videoId: $videoId, audioUrl: $audioUrl, languageCode: $languageCode) {
      id
      audioUrl
      languageCode
    }
  }
`;

export const DELETE_VOICEOVER = gql`
  mutation deleteVoiceover($id: ID!) {
    deleteVoiceover(id: $id) {
      id
    }
  }
`;

export const UPDATE_VOICEOVER = gql`
  mutation updateVoiceover($id: ID!, $audioUrl: String!) {
    updateVoiceover(id: $id, audioUrl: $audioUrl) {
      id
      audioUrl
    }
  }
`;

export const ADD_PAYMENT = gql`
  mutation addPayment($userId: ID!, $amount: Float!) {
    addPayment(userId: $userId, amount: $amount) {
      id
      amount
    }
  }
`;

export const ADD_COLLABORATOR = gql`
  mutation addCollaborator($videoId: ID!, $email: String!) {
    addCollaborator(videoId: $videoId, email: $email) {
      id
      email
    }
  }
`;

export const DELETE_COLLABORATOR = gql`
  mutation deleteCollaborator($id: ID!) {
    deleteCollaborator(id: $id) {
      id
    }
  }
`;

export const ADD_ANALYTICS = gql`
  mutation addAnalytics($videoId: ID!, views: Int!, likes: Int!, dislikes: Int! {
    addAnalytics(videoId: $videoId, views: $views, likes: $likes, dislikes: $dislikes) {
      id
      views
      likes
      dislikes
    }
  }
`;

export const UPDATE_ANALYTICS = gql`
  mutation updateAnalytics($id: ID!, views: Int!, likes: Int!, dislikes: Int!) {
    updateAnalytics(id: $id, views: $views, likes: $likes, dislikes: $dislikes) {
      id
      views
      likes
      dislikes
    }
  }
`;

export const UPLOAD_VIDEO = gql`
  mutation uploadVideo($file: Upload!) {
    uploadVideo(file: $file) {
      id
    }
  }
`;

