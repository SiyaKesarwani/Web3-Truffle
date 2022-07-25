require("dotenv").config();
const Web3 = require('web3');
const url = process.env.INFURA_API_URL;
const addressFrom = '0xb223EACc07D4043A14B22b6a3BF9920EF4d3Db67';
const addressTo = '0x9cC16250e83ebEf01EC56cfBA9C440C3C3dC56f5';
const web3 = new Web3(url);
// Balance call
const balances = async () => {
    const balanceFrom = web3.utils.fromWei(
       await web3.eth.getBalance(addressFrom),'ether');
    const balanceTo = await web3.utils.fromWei(
       await web3.eth.getBalance(addressTo),'ether');
 
    console.log(`The balance of ${addressFrom} is: ${balanceFrom} ETH.`);
    console.log(`The balance of ${addressTo} is: ${balanceTo} ETH.`);
 };
 
 balances();

 