require("dotenv").config();
const Web3 = require('web3');
const url = process.env.INFURA_API_URL;
const addressFrom = '0xb223EACc07D4043A14B22b6a3BF9920EF4d3Db67';
const addressTo = '0x9cC16250e83ebEf01EC56cfBA9C440C3C3dC56f5';
const privKey = process.env.PRIVATE_KEY;
const web3 = new Web3(url);

// Deploy transaction
const deploy = async() => {
    console.log(`Attempting to transfer 0.01 ETH from ${addressFrom} to ${addressTo} account.`);
    const createTransaction = await web3.eth.accounts.signTransaction(
        {
            from : addressFrom,
            to : addressTo,
            value : web3.utils.toWei('0.01', 'ether'),
            gas : '21000',
        },
        privKey
    );

    const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
    );
    console.log(`Transaction is succesfull with Transaction Hash : ${createReceipt.transactionHash}`);
};

deploy();