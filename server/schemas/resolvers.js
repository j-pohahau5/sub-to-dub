const { AuthenticationError } = require("apollo-server-express");
const { User, Subtitle, Analytics, Collaboration, Payment, Language, Video, Voiceover } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ id: context.user.id }); 
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
      uploadVideo: async (parent, { userId, url, title, description }, context) => {
        if (context.user) {
          const video = await Video.create({
            url,
            title,
            description,
          })
          await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { videos: video._id } }
          );
          return video;
        }
        throw new AuthenticationError("You need to be logged in!");
      },
    
      createSubtitle: async (parent, { videoId, language, text, translatedText }) => {
        if (context.user) {
          const subtitle = await Subtitle.create({
            videoId,
            language,
            text,
            translatedText
          })
          return subtitle;  
        }
        throw new AuthenticationError("You need to be logged in!");
      },
    
      createVoiceover: async (parent, { videoId, language, audioUrl }) => {
        if (context.user) {
          const voiceover = await Voiceover.create({
            videoId,
            language,
            audioUrl
          })
          return voiceover;  
        }
        throw new AuthenticationError("You need to be logged in!");
      },
    
      createLanguage: async (parent, { name, languageCode }) => {
        if (context.user) {
          const language = await Language.create({
            name,
            languageCode
          })
          return language; 
        }
        throw new AuthenticationError("You need to be logged in!");
        
      },
    
      makePayment: async (parent, { userId, amount, date }) => {
        if (context.user) {
          const payment = await Payment.create({
            userId,
            amount,
            date
          })
        return payment; 
        }
        throw new AuthenticationError("You need to be logged in!");
        
      },
    
      addCollaborator: async (parent, { userId, videoId, role }) => {
        if (context.user) {
          const collaboration = await Collaboration.create({
            userId,
            videoId,
            role
          })
          return collaboration;   
        }
        throw new AuthenticationError("You need to be logged in!");
        
      },
    
      updateAnalytics: async (parent, { userId, videoId, subtitleDownloads, voiceoverDownloads, feedback }) => {
        if (context.user) {
          const analytics = await Analytics.findOneAndUpdate(
            { userId, videoId },
            { $set: { subtitleDownloads, voiceoverDownloads, feedback } },
            { new: true, upsert: true }
          )
          return analytics;
        }
        throw new AuthenticationError("You need to be logged in!");
        
      }
    
    },
  };
  
  module.exports = resolvers;
  