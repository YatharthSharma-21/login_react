import React from 'react';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light py-0 bg-themed shadow px-4">
            <a className="navbar-brand" href="#">
            <img src="../logo.png" width="50" height="50" alt="Logo" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
                <form className="form-inline my-2 my-lg-0 d-flex search ">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className ="btn btn-outline-success btn-light my-sm-0 mx-2" type ="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default NavBar;