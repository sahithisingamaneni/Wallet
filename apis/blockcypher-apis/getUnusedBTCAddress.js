const {getAddress} = require("../wallet-apis/getAddress");
const { getWalletData } = require("../wallet-apis/getWalletData");
const {checkForUsed} = require("./checkForUsed")

async function getUnusedBTCAddress(wallet) {

    const walletData = getWalletData(wallet);
    const mnemonic = walletData.mnemonic;

    let addressIndex = 0;
    let unusedAddress = null;

    while (!unusedAddress) {

        const address = getAddress(mnemonic, addressIndex);

        const usedBoolean = await checkForUsed(address);

        if(!usedBoolean) {
            unusedAddress = address;
        }
        addressIndex++;
    }

    console.log('Address for the first unused address going in order of derivation path is')
    console.log(unusedAddress)

    return unusedAddress;
}

module.exports = { getUnusedBTCAddress }