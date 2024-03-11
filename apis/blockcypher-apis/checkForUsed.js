async function checkForUsed(address){
    const apiKey = process.env.BLOCKCYPHER_API_KEY;
    const apiUrl = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full`;

    const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            Authorization: `Token ${apiKey}`,
        },
    });
    if(!res.ok) throw new Error('error fetching btc txs')

    const json = await res.json();

    const transactions = json.txs || [];
    //true means its used, false means unused
    return transactions.length!==0;

}

module.exports = { checkForUsed }