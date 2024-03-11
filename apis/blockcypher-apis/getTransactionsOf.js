const { getAddress } = require('../wallet-apis/getAddress');
const { getWalletData } = require('../wallet-apis/getWalletData');

async function getTransactionsOfAddress(address){
    const apiKey = process.env.BLOCKCYPHER_API_KEY;
    try {
        console.log(`With address: ${address} ...`);

        const apiUrl = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full`;

        const res = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Token ${apiKey}`,
            },
        });
        if(!res.ok) throw new Error('error fetching btc txs')
        const json = await res.json()
        const txs = json.txs || [];

        const transactions = txs.map((tx) => ({
            blockHash: tx.block_hash,
            date: new Date(tx.confirmed || tx.received),
            involvedBTC: tx.outputs[0].value / 100000000, // Convert from Satoshis to BTC
            confirmations: tx.confirmations || 0,
        }));

        console.log(transactions.slice(0,10))

        return transactions;
        
    } catch (error) {
        console.error('Error fetching recent transactions:', error.message);
        throw error;
    }
}

async function getTransactionsOf(wallet) {
    const walletData = await getWalletData(wallet);
    const mnemonic = walletData.mnemonic;
    let used = true;
    let addressIndex = 0;
    while(used){
        const address = getAddress(mnemonic, addressIndex);
        const transactions = await getTransactionsOfAddress(address);
        const length = transactions.length;
        used = length===0? false: true;
        addressIndex++;
    }

}

module.exports = { getTransactionsOf };