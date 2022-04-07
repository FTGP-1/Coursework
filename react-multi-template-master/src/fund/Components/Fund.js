import React from "react";
import './bootstrapcustom.css';
import './img/user.png';
import "./img/money.png"
import './style.css';
import blockies from "ethereum-blockies";
import api from '../../api';
import  {getAllCompany} from '../../investor/Components/Investor.js';

async function getAllCompany_fund()
{

    var result  = await api.getAllInvestees();
    return result.data;

}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("?");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


export default function Fund(){
    var login_status = 0;
    window.onload = async function(){
        try{


            getAllCompany_fund().then(data=>{
                console.log(data);
                var current_company = getQueryVariable("company");
                console.log(current_company);
                document.getElementById("company_profile").innerHTML = data[current_company].profile;
                document.getElementById("current_progress").innerHTML = data[current_company].progress;

            });



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
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            console.log(hashes);
        }catch(e){
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
                            <li class="nav-item"><a href="#" class="nav-link" id="login_status">Login</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section class="text-center text-light">
                <div class="section-bg" id="sectionbg">
                    <div class="container">
                        <div class="row">
                            <div>
                                <img src={require("./img/user.png")} alt="logo" class="w-5"/>
                            </div>
                            <h3 class="my-1">Logo</h3>
                            <p id="company_profile">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, rerum ex? Magni, nemo, nobis culpa asperiores nulla amet, repellendus placeat odit sit nisi excepturi delectus tempore tempora praesentium commodi. Minima.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="p-5">
                <div class="container">
                    <div class="row g-2">
                        <div class="col-md-6">
                            <div class="card bg-light text-dark">
                                <div class="card-body">
                                    <div class="card-title text-center">
                                        <h3 class="my-4">Short Summary</h3>
                                    </div>
                                    <div class="card-text">
                                        <p class="my-4 mx-4" id = "current_progress">
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="container my-4">
                                <div class="d-flex align-items-center topPadding">
                                    <div class="flex-shrink-0 mx-3">
                                        <img src={require("./img/money.png")} alt="logo" class="imgsize"/>
                                    </div>
                                <div class="flex-grow-1 input-group mb-3 mx-2 my-3 col-md-4 inputButton">
                                    <input type="text" class="form-control" placeholder="Please input the amount" aria-label="amount" aria-describedby="button-addon2"></input>
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2">Buy</button>
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