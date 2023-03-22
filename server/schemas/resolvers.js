const { AuthenticationError } = require("apollo-server-express");
const { User, Subtitle, Analytics, Collaboration, Payment, Language, Video, Voiceover } = require("../models");

const { signToken } = require("../utils/auth");

