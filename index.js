const { Command } = require('commander');

const {createWallet} = require('./apis/wallet-apis/createWallet')
const {importWallet} = require('./apis/wallet-apis/importWallet')
const {listAllWallets} = require('./apis/wallet-apis/listAllWallets')

const {getBalanceOf} = require('./apis/blockcypher-apis/getBalanceOf')
const {getTransactionsOf} = require('./apis/blockcypher-apis/getTransactionsOf')
const {getUnusedBTCAddress} = require('./apis/blockcypher-apis/getUnusedBTCAddress')

const program = new Command();
program.version('1.0.0');
//oclif? ehh

program.command('hello <name>')
    .description('Hello World eqvt!')
    .action(async (name) => {
        console.log(`Hello ${name}!`)
    })

//multiple wallets not taken care of
program.command('create <wallet>')
    .description('Creating a BIP39 Wallet')
    .action(async (wallet) => {
        console.log(`Creating wallet named ${wallet}`)
        createWallet(wallet);
    })

program.command('import <wallet> <mnemonic>')
    .description('Import a BIP39 Wallet using Mnemonic')
    .action(async (wallet, mnemonic) => {
        console.log(`Importing wallet under name ${wallet}`)
        console.log(`Mnemonic entered: ${mnemonic}`)
        importWallet(wallet, mnemonic)
    })

program.command('list')
    .description('List all wallets stored locally')
    .action(() => {
        console.log(`Listing all wallets stored locally`)
        listAllWallets();
    })

program.command('balance-of <wallet>')
    .description('Get Bitcoin balance of a wallet')
    .action(async (wallet) => {
        console.log(`Fetching Balance for wallet: ${wallet}`)
        getBalanceOf(wallet)//works
    })

program.command('get-txs <wallet>')
    .description('Get list of Bitcoin transactions of a wallet')
    .action(async (wallet) => {
        console.log(`Fetching transactions for wallet: ${wallet}`)
        getTransactionsOf(wallet)
    })

program.command('generate-unused-address <wallet>')
    .description('Generate an unused Bitcoin address for a wallet')
    .action(async (wallet) => {
        console.log(`Fetching unused address for mnemonic under wallet: ${wallet}`)
        getUnusedBTCAddress(wallet);
    })
//imp for running the application
program.parse(process.argv)
