const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'mind seven marine strategy fresh believe enjoy vendor special enroll armor conduct',
    'https://rinkeby.infura.io/v3/c59abafe89524956a3c2008519de291e' //url of network to be connected (infura)
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hi there!']})
        .send({from: accounts[0], gas: '1000000'});
    
    console.log('Contract is deployed to', result.options.address);
    
};

deploy();