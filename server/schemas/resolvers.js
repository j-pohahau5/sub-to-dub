const { AuthenticationError } = require("apollo-server-express");
const { User, Subtitle, Analytics, Collaboration, Payment, Language, Video, Voiceover } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user.id }); 
          }
          throw new AuthenticationError("You need to be logged in!");
      },
      getUser: async (parent, { id }) => {
        return User.findOne({ id });
      },
      getUsers: async () => {
        return User.find();  
      },  
      getVideo: async (parent, { id }) => {
        return Video.findOne({ id });
      },
      getSubtitles: async (parent, { videoId }) => {
        return Subtitle.find(videoId);  
      },
      getVoiceovers: async (parent, { videoId }) => {
        return Voiceover.find(videoId);  
      },
      getLanguages: async () => {
        return Language.find();  
      },
      getPayments: async (parent, { userId }) => {
        return Payment.find(userId);  
      },
      getCollaborators: async (parent, { videoId }) => {
        return Collaboration.find(videoId);  
      },
      getAnalytics: async (parent, { videoId }) => {
        return Analytics.find(videoId);  
      },
    },
    Mutation: {
      registerUser: async (parent, { name, email, password }) => {
        const user = await User.create({ name, email, password });
        const token = signToken(user);
        return { token, user };
      },
  
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError("No user found with this email address");
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }
        const token = signToken(user);
        return { token, user };
      },
    },
  };
  
  module.exports = resolvers;
  