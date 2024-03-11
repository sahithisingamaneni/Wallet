const { validateMnemonic } = require("bip39");
const {getAddress} = require("./getAddress");
const {saveWalletData} = require('./saveWalletData');
const { checkForUsed } = require("../blockcypher-apis/checkForUsed");

importWallet = async (wallet, mnemonic) => {
    const result = validateMnemonic(mnemonic);
    if(!result){
        throw new Error("Invalid Mnemonic");
    }
    let used = true;
    let addressIndex = 0;
    while(used){
        const address = getAddress(mnemonic, addressIndex);
        used = await checkForUsed(address);
        console.log('used', used)
        saveWalletData(wallet, mnemonic, address);
        addressIndex ++;
    }
}

module.exports = {importWallet}
