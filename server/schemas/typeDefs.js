const{ gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID
    username: String
    name: String
    email: String
    password: String
    videos: [Video]!
  }

  type Video {
    id: ID
    url: String
    title: String
    description: String
    file: String
  }

  type Subtitle {
    id: ID
    videoId: [Video]!
    language: String!
    text: String
    translatedText: String
  }

  type Voiceover {
    id: ID
    videoId: [Video]!
    language: String
    audioUrl: String
  }

  type Language {
    id: ID
    name: String
    languageCode: String!
  }

  type Payment {
    id: ID
    userId: [User]!
    amount: Int
    date: String
  }

  type Collaboration {
    id: ID
    userId: [User]!
    videoId: [Video]!
    role: String
  }

  type Analytics {
    id: ID
    userId: [User]!
    videoId: [Video]!
    subtitleDownloads: Int
    voiceoverDownloads: Int
    feedback: String
    timestamp: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    getUser(id: ID!): User
    getUsers: [User]!
    getVideo(id: ID!): Video
    getSubtitles(videoId: ID!): [Subtitle]
    getVoiceovers(videoId: ID!): [Voiceover]
    getLanguages: [Language]
    getPayments(userId: ID!): [Payment]
    getCollaborators(videoId: ID!): [Collaboration]
    getAnalytics(videoId: ID!): Analytics
  }

  type Mutation {
    registerUser(username: String!, name: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    addSubtitle(videoId: ID!, text: String!, languageCode: String!): Subtitle
    deleteSubtitle(id: ID!): Subtitle
    updateSubtitle(id: ID!, text: String!): Subtitle
    translateSubtitle(id: ID!, languageCode: String!): Subtitle
    generateVoiceover(id: ID!, languageCode: String!): Subtitle
    addVoiceover(videoId: ID!, audioUrl: String!, languageCode: String!): Voiceover
    deleteVoiceover(id: ID!): Voiceover
    updateVoiceover(id: ID!, audioUrl: String!): Voiceover
    addPayment(userId: ID!, amount: Int!): Payment
    addCollaborator(videoId: ID!, email: String!): Collaboration
    deleteCollaborator(id: ID!): Collaboration
    addAnalytics(videoId: ID!, views: Int!, likes: Int!, dislikes: Int!): Analytics
    updateAnalytics(id: ID!, views: Int!, likes: Int!, dislikes: Int!): Analytics
    uploadVideo(file: String!): Video
    transcribeAudio(audioUrl: String!, languageCode: String!): String
  }

`;

module.exports = typeDefs;