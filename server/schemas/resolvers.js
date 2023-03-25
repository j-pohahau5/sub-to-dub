const { AuthenticationError } = require("apollo-server-express");
const { User, Subtitle, Analytics, Collaboration, Payment, Language, Video, Voiceover } = require("../models");

const { signToken } = require("../utils/auth");
const axios = require('axios');
const { Storage } = require('@google-cloud/storage');
const speech = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech');
const { Translate } = require('@google-cloud/translate').v2;

const cloudinary = require('cloudinary').v2;

// Instantiate the Google Cloud Storage client with your project ID and credentials
const storage = new Storage({
  projectId: 'your-project-id',
  keyFilename: '/path/to/your/keyfile.json'
});

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret'
});

// Instantiate the Google Cloud Speech-to-Text client with your project ID and credentials
const speechClient = new speech.SpeechClient({
  projectId: 'your-project-id',
  keyFilename: '/path/to/your/keyfile.json'
});

// Instantiate the Google Cloud Text-to-Speech client with your project ID and credentials
const ttsClient = new textToSpeech.TextToSpeechClient({
  projectId: 'your-project-id',
  keyFilename: '/path/to/your/keyfile.json'
});

// Instantiate the Google Cloud Translate client with your project ID and credentials
const translateClient = new Translate({
  projectId: 'your-project-id',
  keyFilename: '/path/to/your/keyfile.json'
});

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
    addSubtitle: async (parent, { videoId, text, languageCode }) => {
      const subtitle = await Subtitle.create({ videoId, text, languageCode });
      return subtitle;
    },
    deleteSubtitle: async (parent, { id }) => {
      const subtitle = await Subtitle.findByIdAndDelete(id);
      return subtitle;
    },
    updateSubtitle: async (parent, { id, text }) => {
      const subtitle = await Subtitle.findByIdAndUpdate(id, { text }, { new: true });
      return subtitle;
    },
    addVoiceover: async (parent, { videoId, audioUrl, languageCode }) => {
      const voiceover = await Voiceover.create({ videoId, audioUrl, languageCode });
      return voiceover;
    },
    deleteVoiceover: async (parent, { id }) => {
      const voiceover = await Voiceover.findByIdAndDelete(id);
      return voiceover;
    },
    updateVoiceover: async (parent, { id, audioUrl }) => {
      const voiceover = await Voiceover.findByIdAndUpdate(id, { audioUrl }, { new: true });
      return voiceover;
    },
    addPayment: async (parent, { userId, amount }) => {
      const payment = await Payment.create({ userId, amount });
      return payment;
    },
    addCollaborator: async (parent, { videoId, email }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("No user found with this email address");
      }
      const collaboration = await Collaboration.create({ videoId, userId: user.id });
      return collaboration;
    },
    deleteCollaborator: async (parent, { id }) => {
      const collaboration = await Collaboration.findByIdAndDelete(id);
      return collaboration;
    },
    addAnalytics: async (parent, { videoId, views, likes, dislikes }) => {
      const analytics = await Analytics.create({ videoId, views, likes, dislikes });
      return analytics;
    },
    updateAnalytics: async (parent, { id, views, likes, dislikes }) => {
       const analytics = await Analytics.findByIdAndUpdate(id, { views, likes, dislikes }, { new: true });
      return analytics;
    },
    uploadVideo: async (parent, { file }) => {
      // Upload video to Cloudinary and get the video URL
      const { secure_url: videoUrl } = await cloudinary.uploader.upload(file, { resource_type: "video" });
      // Create a new Video document with the video URL
      const video = await Video.create({ url: videoUrl });
      return video;
    },
    transcribeAudio: async (parent, { audioUrl, languageCode }) => {
      // Get the audio file from the given URL
      const audioResponse = await axios.get(audioUrl, { responseType: 'arraybuffer' });
      const audioContent = audioResponse.data;
      // Transcribe the audio using Google Cloud Speech-to-Text
      const audio = {
        content: audioContent,
      };
      const config = {
        languageCode,
      };
      const [response] = await speechClient.recognize({ audio, config });
      const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
      return transcription;
    },
    translateSubtitle: async (parent, { id, languageCode }) => {
      try {
        const subtitle = await Subtitle.findById(id);
        const translateTo = languageCode || subtitle.languageCode;
        // Instantiate the Google Cloud Translate client
        // const translateClient = new Translate();
        // Translate the text of the subtitle to the target language
        const [translation] = await translateClient.translate(subtitle.text, translateTo);
          // Update the subtitle with the translated text
        const updatedSubtitle = await Subtitle.findByIdAndUpdate(
          id,
          { text: translation, languageCode: translateTo },
          { new: true }
        );
        return updatedSubtitle;
      } catch (err) {
        console.log(err);
        throw new Error("Failed to translate subtitle");
      }
    },
    generateVoiceover: async (parent, { id, languageCode }) => {
      try {
        const subtitle = await Subtitle.findById(id);
        const voiceName = languageCode || 'en-US';
        // Instantiate the Google Cloud Text-to-Speech client
        // const ttsClient = new TextToSpeechClient();
        // Construct the request for the text-to-speech API
        const request = {
          input: { text: subtitle.text },
           voice: { languageCode: voiceName, ssmlGender: 'FEMALE' },
           audioConfig: { audioEncoding: 'MP3' },
        };
        // Call the text-to-speech API to generate the voiceover audio file
        const [response] = await ttsClient.synthesizeSpeech(request);
        // Upload the voiceover audio file to Cloud Storage
        const bucket = storage.bucket('your-bucket-name');
        const filename = `voiceovers/${subtitle.videoId}/${subtitle._id}.mp3`;
        const file = bucket.file(filename);
        const stream = file.createWriteStream({ resumable: false });
        response.audioContent.pipe(stream);
        return subtitle;
      } catch (err) {
          console.log(err);
          throw new Error("Failed to generate voiceover");
      }
    },
    synthesizeSpeech: async (parent, { text, languageCode }) => {
    // Synthesize speech using Google Cloud Text-to-Speech
      const request = {
        input: { text },
        voice: { languageCode },
        audioConfig: { audioEncoding}
      }
    }   
  }
};
    
module.exports = resolvers;