// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Lottery {
   address public manager;
   address[] public players;

    constructor() {
        // (manager:: originally created by contract)
        manager = msg.sender;
    }

    function enterPlayer() public payable {
        // validation if ture go to next line
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function random() private view returns(uint) {
        // generate sha3 encrypted random number
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);

        // reset lottery [dynamic array](with size of zero :: empty array)
        players = new address[](0);
    }

    // function modifier
    modifier restricted(){
        // validation (winner can be only pick by manager)
        require(msg.sender == manager);
        _;
    }


    function getPlayers() public view returns (address[] memory) {
        return players;
    }

}
