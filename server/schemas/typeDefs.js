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
    code: String!
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
    getUser(id: ID!): User
    getVideo(id: ID!): Video
    getSubtitles(videoId: ID!): [Subtitle]
    getVoiceovers(videoId: ID!): [Voiceover]
    getLanguages: [Language]
    getPayments(userId: ID!): [Payment]
    getCollaborators(videoId: ID!): [Collaboration]
    getAnalytics(videoId: ID!): Analytics
  }

  type Mutation {
    registerUser(name: String!, email: String!, password: String!): User
    loginUser(email: String!, password: String!): User
    uploadVideo(userId: ID!, url: String!, title: String!, description: String!): Video
    createSubtitle(videoId: ID!, language: String!, text: String!, translatedText: String): Subtitle
    createVoiceover(videoId: ID!, language: String!, audioUrl: String!): Voiceover
    createLanguage(name: String!, code: String!): Language
    makePayment(userId: ID!, amount: Float!, date: String!): Payment
    addCollaborator(userId: ID!, videoId: ID!, role: String!): Collaboration
    updateAnalytics(userId: ID!, videoId: ID!, subtitleDownloads: Int!, voiceoverDownloads: Int!, feedback: String): Analytics
  }
`;

module.exports = typeDefs;