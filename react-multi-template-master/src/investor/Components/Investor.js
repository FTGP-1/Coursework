import React from "react";
import './bootstrapcustom.css';
import './img/user.png';
import './style.css';
import { ethers } from "ethers";
import blockies from "ethereum-blockies";
import { useState } from "react";
import { Button, Offcanvas, Table } from 'react-bootstrap';
import api from '../../api';
import Web3 from "web3";

 //----- xiaoyi----------


async function getAllCompany()
{

    var result  = await api.getAllInvestees();
    console.log(123456);
    console.log(result.data);


    return result.data;

}




 //----- xiaoyi----------
let account_now;
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
            account_now = await window.ethereum.selectedAddress;
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
        var href = "fund.html?";
        window.location.href = href + "company=a";  
    }
    function Click_go_b(){
        var href = "fund.html?";
        window.location.href = href + "company=b";  
    }function Click_go_c(){
        var href = "fund.html?";
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

    function TableExample(){
        var url = `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${account_now}&startblock=0&endblock=99999999&sort=asc&apikey=CAE3M7SNGI1WGD6ZYBZGRKXVABSUDQTCKA`;
        var request = new XMLHttpRequest();
        request.open("get",url);
        request.send(null);
        request.onload = function(){
            if(request.status == 200){
                var json = JSON.parse(request.responseText);
                var transaction_array = new Array();
                var Pay_money_transaction = new Array();
                var Company_array = ['0xa7a4da3d6d518ddb359298383635b635a02f4906','0x53798bd0df969c8c7270eb463665a219283fab7f'];
                
                transaction_array = json.result;
                for (var i = 0; i < transaction_array.length; i++){
                    if (Company_array.indexOf(transaction_array[i].to) >= 0){
                        Pay_money_transaction.push(transaction_array[i]);
                    }
                }
                console.log(Pay_money_transaction);
                let tab = document.getElementById('tab_1');
                for (const v of Pay_money_transaction){
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
                    let input_address = v.to;
                    // fee
                    let input_fee = Web3.utils.fromWei(v.value);
                    // share
                    tab.innerHTML+=`<tr><td>${input_date}</td><td>Companyname</td><td>${input_address}</td><td>${input_fee}</td></tr>`;
                }
            }
        }
        return(
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Date</th>
                <th>Company Name</th>
                <th>Company Address</th>
                <th>Fee</th>
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
            <Button variant="dark" onClick={handleShow} className="me-2">
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

    return (
        <React.Fragment>
            <title>Investor</title>
            <nav class="navbar navbar-expand-lg bg-dark navbar-dark"> 
                <div class="container">
                    <a href="homepage.html" class="navbar-brand">Company's name</a>
                    <div class="collapse navbar-collapse" id="navmenu">
                        <ul class="navbar-nav ms-auto"> 
                            <li class="nav-item"><a href="investor.html" class="nav-link">Invest</a></li>
                            <li class="nav-item" onClick={ClickHandler_Fund}><a class="nav-link">Fundraise</a></li>
                            <li class="nav-item" onClick={Login}><a class="nav-link" id="login_status">Login</a></li>
                            <Example /> 
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