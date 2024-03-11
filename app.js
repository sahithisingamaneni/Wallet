// Import the 'dotenv' library
console.log("hgsgujr")
require('dotenv').config();
console.log("dkojjio")
// Access the environmental variable
const apiKey = process.env.API_KEY;

// Check if the API key is defined
if (!apiKey) {
  console.error("API key is not defined in the .env file.");
  process.exit(1); // Exit with an error code
}

// Log the API key to the console
console.log("API_KEY:", apiKey);
