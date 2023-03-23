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
        const subtitle = await Subtitle.create({
          videoId,
          language,
          text,
          translatedText
        })
        return subtitle;
      },
    
      createVoiceover: async (parent, { videoId, language, audioUrl }) => {
        const voiceover = await Voiceover.create({
          videoId,
          language,
          audioUrl
        })
        return voiceover;
      },
    
      createLanguage: async (parent, { name, code }) => {
        const language = await Language.create({
          name,
          code
        })
        return language;
      },
    
      makePayment: async (parent, { userId, amount, date }) => {
        const payment = await Payment.create({
          userId,
          amount,
          date
        })
        return payment;
      },
    
      addCollaborator: async (parent, { userId, videoId, role }) => {
        const collaboration = await Collaboration.create({
          userId,
          videoId,
          role
        })
        return collaboration;
      },
    
      updateAnalytics: async (parent, { userId, videoId, subtitleDownloads, voiceoverDownloads, feedback }) => {
        const analytics = await Analytics.findOneAndUpdate(
          { userId, videoId },
          { $set: { subtitleDownloads, voiceoverDownloads, feedback } },
          { new: true, upsert: true }
        )
        return analytics;
      }
    
    },
  };
  
  module.exports = resolvers;
  