//dotenv var set from terminal, later change to dotenv path, ƒacing path issue
const { validateMnemonic } = require('bip39');
const { getAddress } = require('../wallet-apis/getAddress');
const { getWalletData } = require('../wallet-apis/getWalletData');
const { checkForUsed } = require('./checkForUsed');

async function getBalanceOfAddress(address) {
    const apiKey = process.env.BLOCKCYPHER_API_KEY
    try {
        const apiUrl = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`;
   
        const res = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Token ${apiKey}`,
            },
        });
        if(!res.ok) throw new Error('error fetching btc balance')
        const json = await res.json();
        const balance = json.balance / 100000000;
        console.log(`Balance of ${address}:`, balance)
        return balance
    } catch (error) {
        throw error
    }
    
}

async function getBalanceOf(wallet) {
    const walletData = getWalletData(wallet);
    const mnemonic = walletData.mnemonic;
    let totalBalance = 0;
    const valid = validateMnemonic(mnemonic)//not really necessary
    if(!valid) throw new Error("Invalid Mnemonic");
    let used = true
    let addressIndex = 0;
    while(used){
        const address = getAddress(mnemonic, addressIndex);
        const balanceAddr = await getBalanceOfAddress(address);
        used = (balanceAddr === 0)? false : true;
        totalBalance+=balanceAddr;
        addressIndex++;
    }
    console.log(`Total Balance is: `, totalBalance);

}

module.exports = { getBalanceOf };
