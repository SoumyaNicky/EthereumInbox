//npm install solc@0.4.25
//solc version 0.4.25 newer version has assertion error
//https://stackoverflow.com/questions/53353167/npm-solc-assertionerror-err-assertion-invalid-callback-specified

//In admin run:- npm install --global --production windows-build-tools
//If it doesnot work, use:- npm cache clean --force

const path = require('path');
const fs = require('fs');
const solc = require('solc')

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

//console.log(solc.compile(source, 1));

module.exports = solc.compile(source, 1).contracts[':Inbox'];
