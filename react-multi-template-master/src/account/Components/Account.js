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
                        <div class="col">
                            <h3 class="my-4">Pie Chart</h3>
                            <div class="container">

                            </div>
                            <p class="my-4"> 
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus optio libero aliquid? Laborum quidem autem corporis officia possimus magnam ipsa minima mollitia, dolor reiciendis architecto, quod ea modi consequuntur voluptas.
                            </p>
                        </div>
                        <div class="col">
                            <h3 class="my-4">Progress</h3>
                            <div class="container">

                            </div>
                            <p class="my-4">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel voluptas laboriosam porro fuga omnis ipsam. At praesentium facere odit quod corrupti. Nihil, accusamus facere! Adipisci nesciunt delectus placeat temporibus amet?
                            </p>
                        </div>
                    </div>            
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        </React.Fragment>
    );
    
}