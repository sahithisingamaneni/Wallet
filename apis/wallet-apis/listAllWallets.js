const fs = require('fs');
const path = require('path');

const walletFile = path.join(__dirname, '../..', 'wallets.json');

function listAllWallets() {
  // Read existing wallet data (if any)
  let walletData = {};
  try {
    const fileContent = fs.readFileSync(walletFile, 'utf8');
    walletData = JSON.parse(fileContent);
    const wallets = Object.keys(walletData);
    wallets.forEach(wallet => {
        console.log(`Wallet ${wallet}: `, walletData[wallet])
    });
    return walletData;
  } catch (err) {
    // Ignore error if file doesn't exist
  }
}

module.exports = { listAllWallets };
