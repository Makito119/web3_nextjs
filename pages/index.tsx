import type { NextPage } from 'next';
import Web3 from 'web3';
import { useState } from 'react';
import { AbiItem } from 'web3-utils';
import ZCContract from '../build/contracts/ZenCoin.json';
import { ZennCoin } from '../types/abi/ZennCoin';
import { timeStamp } from 'console';

// プロバイダの設定
const web3 = new Web3(new Web3.providers.HttpProvider(`http://127.0.0.1:7545`));

// コントラクトのアドレス
const address = '0x364772F050102B69A978cBC96bb9e301F235DF66';

const ABI = ZCContract.abi as any as AbiItem;
// コントラクトのインスタンス
const contract = new web3.eth.Contract(ABI, address) as unknown as ZennCoin;

const walletAddressUserA = '0x250700cB78F2f91009751E11c1816c380499fde0';
const walletAddressUserB = '0x813B181533b8d47b9AfEf0D875EF8457E61ae638';
const contractFromB = new web3.eth.Contract(ABI, address, { from: walletAddressUserB }) as unknown as ZennCoin;
const contractFromA = new web3.eth.Contract(ABI, address, { from: walletAddressUserA }) as unknown as ZennCoin;
const events = contract.getPastEvents('Transfer', {
  fromBlock: 0,
  toBlock: 'latest',
  filter: { to: [walletAddressUserA] },
});
//const test = web3.eth.getBlock(27).then(console.log);
let time = null;
const test1 = web3.eth.getBlock(25, async (error, block) => {
  console.log(block);
  time =  block.timestamp;
  console.log(new Date(Number(time)*1000))
});
var date = new Date(1660722838);

var s = new Date(1660722838*1000).toLocaleDateString("en-US");
console.log(11,time,date,s);
const Home: NextPage = () => {
  const [balanceTransactionA, setBalanceTransactionA] = useState();
  const [balanceZcUserA, setBalanceZcUserA] = useState(''); // ZennCoin残高 UserA
  const [balanceEthUserA, setBalanceEthUserA] = useState(''); // ETH残高 UserA
  const [balanceZcUserB, setBalanceZcUserB] = useState(''); // ZennCoin残高 UserB
  const [balanceEthUserB, setBalanceEthUserB] = useState(''); // ETH残高 UserB
  const getBalance = async (userType: string) => {
    if (userType === 'a') {
      setBalanceZcUserA(await contract.methods.balanceOf(walletAddressUserA).call());
      setBalanceEthUserA(await web3.eth.getBalance(walletAddressUserA));
    } else if (userType === 'b') {
      setBalanceZcUserB(await contract.methods.balanceOf(walletAddressUserB).call());
      setBalanceEthUserB(await web3.eth.getBalance(walletAddressUserB));
    }
  };
  console.log(events);
  // const getTransaction = async () => {
  //   setBalanceTransactionA(await web3.eth.getTransaction(walletAddressUserA[,]);
  // };
  // var a =null;
  // var receipt= await web3.eth.getTransactionReceipt(walletAddressUserA);
  // console.log(receipt,1);
  const transferZennCoin = async () => {
    await contractFromA.methods.transfer(walletAddressUserB, 1000).send();
  };
  const transferZennCoin1 = async () => {
    await contractFromB.methods.transfer(walletAddressUserA, 1000).send();
  };

  return (
    <div className="m-5">
      <h2>UserA Info</h2>
      <div>a</div>
      {balanceZcUserA ? (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ZennCoin Balance</th>
              <th className="px-4 py-2">ETH Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{balanceZcUserA}</td>
              <td className="border px-4 py-2">{balanceEthUserA}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>「UserA 残高を取得」を押してください</div>
      )}
      <h2>UserB Info</h2>
      {balanceZcUserB ? (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ZennCoin Balance</th>
              <th className="px-4 py-2">ETH Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{balanceZcUserB}</td>
              <td className="border px-4 py-2">{balanceEthUserB}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>「UserB 残高を取得」を押してください</div>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => getBalance('a')}>
        UserA 残高を取得
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-5"
        onClick={() => getBalance('b')}>
        UserB 残高を取得
      </button>
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 m-1 rounded ml-5"
        onClick={transferZennCoin}>
        Transfer ZennCoin From A To B
      </button>
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 m-1 rounded ml-5"
        onClick={transferZennCoin1}>
        Transfer ZennCoin From B To A
      </button>
    </div>
  );
};

export default Home;
