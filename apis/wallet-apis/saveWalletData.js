const fs = require('fs');
const path = require('path');

const walletFile = path.join(__dirname, '../..', 'wallets.json');

function saveWalletData(wallet, mnemonic, address) {
  // Read existing wallet data (if any)
  let walletData = {};
  try {
    const fileContent = fs.readFileSync(walletFile, 'utf8');
    walletData = JSON.parse(fileContent);
  } catch (err) {
    // Ignore error if file doesn't exist
  }

  // Update data with new wallet
  if(walletData[wallet]){
    console.log(walletData[wallet]["address"])
    walletData[wallet]["address"].push(address)
    console.log(walletData[wallet]["address"])
  } else {
    walletData[wallet] = { name: wallet, mnemonic, address: [address] };
  }

  // Write updated data to the file
  fs.writeFileSync(walletFile, JSON.stringify(walletData, null, 2));
}

module.exports = { saveWalletData };
