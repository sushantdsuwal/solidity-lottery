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
        '*': ['abi', 'evm.bytecode'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
var outputContracts = output.contracts['Lottery.sol']['Lottery'];

module.exports.abi = outputContracts.abi;
module.exports.bytecode = outputContracts.evm.bytecode.object;
