const path = require('path');
const fs = require('fs');
var solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
let source = fs.readFileSync(lotteryPath, 'utf8');

var input = {
  language: 'Solidity',
  sources: {
    'Lottery.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
var outputContracts = output.contracts['Lottery.sol']['Lottery'];
// exports ABI interface
module.exports.abi = outputContracts.abi;

// exports bytecode from smart contract
module.exports.bytecode = outputContracts.evm.bytecode.object;

// const interface = output.contracts['Lottery.sol'].Lottery.abi;
// const bytecode = output.contracts['Lottery.sol'].Lottery.evm.bytecode.object;

// module.exports = {
//   interface,
//   bytecode,
// };
