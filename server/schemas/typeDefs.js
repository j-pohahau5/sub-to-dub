const{ gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!!
    name: String!
    email: String!
    password: String!
  }

  type Video {
    id: ID!
    url: String!
    title: String!
    description: String!
  }

  type Subtitle {
    id: ID!
    videoId: ID!
    language: String!
    text: String!
    translatedText: String
  }

  type Voiceover {
    id: ID!
    videoId: ID!
    language: String!
    audioUrl: String!
  }

  type Language {
    id: ID!
    name: String!
    languageCode: String!
  }

  type Payment {
    id: ID!
    userId: ID!
    amount: Float!
    date: String!
  }

  type Collaboration {
    id: ID!
    userId: ID!
    videoId: ID!
    role: String!
  }

  type Analytics {
    id: ID!
    userId: ID!
    videoId: ID!
    subtitleDownloads: Int!
    voiceoverDownloads: Int!
    feedback: String
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
    createUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    addSubtitle(videoId: ID!, text: String!, languageCode: String!): Subtitle
    deleteSubtitle(id: ID!): Subtitle
    updateSubtitle(id: ID!, text: String!): Subtitle
    translateSubtitle(id: ID!, languageCode: String!): Subtitle
    generateVoiceover(id: ID!, languageCode: String!): Subtitle
    addVoiceover(videoId: ID!, audioUrl: String!, languageCode: String!): Voiceover
    deleteVoiceover(id: ID!): Voiceover
    updateVoiceover(id: ID!, audioUrl: String!): Voiceover
    addPayment(userId: ID!, amount: Float!): Payment
    addCollaborator(videoId: ID!, email: String!): Collaboration
    deleteCollaborator(id: ID!): Collaboration
    addAnalytics(videoId: ID!, views: Int!, likes: Int!, dislikes: Int!): Analytics
    updateAnalytics(id: ID!, views: Int!, likes: Int!, dislikes: Int!): Analytics
    uploadVideo(file: Upload!): Video
    transcribeAudio(audioUrl: String!, languageCode: String!): String
  }

`;

module.exports = typeDefs;