import React,{useState,useEffect} from "react";
import "./bootstrapcustom.css";
import {ethers} from "ethers";


export default function UnderstandingMetamask(){
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
    const ClickHandlerYes = async() => {
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
            alert("account address: " + account);
            return true;
        } catch (e) {
            console.error('could not get a wallet connection.', e);
            return false;
        }
    };
    return (
        <React.Fragment>
            <div className="mb-5 text-center">
                <h3 className="fs-1">
                    <span style={{color:"red"}}>
                        {" "}
                        Do you want to connect to Metamask?{" "}
                    </span>
                </h3>
                <div className="m-5 text-center">
                    <button onClick={ClickHandlerYes} className="btn btn-dark m-3">
                        Connect
                    </button>
                </div>
                <div className="m-5 text-center">
                    <a href="page2.html">Click me to page 2</a>
                </div>
            </div>
        </React.Fragment>
    );
}