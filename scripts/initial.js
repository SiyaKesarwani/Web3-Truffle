require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const provider = new HDWalletProvider(
    process.env.MNEMONIC_PHRASE,
    process.env.INFURA_API_URL
);
solc = require("solc");
fs = require("fs");
const Web3 = require("web3");
const web3 = new Web3(provider);
file = fs.readFileSync("contracts/initial.sol").toString();
//console.log(file);

var input = {
    language : "Solidity",
    sources : {
        "contracts/initial.sol" : {
            content : file,
        },
    },
    settings : {
        outputSelection : {
            "*" : {
                "*" : ["*"],
            },
        },
    },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
//console.log("Result : ", output);

ABI = output.contracts['contracts/initial.sol']['initial'].abi;
bytecode = output.contracts['contracts/initial.sol']['initial'].evm.bytecode.object;
//console.log("Bytecode: ", bytecode);
//console.log("ABI: ", ABI);

contract = new web3.eth.Contract(ABI);

const call = async() => {
    await web3.eth.getAccounts().then((accounts) => {
        console.log("All Accounts : ", accounts);  
        mainAccount = accounts[0];
        console.log("Default Account : ", mainAccount);
        contract
        .deploy({ data : bytecode })
        .send({ from : mainAccount, gas : 470000})
        .on("receipt", (receipt) => {
            console.log("Contract Address : ", receipt.contractAddress);
        })
        .then((initialContract) => {
            initialContract.methods.message().call((err, data) => {
                console.log("Initial Data : ", data);
            });
        });
    });
};

call();
