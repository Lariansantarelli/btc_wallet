// Importando as dependências
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Definir a rede
// Para testnet use 'bitcoin.networks.testnet', para mainnet use 'bitcoin.networks.bitcoin'
const network = bitcoin.networks.testnet; // ou bitcoin.networks.bitcoin para mainnet

// Caminho da derivação
// Para mainnet use `m/49'/0'/0'/0`
const path = `m/49'/1'/0'/0`;

// Criar as palavras mnemônicas para a seed
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Criar a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

// Criar uma conta - par de chave pública e privada
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

// Gerar o endereço e chave privada
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

console.log("Carteira gerada");
console.log("Endereço: ", btcAddress);
console.log("Chave privada:", node.toWIF());
console.log("Seed:", mnemonic);