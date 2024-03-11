const fs = require('fs');
const path = require('path');

const walletFile = path.join(__dirname, '../..', 'wallets.json');

function getWalletData(wallet) {
  // Read existing wallet data (if any)
  let walletData = {};
  try {
    const fileContent = fs.readFileSync(walletFile, 'utf8');
    walletData = JSON.parse(fileContent);
  } catch (err) {
    // Ignore error if file doesn't exist
  }
  if(!walletData[wallet]) throw new Error('wallet not in storage');
  return walletData[wallet]
  //send error if it doesnt exist
}

module.exports = { getWalletData };
