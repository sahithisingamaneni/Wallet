const bip39 = require('bip39');
const {getAddress} = require("./getAddress");
const {saveWalletData} = require("./saveWalletData");

createWallet = async (wallet) => {
    if (wallet === '' ) throw new Error("Wallet name cant be empty!");
    else {
        const mnemonic = bip39.generateMnemonic();
        const valid = bip39.validateMnemonic(mnemonic);
        if(!valid) throw new Error("Invalid mnemonic generated")
        const address = getAddress(mnemonic);
        saveWalletData(wallet, mnemonic, address); 
        console.log('Successfully created and saved wallet')
    }
};

module.exports = {createWallet}
