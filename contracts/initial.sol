// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract initial{
    string public message = "Hello Siya";

    function setMessage(string memory _newMessage) external {
        message = _newMessage;
    }
}