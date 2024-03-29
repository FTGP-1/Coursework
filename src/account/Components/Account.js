import React from "react";
import { Component } from "react";
import Pie from "./piechart.js";
import './bootstrapcustom.css';
import './style.css';
import { ethers } from "ethers";
import { useState,useEffect } from "react";
import blockies from "ethereum-blockies";
import MetaTags from 'react-meta-tags';
import mongoose from "mongoose";
import Web3 from "web3";

import api from '../../api';
import { checkResultErrors } from "ethers/lib/utils";
import { Button, Offcanvas, Table } from 'react-bootstrap';

// ------xiaoyi----------------

async function getCompanyInformation(account_now)
{
    var result  = await api.getInvesteeByAccount(account_now);
    return result.data;

}

async function updateProgress(account_now,new_progress)
{
    // const {account} = account_now;
    var result = await api.updateInvesteeProgressByAccount(account_now,{progress: new_progress});
    return result;
}

async function getAllAccount(){
    var result  = await api.getAllInvestees();
    return result.data
}


 var data0 = {
     "companyName": "MailTech",
     "legalPerson": "Xiaoyi",
     "account": "0xa7a4da3d6d518ddb359298383635b635a02f4906",
     "ico":"0x8c71ed910574ee5705c2929b8186a70613a2268b",
     "tickerName":"bunny_coin",
     "tickerPrice":"10",
     "profile":"MailTech, which uses artificial intelligence, allows consumers to send goods, letters, and returns using only their phone - no postage stamps or printed labels necessary. Scoping experiments with the CEO of Royal Mail and other positions. ",
     "progress":"This is the first time for MailTech to post",
     "fulfilled":"false"
};

 var data1 ={
     "companyName": "ConnectProperty",
     "legalPerson": "Runhang",
     "account": "0x146298d53f1572390a5e7fcf35b314c675b71779",
     "ico": "0x96198dd8a488b5ba4ff04f89845558ee07924d0c",
     "tickerName": "cat_coin",
     "tickerPrice": "15",
     "profile": " ConnectProperty combines the best expertise in the business with cutting-edge technology to make the rental experience smarter, smoother, and more equitable for landlords. Landlords discover renters faster, enjoy better, more consistent service, and pay half the amount with our solution.",
     "progress": "This is the first time for ConnectProperty to post",
     "fulfilled": false,
}

var data2 = {
    "companyName": "Hemp eHome",
    "legalPerson": "Theo",
    "account": "0x37a0799562f07378E88d37702216E017cABE7A69",
    "ico":"0x8c71ed910574ee5705c2929b8186a70613a2268b",
    "tickerName":"bird_coin",
    "tickerPrice":"8",
    "profile":"Hemp eHome mixes technological innovation with nature to prevent climate change and provide local communities with long-term development advantages.",
    "progress":"This is the first time for Hemp eHome to post",
    "fulfilled":"false"
};

async function postNewRecord(payload){
    var result = await api.createInvestee(payload);
    var result_data = result.data;
    console.log('create new record',result_data);
    return result_data;
}



// ------xiaoyi----------------



export default function Account(){
    var login_status = 0;
    var account;
    var btns=document.getElementsByClassName("edit_border");
	var texts = document.getElementsByTagName("textarea");
    var pieChartData = new Array();
 
    let account_now;

    window.onload = async function()
    {
        try{
           
            account_now = await window.ethereum.selectedAddress;
            // console.log(account_now);
            postNewRecord(data0);
	    postNewRecord(data1);
	    postNewRecord(data2);


            getCompanyInformation(account_now).then(data => {
                // console.log(data);
                var companyname = data.companyName;
                document.getElementById('companyName').innerHTML = companyname;
                document.getElementById('progress_textbox').innerHTML = data.progress;
                document.getElementById("company_description").innerHTML = data.profile;
                document.getElementById("ticker_name_box").innerHTML = data.tickerName;
                document.getElementById("ticker_price_box").innerHTML = 'Price: '+data.tickerPrice;

            });
  
           

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
        for(var a = 0;a< btns.length;a++){
            var $ = require( "jquery" );
			btns[a].index = a;
			$(btns[a]).click(function() {
				if($(this).text() == 'Edit') {
					$(this).text('Save');
					$(this).addClass("edit_bordered").siblings().attr("disabled", false).addClass('edit_contained');
				}else {
					$(this).text('Edit');
					$(this).removeClass("edit_bordered").siblings().attr("disabled", true).removeClass('edit_contained');
                    var new_text = $(this).siblings().val();
                    // console.log($(this).siblings().val());//get update value here
                    updateProgress(account_now, new_text).then(data => {
                        if(data && data.status == 200) {
                            alert('Update Successfully');
                        } else {
                            alert('Error!');
                        }
                    })
                    
                    
                   
				}
               
			})
		}

        
  
        // call contract to get the price

        window.web3 = new Web3(window.ethereum);
        var web3 = window.web3;
        var functionSig = web3.eth.abi.encodeFunctionSignature('price()');

        var ICO_now = await getCompanyInformation(account_now).then(data =>{
            console.log(data.ico);
             return data.ico;

        });

        var price = await web3.eth.call({
            to:ICO_now,
            data:functionSig
        });
        var price_wei = parseInt(price);
        console.log(price_wei);



        console.log(ICO_now);
        var url = `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${ICO_now}&startblock=0&endblock=99999999&sort=asc&apikey=CAE3M7SNGI1WGD6ZYBZGRKXVABSUDQTCKA`;
        var request = new XMLHttpRequest();
        request.open("get",url);
        request.send(null);


        request.onload = function(){

            var Company_array=[];



            if(request.status == 200){
                var json = JSON.parse(request.responseText);
                var transaction_array = new Array();
                var Get_money_transaction = new Array();
                console.log(json.result);
                // var Company_array = ['0xa7a4da3d6d518ddb359298383635b635a02f4906','0x146298d53f1572390a5e7fcf35b314c675b71779'];
                transaction_array = json.result;
                let sum = 0;
                for (const v of transaction_array){
                    sum = sum + v.value;
                }
                for (const v of transaction_array){
                    //address
                    let input_address = v.from;
                    // fee
                    let input_fee = v.value;
                    // share
                    let input_share = (v.value/sum).toFixed(4)*100;
                    getCompanyInformation(input_address).then(data => {
                        var input_name = data.companyName;
                        var flag = -1;
                        for (var i = 0; i<pieChartData.length;i++){
                            if (input_name==pieChartData[i].name){
                                flag = i;
                            }
                        }
                        if (parseFloat(input_share) > 0){
                            if (flag == -1){
                                pieChartData.push({value:parseFloat(input_fee)/parseFloat(price_wei),name:input_name});
                            } else{
                                pieChartData[flag].value += parseFloat(input_fee);
                            }
                        }
                        console.log(pieChartData)
                            
                    }).catch(err => {
                        console.log(err);
                    });
                }
          
 

                

                
            }
        }

        console.log(pieChartData);
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



    var timer = null;
    function TableExample(){

        getCompanyInformation(account_now).then(data =>{
            //console.log(data.ico);
            var ICO_now =  data.ico;

      

        var url = `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${ICO_now}&startblock=0&endblock=99999999&sort=asc&apikey=CAE3M7SNGI1WGD6ZYBZGRKXVABSUDQTCKA`;
        var request = new XMLHttpRequest();
        request.open("get",url);
        request.send(null);
        
        var price_wei = 300;

        request.onload = function(){

            var Company_array=[];



            if(request.status == 200){
                var json = JSON.parse(request.responseText);
                var transaction_array = new Array();
                var Get_money_transaction = new Array();


                //------ xiaoyi----------
                    transaction_array = json.result;
                    console.log(transaction_array);
                    let sum = 0;
                    for (const v of transaction_array){
                        sum = sum + v.value;
                    }
                    var $ = require( "jquery" );
                    let tab = document.getElementById("tab_1");
                    console.log(tab);
                    for (const v of transaction_array){
                        //date
                        let date = new Date(parseInt(v.timeStamp) * 1000);
                        let Y = date.getFullYear() + '-';
                        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        let D = date.getDate() + ' ';
                        let h = date.getHours() + ':';
                        let m = date.getMinutes() + ':';
                        let s = date.getSeconds();
                        let input_date = Y+M+D+h+m+s;
                        //address
                        let input_address = v.from;
                        // fee
                        let input_fee = v.value/price_wei;
                        console.log(price_wei);
                        // share
                        let input_share = (v.value/sum)*100;
                        getCompanyInformation(input_address).then(data => {
                            if(input_fee > 0){
                                var input_name = data.companyName;
                                tab.innerHTML+=`<tr><td>${input_date}</td><td>${input_name}</td><td>${input_address}</td><td>${input_fee}</td><td>${input_share}</td></tr>`;
                            }        
                        }).catch(err => {
                            console.log(err);
                        });
                        // tab.innerHTML+=`<tr><td>${input_date}</td><td>Companyname</td><td>${input_address}</td><td>${input_fee}</td><td>${input_share}</td></tr>`;
                    }
                

                

                
            }
        }
    });
        return(
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Date</th>
                <th>Company Name</th>
                <th>Company Address</th>
                <th>Fee</th>
                <th>Share</th>
                </tr>
            </thead>
            <tbody id="tab_1">
            </tbody>
        </Table>
        
        </>
        );

    }
    function OffCanvasExample({ name, ...props }) {
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
      
        return (
          <>
            <Button variant="primary" onClick={handleShow} className="me-2">
              {name}
            </Button>
            <Offcanvas show={show} onHide={handleClose} {...props}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Fund History</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <TableExample />
              </Offcanvas.Body>
            </Offcanvas>
          </>
        );
      }
      
      function Example() {
        return (
          <>
            
              <OffCanvasExample key={1} placement={"end"} name={"history"} />
            
          </>
        );
      }

      class ApexChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [44, 55, 13, 43, 22],
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
          };
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
                    <a href="homepage.html" class="navbar-brand" id="companyName">Company's name</a>
                    <Example />
                </div>
            </nav>

            <div class="section-bg-2 text-light text-center text-sm-start">
                <div class="container">
                    <div class="row g-5">
                        <div class="col-lg-6">                   
                            <div class="pieChart">
                                <Pie data={pieChartData} id="Pie"/>
                            </div>
                            <p class="mt-4" id = 'company_description'> 
                                company description
                            </p>
                        </div>
                        <div class="col-lg-6">
                            
                            <div class="d-flex align-items-center bg-light text-dark mb-4">
                                <img src={require("./img/money.png")} alt="statistics" class="imgsize my-4"/>
                                <h3 class="mx-4 my-2" id="ticker_name_box" >Ticker's name</h3>
                                <h3 class="mx-4 my-2" id="ticker_price_box" >Ticker's price</h3>
                            </div>
                            <div class="card bg-light text-dark">
                                <div class="card-body">
                                    <h5 class="card-title">Progress</h5>
                                    <div class="text-center">
                                        <textarea  class="edit_contain" placeholder="Please enter progress" disabled="disabled" id="progress_textbox"></textarea>
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
