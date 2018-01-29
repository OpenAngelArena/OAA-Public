'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:3000',
  SESSION_SECRET: 'oaa-secret',

  STEAM_API_KEY: '',
  BOTTLEPASS_SERVER_URI: 'http://chrisinajar.com:6969',
  // Control debug level for modules using visionmedia/debug
  DEBUG: '',
  MONGODB_TEST_URI: 'mongodb://localhost/oaa-dev'
};
