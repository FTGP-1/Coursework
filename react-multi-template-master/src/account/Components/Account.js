import React from "react";
import './bootstrapcustom.css';
import './style.css';
import { ethers } from "ethers";
import blockies from "ethereum-blockies";
import MetaTags from 'react-meta-tags';
import mongoose from "mongoose";
import * as connect from "./connect";
// import { postData } from "./connect";

// const mongoose = require('mongoose');

export default function Account(){
    var login_status = 0;
    var account;
    var btns=document.getElementsByClassName("edit_border");
	var texts = document.getElementsByTagName("textarea");
    var company_name = "Bun";


    window.onload = async function(){
        try{
            // const create = require('../../controllers/investee_ctrl');
            let account_now = await window.ethereum.selectedAddress;
            // UpdateProgress();
            // console.log(account_now)
            // var data = {
            //     "companyName": "Bunny-1",
            //     "legalPerson": "Xiaoyi-1",
            //     "account": "0xa7A4Da3D6D518DDB359298383635B635A02f4906",
            //     "profile":"This is xiaoyi's company",
            //     "progress":"This is first time to post",
            //     "fulfilled":"false"
            // };
            // var url = "http://localhost:8080/api/investees";
            // connect.postData(url, data);

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
                document.getElementById('companyName').innerHTML = company_name;

            }
        }catch(e){
        }
        for(var a = 0;a< btns.length;a++){
            var $ = require( "jquery" );
			btns[a].index = a;
			$(btns[a]).click(function() {
				if($(this).text() == 'Edit') {
					$(this).text('Save');
					$(this).addClass("edit_bordered").siblings().attr("disabled", false).addClass('edit_contained').text('');
				}else {
					$(this).text('Edit');
					$(this).removeClass("edit_bordered").siblings().attr("disabled", true).removeClass('edit_contained');
				}
			})
		}
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
            <MetaTags>
                <title>Investor</title>
                <meta charset="UTF-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </MetaTags>
            <body>
            <nav class="navbar navbar-expand-lg bg-dark navbar-dark"> 
                <div class="container">
                    <a href="homepage.html" class="navbar-brand" id="companyName"> companyName </a>
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
                                    <div class="text-center">
                                        <textarea  class="edit_contain" placeholder="Please enter progress" disabled="disabled" id="texta"></textarea>
                                        <button class="edit_border">Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        </body>
        </React.Fragment>
    );
    
}
