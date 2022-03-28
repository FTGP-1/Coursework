import React from "react";
import './bootstrapcustom.css';
import './img/user.png';
import './style.css';


export default function Fund(){
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
                            <li class="nav-item"><a href="#" class="nav-link">Fundraise</a></li>
                            <li class="nav-item"><a href="#" class="nav-link">Logout</a></li>
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
                        <div class="col-md-2">
                            <div class="card bg-dark text-light">
                                <div class="card-body">
                                    <div class="card-title text-center">
                                        <h3 class="my-4">Strategy A</h3>
                                    </div>
                                    <div class="card-text text-center">
                                        <p class="my-4 mx-4">
                                            Introduction
                                        </p>
                                        <p class="my-4 mx-4">
                                            Money
                                        </p>
                                    </div>
                                    <div class="text-center">
                                        <a href="#" class="btn btn-primary">Confirm</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="card bg-secondary text-light">
                                <div class="card-body">
                                    <div class="card-title text-center">
                                        <h3 class="my-4">Strategy B</h3>
                                    </div>
                                    <div class="card-text text-center">
                                        <p class="my-4 mx-4">
                                            Introduction
                                        </p>
                                        <p class="my-4 mx-4">
                                            Money
                                        </p>
                                    </div>
                                    <div class="text-center">
                                        <a href="#" class="btn btn-dark">Confirm</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="card bg-dark text-light">
                                <div class="card-body">
                                    <div class="card-title text-center">
                                        <h3 class="my-4">Strategy C</h3>
                                    </div>
                                    <div class="card-text text-center">
                                        <p class="my-4 mx-4">
                                            Introduction
                                        </p>
                                        <p class="my-4 mx-4">
                                            Money
                                        </p>
                                    </div>
                                    <div class="text-center">
                                        <a href="#" class="btn btn-primary">Confirm</a>
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