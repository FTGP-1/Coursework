import React from "react";
import './bootstrapcustom.css';
import './img/user.png';
import "./img/money.png"
import './style.css';


export default function Fund(){
    var login_status = 0;
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
                            <p>
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
                                        <p class="my-4 mx-4">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus eligendi temporibus architecto consequuntur quis dolorum consectetur, delectus iure mollitia! Illum amet sit est magnam numquam, voluptatum at voluptates rem? Nisi.
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