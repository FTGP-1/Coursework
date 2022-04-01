import React from "react";
import './bootstrapcustom.css';
import './style.css';


export default function Account(){
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
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus optio libero aliquid? Laborum quidem autem corporis officia possimus magnam ipsa minima mollitia, dolor reiciendis architecto, quod ea modi consequuntur voluptas.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus optio libero aliquid? Laborum quidem autem corporis officia possimus magnam ipsa minima mollitia, dolor reiciendis architecto, quod ea modi consequuntur voluptas.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus optio libero aliquid? Laborum quidem autem corporis officia possimus magnam ipsa minima mollitia, dolor reiciendis architecto, quod ea modi consequuntur voluptas.</p>
                                    <div class="text-end">
                                        <a href="#" class="btn btn-primary text-center">Edit</a>
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