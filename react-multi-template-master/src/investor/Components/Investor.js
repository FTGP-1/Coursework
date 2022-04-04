import React from "react";
import './bootstrapcustom.css';
import './img/user.png';
import './style.css';
import { ethers } from "ethers";
import blockies from "ethereum-blockies";

import api from '../../api';

 //----- xiaoyi----------


async function getAllCompany()
{

    var result  = await api.getAllInvestees();
    console.log(123456);
    console.log(result.data);


    return result.data;

}




 //----- xiaoyi----------

export default function Investor(){
    var login_status = 0;
    var account;
    window.onload = async function(){
        try{
            //----- xiaoyi----------
            getAllCompany().then(data=>{
                console.log(data);
                var companyname_a = data[0].companyName;
                document.getElementById('company_a').innerHTML = companyname_a;
                var profile_a = data[0].profile;
                document.getElementById('companyProfile_a').innerHTML = profile_a;
            });


            //----- xiaoyi----------
            let account_now = await window.ethereum.selectedAddress;
            console.log(account_now)
            if (account_now){
                login_status = 1;
                var icon = blockies.create({ // All options are optional
                    seed: account_now, // seed used to generate icon data, default: random
                    color: '#ffe', // to manually specify the icon color, default: random
                    bgcolor: '#bbb', // choose a different background color, default: random
                    size: 6, // width/height of the icon in blocks, default: 8
                    scale: 3, // width/height of each block in pixels, default: 4
                    spotcolor: '#000' // each pixel has a 13% chance of being of a third color, 
                    // default: random. Set to -1 to disable it. These "spots" create structures
                    // that look like eyes, mouths and noses. 
                });
                document.getElementById('login_status').innerHTML = account_now.substring(0,6)+'...'+account_now.substring(38);
                document.getElementById('login_status').appendChild(icon);
            }
        }catch(e){
        }
    }
    function Click_go_a(){
        var href = "localhost:3000/fund.html?";
        window.location.href = href + "company=a";  
    }
    function Click_go_b(){
        var href = "localhost:3000/fund.html?";
        window.location.href = href + "company=b";  
    }function Click_go_c(){
        var href = "localhost:3000/fund.html?";
        window.location.href = href + "company=c";  
    }

    async function ClickHandler_Fund(){
        if (typeof window.ethereum !== 'undefined') {
            if (login_status == 0){
                alert("Please login first.");
            } else {
                window.location.href="account.html"
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
            var icon = blockies.create({ // All options are optional
                seed: account[0], // seed used to generate icon data, default: random
                color: '#ffe', // to manually specify the icon color, default: random
                bgcolor: '#bbb', // choose a different background color, default: random
                size: 6, // width/height of the icon in blocks, default: 8
                scale: 3, // width/height of each block in pixels, default: 4
                spotcolor: '#000' // each pixel has a 13% chance of being of a third color, 
                // default: random. Set to -1 to disable it. These "spots" create structures
                // that look like eyes, mouths and noses. 
            });
            document.getElementById('login_status').innerHTML = account[0].substring(0,6)+'...'+account[0].substring(38);
            document.getElementById('login_status').appendChild(icon);
        } catch (e) {
            console.error('could not get a wallet connection.', e);
            return false;
        }
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
            <section class="text-center text-light">
                <div class="section-bg" id="sectionbg">
                    <div class="container">
                        <div class="row">
                            <div>
                                <img src={require("./img/user.png")} alt="logo" class="w-10"/>
                            </div>
                            <h3 class="my-1">Logo</h3>
                            <p>
                                This company description
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="p-5">
                <div class="container">
                    <div class="row g-4">
                        <div class="col-md">
                            <div class="card bg-dark text-light">
                                <div class="card-body">
                                    <div class="card-title text-center">
                                        <h3 class="my-4 box" id = 'company_a'>Company A</h3>
                                    </div>
                                    <div class="card-text">
                                        <p class="my-4 mx-4" id = 'companyProfile_a'>
                                         company a description
                                        </p>
                                    </div>
                                    <div class="text-center">
                                        <a class="btn btn-primary" onClick={Click_go_a}>Find out more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="card bg-secondary text-light">
                                <div class="card-body">
                                    <div class="card-title text-center">
                                        <h3 class="my-4 box" id="company_b">Company B</h3>
                                    </div>
                                    <div class="card-text">
                                        <p class="my-4 mx-4">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus eligendi temporibus architecto consequuntur quis dolorum consectetur, delectus iure mollitia! Illum amet sit est magnam numquam, voluptatum at voluptates rem? Nisi.
                                        </p>
                                    </div>
                                    <div class="text-center">
                                        <a class="btn btn-primary" onClick={Click_go_b}>Find out more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="card bg-dark text-light">
                                <div class="card-body">
                                    <div class="card-title text-center">
                                        <h3 class="my-4 box" id="company_c" >Company C</h3>
                                    </div>
                                    <div class="card-text">
                                        <p class="my-4 mx-4">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus eligendi temporibus architecto consequuntur quis dolorum consectetur, delectus iure mollitia! Illum amet sit est magnam numquam, voluptatum at voluptates rem? Nisi.
                                        </p>
                                    </div>
                                    <div class="text-center">
                                        <a class="btn btn-primary" onClick={Click_go_c}>Find out more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        </React.Fragment>
    );
    
}