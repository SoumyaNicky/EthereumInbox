//npm install --save mocha ganache-cli web3@1.0.0-beta.26

const assert = require('assert'); //used for assertion checking whether 2 things are equal
const ganache = require('ganache-cli'); //Local ethereum test network

const Web3 = require('web3'); //constructor function is written in captital - like class
const web3 = new Web3(ganache.provider()); //instance of class web3

const {interface, bytecode} = require('../compile');

//Contract test code

let accounts;
let inbox;

const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts(); 
  //Every function of web3 is asynchronous in nature - returns promises

  //Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [INITIAL_STRING]})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    //console.log(inbox);
    assert.ok(inbox.options.address);    //ok: if some value, true, else problem
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING); //calling function in contracts
  });

  it('can change the message', async () => {
     await inbox.methods.setMessage('bye').send({from: accounts[0]}); //sending a transaction to a function in contracts, ie, editing the contract's data
     //uses money and returns transaction hash

     const message = await inbox.methods.message().call(); //call funct again to check wheter update is done or not
     assert.equal(message, 'bye');
  });
});

/*Example test code 2: 

beforeEach(() => {
  //Get a list of all accounts
  web3.eth.getAccounts().then(fetchedAccounts => {
    console.log(fetchedAccounts);
  });  
  //Every function of web3 is asynchronous in nature - returns promises

  //Use one of those accounts to deploy the contract
});

describe('Inbox', () => {
  it('deploys a contract', () => {});
});
*/

/*Example test code 1:

class Car{
  park(){
    return 'stopped';
  }

  drive(){
    return 'vroom';
  }
}

//()=>{} is called arrow function

let car; //undefined value to car assigned globally in code

beforeEach(() => {
  car = new Car();
});

describe('Car or any random string', () => {
  it('can park', () => {
    //const car = new Car(); //Instead of creating instances everytime, use before each function
    assert.equal(car.park(), 'stopped');
  });

  it('can drive', () => {
    //const car = new Car();
    assert.equal(car.drive(), 'vroom');
  });
});
*/