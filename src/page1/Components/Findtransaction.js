import React,{useState,useEffect} from "react";
import "./bootstrapcustom.css";
import {ethers} from "ethers";
import Web3 from "web3";
export default function Findtransaction(){
    function getWeb3Provider() {
        if (!window.web3Provider) {
            if (!window.ethereum) {
                console.error("there is no web3 provider.");
                return null;
            }
            window.web3Provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        }
        return window.web3Provider;
    }
    const ClickHandler = async() => {
        if (getWeb3Provider() === null) {
            console.error('there is no web3 provider.');
            return false;
        }
        try {
            // 获取当前连接的账户地址:
            let account = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            // 获取当前连接的链ID:
            let chainId = await window.ethereum.request({
                method: 'eth_chainId'
            });
            var url = `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${account[0]}&startblock=0&endblock=99999999&sort=asc&apikey=CAE3M7SNGI1WGD6ZYBZGRKXVABSUDQTCKA`;
            var request = new XMLHttpRequest();
            request.open("get",url);
            request.send(null);
            request.onload = function(){
                if(request.status == 200){
                    var json = JSON.parse(request.responseText);
                    var transaction_array = new Array();
                    var Get_money_transaction = new Array();
                    var Pay_money_transaction = new Array();
                    var Company_array = ['0xa7a4da3d6d518ddb359298383635b635a02f4906','0x53798bd0df969c8c7270eb463665a219283fab7f'];
                    
                    transaction_array = json.result;
                    for (var i = 0; i < transaction_array.length; i++){
                        if (Company_array.indexOf(transaction_array[i].from) >= 0){
                            Get_money_transaction.push(transaction_array[i]);
                        }
                        if (Company_array.indexOf(transaction_array[i].to) >= 0){
                            Pay_money_transaction.push(transaction_array[i]);
                        }
                    }
                    for (const v of Get_money_transaction){
                        console.log(`Get ${Web3.utils.fromWei(v.value)} ether from ${v.from}`);
                    }
                    for (const v of Pay_money_transaction){
                        console.log(`Pay ${Web3.utils.fromWei(v.value)} ether to ${v.to}`);
                    }
                }
            }
            return true;
        } catch (e) {
            console.error('could not get a wallet connection.', e);
            return false;
        }
    };

    return(
        <React.Fragment>
            <div className="m-5 text-center">
                <button onClick={ClickHandler} className="btn btn-dark m-3">
                    Transaction
                </button>
            </div>
        </React.Fragment>
    );
}