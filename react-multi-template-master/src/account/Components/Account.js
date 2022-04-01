import React from "react";
import './bootstrapcustom.css';
import './style.css';
import { ethers } from "ethers";
import $ from 'jquery';
import click from 'jquery';

export default function Account(){
    var login_status = 0;
    var account;
    window.onload = async function(){
        try{
            let account_now = await window.ethereum.selectedAddress;
            console.log(account_now)
            if (account_now){
                login_status = 1;
                document.getElementById('login_status').innerHTML = account_now.substring(0,6)+'...'+account_now.substring(38);
            }
        }catch(e){
        }
    }
    async function ClickHandler_Fund(){
        if (typeof window.ethereum !== 'undefined') {
            if (login_status == 0){
                alert("Please login first.");
            } else {
                window.location.href="fund.html"
            }
        }else{
            alert("Please install MetaMask!");
        }
    }
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
    async function Login(){
        if (getWeb3Provider() === null) {
            console.error('there is no web3 provider.');
            return false;
        }
        try {
            // 获取当前连接的账户地址:
            account = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            // 获取当前连接的链ID:
            let chainId = await window.ethereum.request({
                method: 'eth_chainId'
            });
            alert(account[0]);
            login_status = 1;
            document.getElementById('login_status').innerHTML = account[0].substring(0,6)+'...'+account[0].substring(38);
        } catch (e) {
            console.error('could not get a wallet connection.', e);
            return false;
        }
    }
    function changeContent(){
        var o = document.getElementById("content");
        var c = o.innerHTML;
        o.innerHTML = "<input type='text' value='" + c + "'/>"
       }
    return (
        <React.Fragment>
            <title>Investor</title>
            <nav class="navbar navbar-expand-lg bg-dark navbar-dark"> 
                <div class="container">
                    <a href="homepage.html" class="navbar-brand">Company's name</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                        Menu
                    </button>
                    <div class="collapse navbar-collapse" id="navmenu">
                        <ul class="navbar-nav ms-auto"> 
                            <li class="nav-item"><a href="investor.html" class="nav-link">Invest</a></li>
                            <li class="nav-item" onClick={ClickHandler_Fund}><a class="nav-link">Fundraise</a></li>
                            <li class="nav-item" onClick={Login}><a class="nav-link" id="login_status">Login</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="section-bg-2 text-light text-center text-sm-start">
                <div class="container">
                    <div class="row g-5">
                        <div class="col-lg-6">
                            
                            <div class="center">
                                <img src={require("./img/piechart.png")} alt="statistics" class="carousel-inner img-responsive img-roundede"/>
                            </div>
                            <p class="mt-4"> 
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus optio libero aliquid? Laborum quidem autem corporis officia possimus magnam ipsa minima mollitia, dolor reiciendis architecto, quod ea modi consequuntur voluptas.
                            </p>
                        </div>
                        <div class="col-lg-6">
                            
                            <div class="d-flex align-items-center bg-light text-dark mb-4">
                                <img src={require("./img/money.png")} alt="statistics" class="imgsize my-4"/>
                                <h3 class="mx-4 my-2">Ticker's name</h3>
                            </div>
                            <div class="card bg-light text-dark">
                                <div class="card-body">
                                    <h5 class="card-title">Progress</h5>
                                    <span id="content">Progress</span>
                                    <div class="text-end">
                                        <input id="changeContent" type="button" value="Edit" onClick={changeContent()}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        </React.Fragment>
    );
    
}